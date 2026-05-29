import { useMemo, useState } from 'react'
import { Braces, Check, PanelLeftOpen, Save, Sparkles } from 'lucide-react'
import EditorCanvas from './components/EditorCanvas'
import ExplorerPanel from './components/ExplorerPanel'
import TabStrip from './components/TabStrip'
import {
  openDirectory,
  openFiles,
  readFileHandle,
  saveFileHandle,
  supportsFileSystemAccess,
} from './core/FileIO'

const welcomeSource = `const xtab = {
  runtime: 'browser-native',
  editor: 'Monaco',
  storage: 'File System Access API',
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('xTab Pro ready', xtab)
})
`

const welcomeTab = {
  id: 'welcome.js',
  name: 'welcome.js',
  path: 'welcome.js',
  handle: null,
  language: 'javascript',
  content: welcomeSource,
  savedContent: welcomeSource,
  isDirty: false,
  viewState: null,
}

export default function App() {
  const [tabs, setTabs] = useState([welcomeTab])
  const [activeId, setActiveId] = useState(welcomeTab.id)
  const [directory, setDirectory] = useState(null)
  const [explorerOpen, setExplorerOpen] = useState(true)
  const [status, setStatus] = useState('Monaco ready')

  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeId) || null, [tabs, activeId])
  const dirtyCount = tabs.filter((tab) => tab.isDirty).length

  async function handleOpenFiles() {
    try {
      const opened = await openFiles()
      mergeTabs(opened)
      setStatus(`Opened ${opened.length} file${opened.length === 1 ? '' : 's'}`)
    } catch (error) {
      setStatus(error.message)
    }
  }

  async function handleOpenDirectory() {
    try {
      const nextDirectory = await openDirectory()
      setDirectory(nextDirectory)
      setStatus(`Folder loaded: ${nextDirectory.name}`)
    } catch (error) {
      setStatus(error.message)
    }
  }

  async function handleOpenNode(node) {
    try {
      const parentPath = node.path.split('/').slice(0, -1).join('/')
      const opened = await readFileHandle(node.handle, parentPath)
      opened.id = node.id
      opened.path = node.path
      mergeTabs([opened])
      setStatus(`Opened ${node.path}`)
    } catch (error) {
      setStatus(error.message)
    }
  }

  function mergeTabs(openedTabs) {
    setTabs((current) => {
      const next = [...current]
      for (const opened of openedTabs) {
        const existingIndex = next.findIndex((tab) => tab.path === opened.path)
        if (existingIndex >= 0) {
          next[existingIndex] = { ...next[existingIndex], ...opened, viewState: next[existingIndex].viewState }
        } else {
          next.push(opened)
        }
      }
      return next
    })
    setActiveId(openedTabs[openedTabs.length - 1].id)
  }

  function handleContentChange(id, content) {
    setTabs((current) =>
      current.map((tab) =>
        tab.id === id ? { ...tab, content, isDirty: content !== tab.savedContent } : tab,
      ),
    )
  }

  function handleViewStateChange(id, viewState) {
    setTabs((current) => current.map((tab) => (tab.id === id ? { ...tab, viewState } : tab)))
  }

  async function handleSave(id = activeId) {
    const tab = tabs.find((item) => item.id === id)
    if (!tab) return
    if (!tab.handle) {
      setStatus('This buffer is not attached to a local file handle.')
      return
    }

    try {
      await saveFileHandle(tab)
      setTabs((current) =>
        current.map((item) =>
          item.id === id ? { ...item, savedContent: item.content, isDirty: false } : item,
        ),
      )
      setStatus(`Saved ${tab.name}`)
    } catch (error) {
      setStatus(error.message)
    }
  }

  function handleCloseTab(id) {
    setTabs((current) => {
      const index = current.findIndex((tab) => tab.id === id)
      const next = current.filter((tab) => tab.id !== id)
      if (id === activeId) {
        setActiveId(next[index]?.id || next[index - 1]?.id || next[0]?.id || null)
      }
      return next
    })
  }

  return (
    <main className="app-shell">
      {explorerOpen ? (
        <ExplorerPanel
          directory={directory}
          tabs={tabs}
          activeId={activeId}
          onOpenFiles={handleOpenFiles}
          onOpenDirectory={handleOpenDirectory}
          onOpenNode={handleOpenNode}
          onSave={() => handleSave()}
          onToggle={() => setExplorerOpen(false)}
        />
      ) : null}

      <section className="workspace">
        <header className="top-bar">
          <div className="brand-block">
            {!explorerOpen ? (
              <button className="icon-button" onClick={() => setExplorerOpen(true)} title="Open explorer">
                <PanelLeftOpen size={16} />
              </button>
            ) : null}
            <div className="brand-mark">
              <Braces size={18} />
            </div>
            <div>
              <div className="product-name">xTab Pro</div>
              <div className="runtime-line">client-side Monaco IDE</div>
            </div>
          </div>

          <div className="top-actions">
            <span className={`api-chip ${supportsFileSystemAccess ? 'is-ready' : 'is-limited'}`}>
              <Check size={13} />
              {supportsFileSystemAccess ? 'Native File API' : 'Chromium required'}
            </span>
            <button className="icon-button" onClick={() => handleSave()} title="Save active file">
              <Save size={16} />
            </button>
          </div>
        </header>

        <TabStrip tabs={tabs} activeId={activeId} onSelect={setActiveId} onClose={handleCloseTab} />

        <section className="editor-frame">
          <EditorCanvas
            activeTab={activeTab}
            onChange={handleContentChange}
            onViewStateChange={handleViewStateChange}
          />
        </section>

        <footer className="status-bar">
          <span>
            <Sparkles size={13} />
            {status}
          </span>
          <span>{activeTab ? `${activeTab.language} · ${activeTab.path}` : 'no active file'}</span>
          <span>{dirtyCount ? `${dirtyCount} unsaved` : 'all saved'}</span>
        </footer>
      </section>
    </main>
  )
}
