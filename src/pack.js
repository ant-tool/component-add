import pack from 'atool-pack';
import osTmpdir from 'os-tmpdir';
import rimraf from 'rimraf';
import { join, resolve } from 'path';
import { cp, mkdir } from 'shelljs';

export default (name, dir, options) => {
  const cwd = (options || {}).cwd || process.cwd();
  const temp = join(osTmpdir(), `v${Math.random()}`);
  return pack(name, temp).then(() => {
    // like copy
    let realDir;
    if (dir.charAt(dir.length - 1) === '/') {
      let defaultName;
      if (name.indexOf('@') === 0) {
        defaultName = name.split('/')[1].split('@')[0];
      } else {
        defaultName = name.split('@')[0];
      }
      realDir = resolve(cwd, dir, defaultName);
    } else {
      realDir = resolve(cwd, dir);
    }
    mkdir('-p', realDir);
    cp(join(temp, 'src/*'), realDir);
    const pkg = require(join(temp, 'package.json'));
    rimraf.sync(temp);
    return {
      pkg,
      args: [name, dir, options],
    };
  }).catch(err => {
    rimraf.sync(temp);
    throw err;
  });
};
