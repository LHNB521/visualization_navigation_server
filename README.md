### 后端

#### 本地构建

```
pnpm build
```

> 注意: 构建后会生成两个文件夹 `dist` 和 `ncc-dist`, 我们只需要 `ncc-dist`，因为 `dist` 下的文件会依赖于 `node_modules` 部署起来会比较麻烦，而 `ncc-dist` 下的文件则将所需要的依赖文件都打包到一起了，只需要执行 里里面的 `index.js` 就可以运行了

#### 本地预览

```
node ncc-dist/index.js
```

看到 `🚀 启动成功: http://localhost:8765` 就成功了

#### 部署

部署到云服务器或者自建的服务器中

一、服务器环境准备:

1.  mysql(推荐5.7)
2.  redis
3.  node (推荐安装nvm)
4.  pm2，使用 `npm i -g pm2` 进行安装

二、将构建产物上传到云服务器，然后在 `index.js` 同级目录下创建 `.env` 文件

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=admin
DB_PWD=123456
DB_DATABASE=vis
DB_SYNC=true
JWT_SECRET="xxxxxx"
IS_PREVIEW=false
```

> 注: 需将以上配置修改为服务器环境的配置

三、使用 `pm2` 启动服务

启动

```
pm2 start ./index.js --name nest-jwt
```

停止

```
pm2 stop nest-jwt
```

重启

```
pm2 restart nest-jwt
```

> 注: 执行 `pm2 ls` 可查看运行的服务

四、常见问题

'ncc' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

```
npm install -g @vercel/ncc
```
