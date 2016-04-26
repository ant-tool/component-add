import { join } from 'path';
import run from 'atool-pack/lib/run';
import npm from 'atool-pack/lib/npm';
import { cat } from 'shelljs';
import console from './console';

export default ({ pkg, args }) => {
  const options = args[2];
  const cwd = (options || {}).cwd || process.cwd();
  const str = cat(join(cwd, 'package.json'));

  if (str === null) {
    throw new Error('can not find "package.json" in project');
  }

  const obj = JSON.parse(str);
  const appDependencies = obj.dependencies || {};
  const array = [];
  const dependencies = pkg.dependencies;

  for (const name in dependencies) {
    if (!appDependencies[name]) {
      array.push(`${name}@${dependencies[name]}`);
    } else {
      if (appDependencies[name] !== dependencies[name]) {
        console.warn(
  `  Warning: Different versions
  Project    ${obj.name}  ${name}@${appDependencies[name]}
  Component  ${pkg.name}  ${name}@${dependencies[name]}
  `);
      }
    }
  }
  if (array.length === 0) {
    return;
  }
  console.info(
  `  Component need install dependencies, running:
  ${npm} install ${array.join(' ')} --save
  `);
  return new Promise((resolve, reject) => {
    run(npm, ['install', ...array, '--save'], {
      stdio: 'inherit',
      cwd,
    }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
