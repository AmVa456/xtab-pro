import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

export const XTAB_THEME = 'xtab-amoled-neon'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') return new jsonWorker()
    if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker()
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker()
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  },
}

export function configureMonaco(monaco) {
  monaco.editor.defineTheme(XTAB_THEME, {
    base: 'hc-black',
    inherit: true,
    semanticHighlighting: true,
    rules: [
      { token: '', foreground: 'EAEAEA', background: '000000' },
      { token: 'keyword', foreground: 'BF00FF', fontStyle: 'bold' },
      { token: 'keyword.js', foreground: 'BF00FF', fontStyle: 'bold' },
      { token: 'keyword.ts', foreground: 'BF00FF', fontStyle: 'bold' },
      { token: 'keyword.jsx', foreground: 'BF00FF', fontStyle: 'bold' },
      { token: 'keyword.tsx', foreground: 'BF00FF', fontStyle: 'bold' },
      { token: 'operator', foreground: 'BF00FF' },
      { token: 'operator.js', foreground: 'BF00FF' },
      { token: 'operator.ts', foreground: 'BF00FF' },
      { token: 'delimiter', foreground: 'BF00FF' },
      { token: 'string', foreground: 'FF1493' },
      { token: 'string.js', foreground: 'FF1493' },
      { token: 'string.ts', foreground: 'FF1493' },
      { token: 'string.html', foreground: 'FF1493' },
      { token: 'number', foreground: '00E5FF' },
      { token: 'number.js', foreground: '00E5FF' },
      { token: 'number.ts', foreground: '00E5FF' },
      { token: 'variable', foreground: '00BFFF' },
      { token: 'variable.js', foreground: '00BFFF' },
      { token: 'variable.ts', foreground: '00BFFF' },
      { token: 'identifier', foreground: '00BFFF' },
      { token: 'type.identifier', foreground: '00E5FF' },
      { token: 'comment', foreground: '646464', fontStyle: 'italic' },
      { token: 'comment.js', foreground: '646464', fontStyle: 'italic' },
      { token: 'comment.ts', foreground: '646464', fontStyle: 'italic' },
      { token: 'tag', foreground: 'BF00FF' },
      { token: 'attribute.name', foreground: '00BFFF' },
      { token: 'attribute.value', foreground: 'FF1493' },
    ],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#EAEAEA',
      'editorCursor.foreground': '#FF1493',
      'editor.lineHighlightBackground': '#120018',
      'editor.selectionBackground': '#BF00FF55',
      'editor.inactiveSelectionBackground': '#2A003666',
      'editorLineNumber.foreground': '#646464',
      'editorLineNumber.activeForeground': '#00E5FF',
      'editorBracketHighlight.foreground1': '#BF00FF',
      'editorBracketHighlight.foreground2': '#00E5FF',
      'editorBracketHighlight.foreground3': '#FF1493',
      'editorBracketHighlight.foreground4': '#BF00FF',
      'editorBracketHighlight.foreground5': '#00E5FF',
      'editorBracketHighlight.foreground6': '#FF1493',
      'editorSuggestWidget.background': '#050005',
      'editorSuggestWidget.border': '#BF00FF',
      'editorSuggestWidget.foreground': '#EAEAEA',
      'editorSuggestWidget.highlightForeground': '#FF1493',
      'editorSuggestWidget.selectedBackground': '#1B0024',
      'editorWidget.background': '#050005',
      'editorWidget.border': '#BF00FF',
      'scrollbarSlider.background': '#BF00FF45',
      'scrollbarSlider.hoverBackground': '#BF00FF77',
      'scrollbarSlider.activeBackground': '#FF1493',
    },
  })

  monaco.editor.setTheme(XTAB_THEME)

  const diagnostics = {
    noSemanticValidation: false,
    noSyntaxValidation: false,
  }
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(diagnostics)
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnostics)

  const compilerOptions = {
    allowNonTsExtensions: true,
    allowJs: true,
    checkJs: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    module: monaco.languages.typescript.ModuleKind.ESNext,
  }
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions)
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions)
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
}

export const editorOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
  breadcrumbs: { enabled: false },
  smoothScrolling: true,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  formatOnPaste: true,
  formatOnType: true,
  wordWrap: 'on',
  wrappingIndent: 'same',
  scrollBeyondLastLine: false,
  renderWhitespace: 'selection',
  fontFamily: '"JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, monospace',
  fontSize: 14,
  lineHeight: 22,
  tabSize: 2,
  padding: { top: 16, bottom: 16 },
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  },
}
