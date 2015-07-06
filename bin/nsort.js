#!/usr/bin/env node
/* eslint no-process-exit: 0 */
var fs = require('fs')
  , path = require('path')

var minimist = require('minimist')
  , concat = require('concat-stream')

var nsort = require('../lib')
  , pkg = require('../package.json')

var args = minimist(process.argv.slice(2))
  , concatStream = concat(onFile)
  , file

if(args.help) {
  fs.createReadStream(path.join(__dirname, '..', 'help.txt'))
    .pipe(process.stderr)
    .on('end', function() {
      process.exit(1)
    })
} else if(args.version) {
  console.error(pkg.version)
  process.exit(1)
} else {
  if(!process.stdin.isTTY) {
    file = process.stdin
  } else {
    if(!args._[0]) {
      console.error('You must specify a file, or pipe data to nsort.')
      process.exit(1)
    }

    try {
      file = fs.createReadStream(args._[0])
    } catch(err) {
      console.error('Could not read from the specified file: %s', err)
      process.exit(1)
    }
  }

  file.on('error', onError)
  file.pipe(concatStream)
}

function onError(err) {
  console.error('Got an error reading file: %s', err)
  process.exit(1)
}

function onFile(data) {
  var lines = data.toString().split('\n')
    , sorted = nsort(lines.filter(Boolean))

  sorted.forEach(function(line) {
    console.log(line)
  })
}
