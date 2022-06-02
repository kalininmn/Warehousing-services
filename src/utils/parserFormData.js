const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');

// Парсер тела запроса формата FormData
function parserFormData(req, url) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form({
      uploadDir: url,
    });

    form.on('file', (name, file) => {
      const output = path.join(url, name);
      fs.rename(file.path, output+'.pdf', ()=>{})
    })

    form.on('error', (err) => {
      console.log(`Error parsing form: ${err.stack}`);
    });

    form.on('close', () => {
      console.log('Upload completed!');
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      console.log(files);

      resolve([fields, files]);
    });
  });
}

module.exports = parserFormData;