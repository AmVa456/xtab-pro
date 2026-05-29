import { X, CircleDot } from 'lucide-react'

export default function TabStrip({ tabs, activeId, onSelect, onClose }) {
  return (
    <nav className="tab-strip" aria-label="Open files">
      {tabs.length === 0 ? (
        <div className="tab-strip-empty">No open documents</div>
      ) : (
        tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${tab.id === activeId ? 'is-active' : ''}`}
            onClick={() => onSelect(tab.id)}
            title={tab.path}
          >
            <span className="tab-dirty">{tab.isDirty ? <CircleDot size={10} /> : null}</span>
            <span className="tab-name">{tab.name}</span>
            <span
              className="tab-close"
              role="button"
              tabIndex={0}
              title={`Close ${tab.name}`}
              onClick={(event) => {
                event.stopPropagation()
                onClose(tab.id)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                  onClose(tab.id)
                }
              }}
            >
              <X size={13} />
            </span>
          </button>
        ))
      )}
    </nav>
  )
}
