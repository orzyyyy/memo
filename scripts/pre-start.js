const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

function runCmd(cmd, args, callback) {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', code => {
    if (code !== 0) {
      process.exit(code);
    }
    callback && callback(code);
  });
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const tscBin = require.resolve('typescript/bin/tsc');

runCmd(
  'node',
  [tscBin, '--target', 'es6', '--module', 'commonjs', '--sourceMap'],
  () => {
    walk(path.join(process.cwd(), 'src'))
      .filter(filePath => filePath.includes('.map'))
      .map(filePath => fs.unlinkSync(filePath));
    console.log('clean views completed.');
  },
);
