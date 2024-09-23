# UniApp Starter

UniApp 项目模板，包含了一些常用的包和配置，方便开始一个新的项目。

## 克隆

> [!NOTE]
> 目前该项目仅同步了上游的 `vite-ts` 分支。

推荐使用 degit 或 tiged 克隆项目。

```bash
npx degit https://github.com/haixeefrontend/uniapp-starter.git#vite-ts my-project
```

```bash
npx tiged https://github.com/haixeefrontend/uniapp-starter.git#vite-ts my-project
```

如果遇到下载速度慢的问题，并且你的 Git 配置了 SSH，可以直接用 SSH 地址克隆。

```bash
git clone --depth --single-branch --branch=vite-ts git@github.com:haixeefrontend/uniapp-starter.git my-project
# 记得删除 .git 目录，重新初始化 Git
cd my-project
rm -rf .git
git init
```

然后你可以使用 `yarn` 安装依赖并开始开发。

## 同步改动

如果你想同步上游的改动，可以在本地项目中添加上游仓库并拉取上游的改动。

```bash
git remote add upstream git@github.com:dcloudio/uni-preset-vue.git # 或者使用 HTTPS 地址
git fetch upstream
```

然后使用 `git rebase` 合并上游的改动。

```bash
git rebase -i upstream/vite-ts
```

如果有冲突，解决冲突后使用 `git rebase --continue` 继续合并。

rebase 合并完成后，使用 `git push -f` 强制推送到你的仓库。

> [!WARNING]
> 请注意，强制推送会覆盖你的远程仓库的改动，请在提交之前确认你的改动。
