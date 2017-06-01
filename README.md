# m0xi

> 后台管理系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 打包时的注意事项
由于接口设计的问题和跨域的原因，开发环境下接口需要带上前缀`/api`，主分支以及打包时都需要去掉同时APP文件需要注释掉开环境下的代码
