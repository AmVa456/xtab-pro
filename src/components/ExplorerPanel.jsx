import { FolderOpen, FileCode2, FolderTree, Save, PanelLeftClose } from 'lucide-react'

export default function ExplorerPanel({
  directory,
  tabs,
  onOpenFiles,
  onOpenDirectory,
  onOpenNode,
  onSave,
  onToggle,
}) {
  return (
    <aside className="explorer-panel">
      <div className="panel-header">
        <div>
          <span className="panel-title">Explorer</span>
          <span className="panel-subtitle">{directory?.name || 'local workspace'}</span>
        </div>
        <button className="icon-button" onClick={onToggle} title="Collapse explorer">
          <PanelLeftClose size={16} />
        </button>
      </div>

      <div className="panel-actions">
        <button className="tool-button" onClick={onOpenFiles}>
          <FileCode2 size={15} />
          Open files
        </button>
        <button className="tool-button" onClick={onOpenDirectory}>
          <FolderOpen size={15} />
          Open folder
        </button>
        <button className="tool-button tool-button-save" onClick={onSave} disabled={!tabs.length}>
          <Save size={15} />
          Save
        </button>
      </div>

      <div className="tree-shell">
        {directory?.tree?.length ? (
          <FileTree nodes={directory.tree} onOpenNode={onOpenNode} />
        ) : (
          <div className="tree-empty">
            <FolderTree size={26} />
            <span>No folder loaded.</span>
          </div>
        )}
      </div>
    </aside>
  )
}

function FileTree({ nodes, onOpenNode }) {
  return (
    <ul className="file-tree">
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} onOpenNode={onOpenNode} />
      ))}
    </ul>
  )
}

function TreeNode({ node, onOpenNode }) {
  const isFile = node.kind === 'file'
  return (
    <li>
      <button
        className={`tree-row ${isFile ? 'tree-file' : 'tree-folder'}`}
        onClick={() => isFile && onOpenNode(node)}
        disabled={!isFile}
        title={node.path}
      >
        <span className="tree-glyph">{isFile ? '◇' : '▾'}</span>
        <span className="tree-name">{node.name}</span>
      </button>
      {!isFile && node.children?.length > 0 ? <FileTree nodes={node.children} onOpenNode={onOpenNode} /> : null}
    </li>
  )
}
