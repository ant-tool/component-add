import componentAdd from '../src';
import { join } from 'path';
import rimraf from 'rimraf';
import { mkdir, cat, cd } from 'shelljs';
import { assert } from 'chai';

describe('component-add', () => {

  const dir = join(__dirname, 'test');
  const componentDir = join(dir, 'component');

  before(() => {
    mkdir('-p', dir);
    JSON.stringify({name:"test"}).to(join(dir, 'package.json'));
  });

  after(() => {
    rimraf.sync(dir);
  });


  it('component add success' , function(done) {
    componentAdd('rcf', componentDir, {
      cwd: dir,
    }).then(() => {
      done();
    }).catch(err => {
      console.log(err);
    });
  });

  it('component add error' , function(done) {
    componentAdd('rcf1', componentDir, {
      cwd: dir,
    }).catch(err => {
      if (err) {
        done();
      }
    });
  });

});