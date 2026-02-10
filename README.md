# WinNew
技术栈：React + TypeScript + Vite + TDesign

## 项目介绍
WinNew是一个获取Windows镜像的网站， 镜像来自于Windows更新服务器，提供直链下载。原汁原味，纯净无修改！

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 部署配置

这是一个单页应用 (SPA)，需要配置服务器将所有路由重定向到 `index.html`。

### Apache 配置

项目已包含 `.htaccess` 文件，确保已启用 mod_rewrite 模块：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L,QSA]
</IfModule>
```

### Nginx 配置

参考 `nginx.conf.example` 文件：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Firebase Hosting

参考 `firebase.json.example` 文件进行配置。

### 静态文件托管 (Netlify/Vercel)

这些平台自动支持 SPA，无需额外配置。

如果使用其他静态托管，确保设置 404 页面重定向到 `index.html`。

### 注意事项

1. 确保服务器配置正确，否则刷新页面会出现 404 错误
2. 所有路由现在都由客户端处理 (`/`, `/donation`, `/about`)
3. SEO 建议：对于需要更好 SEO 的页面，考虑使用预渲染或 SSR