const multiparty = require('multiparty');

function parserFormData(req) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form({
      uploadDir: './src/assets',
      // autoFields: true,
      autoFiles: true,
    });

    form.on('error', (err) => {
      console.log(`Error parsing form: ${err.stack}`);
    });

    form.on('close', () => {
      console.log('Upload completed!');
      // res.setHeader('text/plain');
      // res.end(`Received ${count} files`);
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve([fields, files]);
    });
  });
}

module.exports = parserFormData;