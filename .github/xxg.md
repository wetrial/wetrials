# Contributing to wetrials

## Set up

Install dev deps after git clone the repo.

```bash
$ yarn
```

## Common Tasks

Transform with babel and rollup.

```bash

# 在开发环境中启动
$ yarn start

# Build
$ yarn build

# Build and monitor file changes
$ yarn build --watch

# Build specified package only
$ PACKAGE=plugin-antd yarn build --watch
```

Run test.

```bash
$ yarn test

# Test specified file and watch
$ yarn test getMockData.test.js -w

# Test specified package
$ yarn test --package core

# Generate coverage
$ yarn test --coverage
```

## Release

1. 修改对应包 package.json 中的版本号
2. 打 tag，tag 规则为包+版本

```bash
git tag @wetrial/provider@4.0.0-beta.6  && git push origin @wetrial/provider@4.0.0-beta.6
git tag @wetrial/core@4.0.0-beta.6 && git push origin @wetrial/core@4.0.0-beta.6
git tag @wetrial/hooks@4.0.0-beta.6 && git push origin @wetrial/hooks@4.0.0-beta.6
git tag @wetrial/component@4.0.0-beta.6 && git push origin @wetrial/component@4.0.0-beta.6
```

3. 按 git commit 规范提交(会自动发布)

> git submit 规范请参考 https://www.conventionalcommits.org/en/v1.0.0/

### nav

对应顶部菜单栏，排在第三位；配置如下；

| 配置项 | 说明               | 值   |
| ------ | ------------------ | ---- |
| title  | 前端文档           | doc  |
| order  | 在顶部菜单中的顺序 | 100  |
| path   | 路由的基础路径     | /doc |

### group

对应左边的左侧菜单栏分组

| order | title    | path      |
| ----- | -------- | --------- |
| 1     | 团队风格 | /standard |
| 2     | 设计规范 | /design   |
| 3     | 样式     | /style    |
| 4     | 教程     | /course   |
| 10    | 其他     | /other    |
