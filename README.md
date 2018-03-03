# 校园读书web应用


## 技术栈
* **Vue2.0**：实现前端页面构建
* **Vuex**：实现不同组件间的状态共享
* **Vue-router**：页面路由切换,实现单页的核心
* **vueg**：页面复杂场景切换效果
* **Socket.io**：实现实时消息推送
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求
* **Express**、**Koa2**：开发环境使用Express，生产环境使用Koa2
* **ES6**、**ES7**、**ES8**：服务端和客户端均使用ES6语法，promise/async/await 处理异步
* **localStorage**：本地保存用户信息
* **Webpack**：模块打包，前端项目构建工具首选
* **SASS**(**SCSS**)：CSS预处理语言
* **Flex**：flex弹性布局，简单适配手机、PC端
* **CSS3**：CSS3过渡动画及样式
* **IScroll**：模拟原生app的列表滚动效果(ListView)
* **MySQL**：MySQL关系型数据库持久化数据（考虑到表与表之间关系复杂，需要多表查询，最复杂的时候是六张表联查，用MySQL会比Mongodb好得多）
* **jsonp**：跨域请求数据
* **pm2**：服务端使用pm2部署，常驻进程，比forever好用得多（https://github.com/Unitech/pm2 ）
* **nginx**：服务端使用nginx代理端口转发

## 使用方式

先将根目录下的qq.sql导入到你的MySQL数据库里(可以使用Navicat)，用户名为root，登录密码为123456。启动MySQL服务。然后使用cnpm install 安装所有依赖(最好用cnpm安装，因为项目依赖很多，npm用的是国外的镜像，在网络不稳定的情况下很有可能会导致安装失败，而且下载速度远远慢于国内的cnpm)，最后运行npm run dev。服务器部署运行项目只需要npm run pm2，这样就可以常驻进程，不过前提是得先全局安装pm2。


## 截图

* 登录界面

![](https://github.com/lensh/vue-qq/blob/master/screenshot/1.png)

* 登录界面

![](https://github.com/lensh/vue-qq/blob/master/screenshot/1.png)


