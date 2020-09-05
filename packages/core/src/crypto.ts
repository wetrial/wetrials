/* eslint-disable no-bitwise */
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

/**
 * 对内容进行base64处理
 * @param content 要base64的内容
 */
export function base64(content: string | object): string {
  const type = typeof content;
  let result = content;
  if (type === 'object') {
    result = JSON.stringify(content);
  } else if (type === 'string' && (content as string).length > 0) {
    const utf8Content = CryptoJS.enc.Utf8.parse(content as string);
    result = CryptoJS.enc.Base64.stringify(utf8Content);
  }
  return result as string;
}

/**
 * 对内容进行debase64
 * @param content 内容
 */
export function debase64(content: string): string {
  if (typeof content === 'string' && content.length > 0) {
    const result = CryptoJS.enc.Base64.parse(content);
    return CryptoJS.enc.Utf8.stringify(result);
  }
  return '';
}

// ---------------------------------------------------CryptoJS加密相关------------------------------------

/**
 * 对数据内容进行加密-3des加密
 * @param content 要加密的内容
 * @param key 密钥
 * @returns 返回加密后的内容
 */
export function encrypt(content: string | object, key: string): string {
  if (key.length !== 32) {
    throw Error('密钥长度必须为32位');
  }
  let body = content;
  if (!body) {
    return '';
  }
  if (typeof body === 'object') {
    body = JSON.stringify(body);
  }

  const keys = CryptoJS.enc.Utf8.parse(key.substr(0, 24));
  const cryptoContent = CryptoJS.TripleDES.encrypt(body, keys, {
    iv: CryptoJS.enc.Utf8.parse(key.substr(24, 8)), // iv偏移量
    mode: CryptoJS.mode.CBC, // CBC模式
    // mode: CryptoJS.mode.ECB,  //ECB模式
    padding: CryptoJS.pad.Pkcs7, // padding处理
  });
  return cryptoContent.toString();
}

/**
 * 对数据进行解密-3des解密
 * @param cryptoBody 加密内容
 * @param key 解密密钥
 */
export function decrypt(cryptoBody: string, key: string): string {
  const keys = CryptoJS.enc.Utf8.parse(key);
  const decryptContent = CryptoJS.TripleDES.decrypt(cryptoBody, keys, {
    iv: CryptoJS.enc.Utf8.parse(key.substr(24, 8)), // iv偏移量
    mode: CryptoJS.mode.CBC,
    // mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  // 解析数据后转为UTF-8
  return decryptContent.toString(CryptoJS.enc.Utf8);
}

// /**
//  * 解密响应内容 (慎用)
//  * @param data 要解密的内容
//  * @param key 解密密钥
//  */
// export function decryptResponse(data:string|object,key:string):string{
//     const type = typeof data;
//     if (type === 'object') {
//         const result={
//             Data:''
//         }
//         if (typeof data.Data === 'string') {
//             result.Data = decrypt(data.Data, key);
//             result.Data=JSON.parse(result.Data);
//         }
//         return result;
//     }
//     else if (type === 'string') {
//         let result= decrypt(data, key);
//         try {
//             result = JSON.parse(result);
//         }
//         catch (e) { // non-standard
//             result.Data = data.Data;
//         }
//         return result;
//     }
//     return data;
// }

/**
 * 对密钥进行RAS加密
 * @param key 密钥
 */
export function encryptKey(key: string): string {
  return rsaEncrypt(key);
}

// -----------------------------------------jsencrypt RSA加密相关------------------------------------

/**
 * RSA key
 */
let RSAKEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5HI3rQq9BKcruxYfqgnkhyuI+9CGf1jYsyzWYpdw/3Cv9TX4u5w2GjcYoxzBY5s6ZcXbb4oGoLt9rn93g7sKT01tyUO/iQdYiOTvPsFiqcInMVHhaazBy5nH50owObGs+PRubc8bP+a+DT3vV8+l7TEd/H9pdwok/r7GlIIe5uQIDAQAB';

let B64MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const B64PAD = '=';

const jsencrypt = new JSEncrypt();
// 设置密钥
jsencrypt.setPublicKey(RSAKEY);

export function configRSAKey(key: string) {
  RSAKEY = key;
  jsencrypt.setPublicKey(RSAKEY);
}

export function configBase64Map(map: string) {
  B64MAP = map;
}

function hex2b64(h: string) {
  let i;
  let c;
  let ret = '';
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += B64MAP.charAt(c >> 6) + B64MAP.charAt(c & 63);
  }
  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += B64MAP.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += B64MAP.charAt(c >> 2) + B64MAP.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += B64PAD;
  }
  return ret;
}

/**
 * RSA加密
 * @param input 要加密的内容
 */
export function rsaEncrypt(input: string): string {
  let result;
  do {
    result = jsencrypt.getKey().encrypt(input);
  } while (result.length !== 256);
  return hex2b64(result);
}

/**
 * RSA加密 -如果需要加密的字符串比较长，可以分段加密，然后返回以逗号分隔的加密字符串
 * @param input 要加密的内容
 */
export function encryptSection(input: string): string {
  const len = 117; // 最大长度为117
  const sectionLen = input.length / len;
  const rsaLength = sectionLen % 1 === 0 ? sectionLen : Math.floor(sectionLen) + 1;
  const arr: string[] = [];
  for (let i = 0; i < rsaLength; i++) {
    arr.push(rsaEncrypt(input.substring(i * len, (i + 1) * len)));
  }
  return arr.join(',');
}

/**
 * encryptSection方法 带encodeURIComponent
 * @param content 加密内容
 */
export function encryptSectionWithEncode(content: string | object): string {
  let result = content;
  if (typeof content === 'object') {
    result = JSON.stringify(content);
  }
  return encodeURIComponent(encryptSection(result as string));
}

/**
 * 简单的将内容转二进制
 * @param data 要转换的数据
 */
export function encryptBtoa(data: any[] | object | string): string {
  let strData;
  if (Array.isArray(data) || typeof data === 'object') {
    strData = JSON.stringify(data);
  } else {
    strData = data;
  }
  // 处理中文问题
  strData = encodeURIComponent(strData);
  return btoa(strData);
}

/**
 * 将字符串内容二进制解码
 * @param data 要解码的二进制内容
 */
export function decryptAtob(data: string): string {
  return decodeURIComponent(atob(data));
}
