#!/usr/bin/env node
let http = require('http');
let fs = require('fs');
let yaml = require('yaml');
let argv = require('yargs').argv;

let data = fs.readFileSync('./config.yml', 'utf8');
let config = yaml.eval(data);

config.site.auth = config.site.auth || '';
config.separater = config.separater || ',';

if (argv.file && argv.file.length > 0) {
  fs.readFile('list.txt', 'utf8', (err, data) => {
    if (err) {
      process.stderr.write('Could not read list.txt');
      return;
    }
    data.split('\n').forEach(page => {
      try {
        let req = http.get(`http://${config.site.auth}@${config.site.root}${page}`, (res) => {
          const code = res.statusCode;
          process.stdout.write(`${page}${config.separater}${code}\n`);
          req.abort();
        });

        req.on('error', (E) => {
          process.stderr.write('Request failed: ' + E.message);
        });
        req.end();
      } catch (E) {
        process.stderr.write(E.message);
      }
    });
  });
} else {
  process.stderr.write('Missing argument --file=<filename>');
}
