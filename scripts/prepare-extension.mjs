import { copyFile, cp, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const extensionSrc = resolve(root, 'extension')
const extensionOut = resolve(root, 'dist-extension')

await rm(extensionOut, { recursive: true, force: true })
await mkdir(extensionOut, { recursive: true })
await cp(dist, extensionOut, { recursive: true })
await cp(resolve(extensionSrc, 'icons'), resolve(extensionOut, 'icons'), { recursive: true })
await copyFile(resolve(extensionSrc, 'manifest.json'), resolve(extensionOut, 'manifest.json'))
await copyFile(
  resolve(extensionSrc, 'extension-background.js'),
  resolve(extensionOut, 'extension-background.js'),
)

console.log(`Extension package prepared at ${extensionOut}`)
