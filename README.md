# 模版工坊

## 后台模版 admin-template

### 特别说明
1. 只能修改 `public` 目录下 `diy.css` 文件和 `img` 目录下的图片
2. 可以用 `!important` 覆盖样式

### 使用 `LESS`

1. 第一步在 `vscode` 插件市场安装 `easy-less` 插件
2. 在项目根目录下新建 `.vscode/settings.json`
3. 复制如下代码到 `.vscode/settings.json` 文件中

```json
{
    "less.compile": {
        "main": ["${workspaceFolder}/public/less/diy.less"],
        "compress": true,
        "sourceMap": false,
        "out": "${workspaceRoot}/public/css/diy.css"
    }
}
```
4. 在 `public` 目录下，新建 `diy.less` 文件，就可以在项目中使用 `less` 进行开发了，保存 `less` 文件后会自动生成 `diy.css` 文件到 `public/css` 目录下并自动热更新项目。

### 项目启动

```bash
cd admin-template

yarn

yarn dev
```
