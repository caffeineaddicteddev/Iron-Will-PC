const fs = require('fs')
const path = require('path')

const pngPath = path.join(__dirname, '../build/icon.png')
const icoPath = path.join(__dirname, '../build/icon.ico')

if (!fs.existsSync(pngPath)) {
  console.error('icon.png not found')
  process.exit(1)
}

const pngData = fs.readFileSync(pngPath)

// Create ICO header (6 bytes)
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // Reserved
header.writeUInt16LE(1, 2) // Type: 1 = Icon
header.writeUInt16LE(1, 4) // Number of images: 1

// Create Directory Entry (16 bytes)
const entry = Buffer.alloc(16)
entry.writeUInt8(0, 0) // Width (0 means 256 or greater)
entry.writeUInt8(0, 1) // Height (0 means 256 or greater)
entry.writeUInt8(0, 2) // Color palette count (0 = no palette)
entry.writeUInt8(0, 3) // Reserved
entry.writeUInt16LE(1, 4) // Color planes
entry.writeUInt16LE(32, 6) // Bits per pixel (32-bit)
entry.writeUInt32LE(pngData.length, 8) // Size of PNG data
entry.writeUInt32LE(22, 12) // Offset of PNG data (6 bytes header + 16 bytes entry = 22)

// Combine all into a single Buffer
const icoData = Buffer.concat([header, entry, pngData])

fs.writeFileSync(icoPath, icoData)
console.log('Successfully generated build/icon.ico!')
