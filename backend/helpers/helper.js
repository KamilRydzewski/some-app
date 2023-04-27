const fs = require('fs')
let path = require('path')
const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

const newDate = () => new Date().toString()
function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id)
    if (!row) {
      reject({
        message: 'ID is not good',
        status: 404
      })
    }
    resolve(row)
  })
}

function writeJSONFile(filename, content) {
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile
}