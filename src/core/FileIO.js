export const supportsFileSystemAccess =
  typeof window !== 'undefined' &&
  'showOpenFilePicker' in window &&
  'showDirectoryPicker' in window

export async function openFiles() {
  assertFileSystemAccess()
  const handles = await window.showOpenFilePicker({
    multiple: true,
    excludeAcceptAllOption: false,
    types: [
      {
        description: 'Code and text files',
        accept: {
          'text/*': ['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.md', '.txt', '.yml', '.yaml'],
        },
      },
    ],
  })

  return Promise.all(handles.map(readFileHandle))
}

export async function openDirectory() {
  assertFileSystemAccess()
  const handle = await window.showDirectoryPicker({ mode: 'readwrite' })
  return {
    name: handle.name,
    handle,
    tree: await readDirectoryHandle(handle),
  }
}

export async function readFileHandle(handle, parentPath = '') {
  const file = await handle.getFile()
  const content = await file.text()
  const path = parentPath ? `${parentPath}/${handle.name}` : handle.name

  return {
    id: crypto.randomUUID(),
    name: handle.name,
    path,
    handle,
    content,
    savedContent: content,
    language: inferLanguage(handle.name),
    isDirty: false,
    viewState: null,
  }
}

export async function saveFileHandle(tab) {
  if (!tab?.handle) {
    throw new Error('No file handle is attached to this tab.')
  }

  const writable = await tab.handle.createWritable()
  await writable.write(tab.content)
  await writable.close()
}

export async function readDirectoryHandle(directoryHandle, parentPath = '') {
  const nodes = []

  for await (const [name, handle] of directoryHandle.entries()) {
    const path = parentPath ? `${parentPath}/${name}` : name
    if (handle.kind === 'directory') {
      nodes.push({
        id: path,
        name,
        path,
        kind: 'directory',
        handle,
        children: await readDirectoryHandle(handle, path),
      })
    } else {
      nodes.push({
        id: path,
        name,
        path,
        kind: 'file',
        handle,
        language: inferLanguage(name),
      })
    }
  }

  return nodes.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'directory' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

export function inferLanguage(fileName = '') {
  const ext = fileName.split('.').pop()?.toLowerCase()
  const languages = {
    js: 'javascript',
    jsx: 'javascript',
    mjs: 'javascript',
    cjs: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    json: 'json',
    html: 'html',
    htm: 'html',
    css: 'css',
    scss: 'scss',
    md: 'markdown',
    markdown: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
  }

  return languages[ext] || 'plaintext'
}

function assertFileSystemAccess() {
  if (!supportsFileSystemAccess) {
    throw new Error('File System Access API requires Chromium/Edge on localhost or HTTPS.')
  }
}
