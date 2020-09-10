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
# 以core包为例
git tag @wetrial/core@1.0.0-beta1
```

3. 按 git commit 规范提交(会自动发布)

> git submit 规范请参考 https://www.conventionalcommits.org/en/v1.0.0/
