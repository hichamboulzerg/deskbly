const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'dist')

// Synchronous sleep
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

for (let i = 0; i < 8; i++) {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
    console.log('dist/ cleaned')
    break
  } catch (e) {
    if (i < 7) {
      console.log(`Retrying clean (${i + 1}/8)...`)
      sleep(400)
    } else {
      console.warn('Warning: could not clean dist/ — build may fail')
    }
  }
}
