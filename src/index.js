import pack from './pack';
import dep from './dep';

export default (name, dir, options) => pack(name, dir, options).then(dep);
