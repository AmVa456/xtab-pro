import Editor from '@monaco-editor/react'
import { useEffect, useRef } from 'react'
import { configureMonaco, editorOptions, XTAB_THEME } from '../core/MonacoConfig'

export default function EditorCanvas({ activeTab, onChange, onViewStateChange }) {
  const editorRef = useRef(null)
  const activeIdRef = useRef(activeTab?.id)

  useEffect(() => {
    const editor = editorRef.current
    if (!editor || !activeTab) return

    if (activeIdRef.current !== activeTab.id) {
      if (activeTab.viewState) {
        requestAnimationFrame(() => {
          editor.restoreViewState(activeTab.viewState)
          editor.focus()
        })
      }
      activeIdRef.current = activeTab.id
    }
  }, [activeTab])

  function handleMount(editor, monaco) {
    editorRef.current = editor
    configureMonaco(monaco)
    editor.onDidChangeCursorPosition(() => captureViewState())
    editor.onDidScrollChange(() => captureViewState())
    editor.onDidBlurEditorText(() => captureViewState())
  }

  function captureViewState() {
    if (!editorRef.current || !activeIdRef.current) return
    onViewStateChange(activeIdRef.current, editorRef.current.saveViewState())
  }

  if (!activeTab) {
    return (
      <section className="empty-editor">
        <div className="empty-mark">xTab Pro</div>
        <h1>Open a file or folder to begin.</h1>
        <p>Monaco is ready for local JavaScript, TypeScript, HTML, CSS, JSON, and Markdown.</p>
      </section>
    )
  }

  return (
    <Editor
      height="100%"
      path={activeTab.path || activeTab.name}
      language={activeTab.language}
      value={activeTab.content}
      theme={XTAB_THEME}
      beforeMount={configureMonaco}
      onMount={handleMount}
      onChange={(value) => onChange(activeTab.id, value ?? '')}
      options={editorOptions}
    />
  )
}
