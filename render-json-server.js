// npm i --save-dev @types/node

const fs = require('fs')
const { join } = require('path')

const ignores = [
  ".gitignore",
  ".git",
  "render-json-server.js",
  "screenshots",
  "s.json",
  "tv.json",
  "package.json",
  "node_modules",
  ".DS_Store",
  "README.md"
]

;(async ()=> {
  const __dirTable = fs.readdirSync(__dirname).filter(item=> {
    const flag = ignores.some(syb=> syb == item)
    return !flag
  })
  // console.log('__dirTable: ', __dirTable)
  let outputWriteFile = []
  __dirTable.forEach(item=> {
    const _ = fs.readFileSync(join(__dirname, item))

    /**
     * @type {Array<any>}
     */
    const writeData = JSON.parse(_)
    outputWriteFile.push.apply(outputWriteFile, writeData)
  })
  // console.log("length: ", outputWriteFile.length)
  fs.writeFileSync(join(__dirname, "db.json"), JSON.stringify({ mirrors: outputWriteFile }, null, 2) , 'utf-8')
})()