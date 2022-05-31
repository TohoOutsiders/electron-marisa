# marisa

> An electron-vue project

### 是时候复活了

Electron-Marisa项目最后修改的4年前至今，nodejs、npm以及许多依赖的接口发生了巨大的改变，虽然2018年也不是那么久远，但安装合适版本的依赖是一件很难的事情。好在npm可以很简单地安装旧版本的依赖。因此，将`package.json`中的依赖版本的`^`修改为了`=`，锁定了绝大多数的依赖版本。并在测试后指定了`vue`、`vue-router`、`vue-template-compiler`、`electron`以及`webpack-dev-server`的版本。

经过测试，在wsl2 ubuntu20.04下，使用Nodejs v7.10.1以及npm v3.10.10，可以进行热调试并打包。

在Windows下，需要使用较高版本的包含了windows-build-tools的nodejs和对应的npm安装依赖，再使用较低版本的nodejs和npm进行调试和打包。经过测试，使用nodejs v16.15.0和npm v8.5.5可以完成依赖安装，使用nodejs v6.10.3和npm v3.10.10可以进行调试和打包。

如果你不想折腾，你也可以直接下载打包好的Windows程序。[Google Drive](https://drive.google.com/file/d/19AGSBOgo3w_u_PPGwJ9oG48iceLvFFZh/view?usp=sharing)
#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[4c6ee7b](https://github.com/SimulatedGREG/electron-vue/tree/4c6ee7bf4f9b4aa647a22ec1c1ca29c2e59c3645) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
