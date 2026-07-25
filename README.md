# 《同一个屋檐下》短剧创作与制作总部

这是一个纯静态网站，可直接部署到 GitHub Pages 或 Cloudflare Pages。

## 文件

- `index.html`：网站结构
- `styles.css`：视觉样式与响应式布局
- `app.js`：页面内容、导航、第一季30集、灵感箱与交互

## 本地预览

直接打开 `index.html`，或在文件夹内运行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## GitHub Pages

1. 新建 GitHub repository。
2. 上传全部文件到 repository 根目录。
3. 进入 Settings → Pages。
4. Source 选择 Deploy from a branch。
5. Branch 选择 `main`，目录选择 `/root`。

## Cloudflare Pages

1. 登录 Cloudflare Dashboard。
2. Workers & Pages → Create → Pages → Connect to Git。
3. 选择对应 GitHub repository。
4. Framework preset 选择 `None`。
5. Build command 留空。
6. Build output directory 填 `/`。
7. 部署。

## 数据说明

“新增剧情灵感”会保存在当前浏览器的 localStorage 中，不会自动同步到其他成员设备。后续如需多人实时协作，可接入 Supabase、Firebase、Notion 或 Airtable。
