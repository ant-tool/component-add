# component-add

[![NPM version](https://img.shields.io/npm/v/component-add.svg?style=flat)](https://npmjs.org/package/component-add)

----

### 模块使用工具：

1. 将 npm 模块下的 `src 文件夹里的内容` 下载到指定文件夹，

2. 安装模块需要的依赖到当前项目中。

### 跟 npm install 区别：

- npm install 将模块安装到 node_modules，直接使用模块的接口，不可进行编辑模块。

- component-add 将模块下载到指定的文件夹，模块的依赖被安装成为到项目的依赖。可直接编辑模块代码。

为什么需要：

项目中类似的场景、组件、模式需要一种沉淀的方式，而 “安装组件” 的方式需要提炼抽象出组件的 api，比较适合于通用基础组件。而业务中的需求经常是 `要用，但要修改`，这种情况是不适合做成普通组件用 npm install 来安装使用的。所以采用 component-add 来下载模块的 src 文件夹，安装模块的依赖到项目中。这样，就可以方便使用、修改这些场景、组件、模式的沉淀。

### cli:
```bash
$ npm install -g component-add
$ component-add module dir
```

eg:

```bash
$ component-add rcf ./src/component/
```


### api
```javascript
var componentAdd = require("component-add");
componentAdd(module, dir, [options]);
```

options: 

- cwd: default is process.cwd()

eg:

```javascript
componentAdd('rcf', './').then(() => {
  console.log('success');
}).catch(err => {
  conole.log(err);
})
```

## License

Component is released under the MIT license.