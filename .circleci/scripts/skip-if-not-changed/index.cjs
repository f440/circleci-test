const parser = require('./gitignore-parser');
const fs = require('fs');
const readline = require("node:readline");
const path = require('path')

async function main(name) {
  const files = []
  const content = fs.readFileSync(path.join(__dirname, "patterns", name), 'utf-8')
  const ignore = parser.compile(content);

  const rl = readline.createInterface({
    input: process.stdin,
  });

  for await (const line of rl) {
    files.push(line)
  }

  console.log(files.filter(ignore.accepts).join("\n"))
}

main(process.argv[2]);
