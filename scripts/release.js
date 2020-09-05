/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { utils } = require('umi');
const { join } = require('path');
const npmPublish = require('@jsdevtools/npm-publish');
// const exec = require('./utils/exec');
const getPackages = require('./utils/getPackages');
// const isNextVersion = require('./utils/isNextVersion');

const { yParser, execa, chalk } = utils;
const cwd = process.cwd();
const args = yParser(process.argv);

function printErrorAndExit(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}

function packageExists({ name, version }) {
  const { stdout } = execa.sync('npm', ['info', `${name}@${version}`]);
  return stdout.length > 0;
}

async function release() {
  logStep(`args:${JSON.stringify(args)}`);
  // 从args中解析出tag
  if (!args.tag) {
    printErrorAndExit(`没有匹配到tag，确保tag符合(@wetrial/xxxx)格式`);
    return;
  }

  const githubTag = args.tag;
  const matchs = /@wetrial\/([0-9a-zA-Z_-]+)@/gi.exec(githubTag);
  if (!matchs || !matchs.length) {
    printErrorAndExit(`解析tag名称失败:${githubTag}`);
    return;
  }
  // 从tags中解析出来的实际文件夹名称
  const currentPKG = matchs[1];
  if (!currentPKG) {
    printErrorAndExit(`解析文件夹名称失败:${githubTag}`);
    return;
  }

  if (!args.npm_token) {
    printErrorAndExit(`没有解析到npm_token`);
    return;
  }

  console.log(`解析到的名称为:${currentPKG}`);

  // Check npm registry
  logStep('check npm registry');
  const userRegistry = execa.sync('npm', ['config', 'get', 'registry']).stdout;
  if (userRegistry.includes('https://registry.yarnpkg.com/')) {
    printErrorAndExit(`Release failed, please use ${chalk.blue('npm run release')}.`);
  }
  if (!userRegistry.includes('https://registry.npmjs.org/')) {
    const registry = chalk.blue('https://registry.npmjs.org/');
    printErrorAndExit(`Release failed, npm registry must be ${registry}.`);
  }

  logStep('build');
  execa.sync('npm', ['run', 'build']);

  // Publish
  // Umi must be the latest.
  const pkgs = getPackages();
  logStep(`list packages: ${chalk.blue(pkgs.join(', '))}`);

  pkgs.forEach((pkg, index) => {
    if (pkg === currentPKG) {
      const pkgPath = join(cwd, 'packages', pkg);
      const { name, version } = require(join(pkgPath, 'package.json'));
      let isPackageExist = false;
      if (!args.publishOnly) {
        isPackageExist = packageExists({ name, version });
        if (isPackageExist) {
          console.log(`package ${name}@${version} is already exists on npm, skip.`);
        }
      }

      if (!isPackageExist) {
        console.log(
          `[${index + 1}/${pkgs.length}] Publish package ${name},use token ${args.npm_token} `,
        );

        console.log(`path:${join(pkgPath, 'package.json')}`);

        npmPublish({
          token: args.npm_token,
          package: join(pkgPath, 'package.json'),
        }).then((publishResult) => {
          console.log(publishResult);
        });

        // const result = execa.sync('npm-publish', ['--token', args.npm_token], {
        //   cwd: pkgPath,
        // });
      }
    }
  });

  // await exec('npm', ['run', 'prettier']);

  logStep('done');
}

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
