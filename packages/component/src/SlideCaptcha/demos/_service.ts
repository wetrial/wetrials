const datas = require('./data.json');

// 模拟后端缓存键值对
const tokenValue = {
  '301e032b32cc4f548cdbe07e393a0d21': 137,
  '9aba0821bd524b25921d4466471bc01b': 231,
  ca7c85663c53486e81560b504e5ab4ed: 203,
  '11ed043eb3f04e47b100cb9550155430': 116,
  '7b00bc88000b4b74bc6de1968f59c0c8': 182,
  '5d850ad9325d4b078812e11f6bc57bf3': 217,
};

async function generate() {
  return new Promise((resolve) => {
    const index = Math.ceil(Math.random() * 10) % datas.length;
    resolve(datas[index]);
  });
}

async function check({ token, point }) {
  // eslint-disable-next-line no-console
  console.log(token, point);
  return new Promise((resolve, reject) => {
    if (Math.abs(tokenValue[token] - point) <= 2) {
      resolve('成功');
      return;
    }
    reject(new Error('验证失败'));
  });
}

export { generate, check };
