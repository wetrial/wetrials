import { CancelTokenSource } from 'axios';
import { IRequestOption } from './index';

interface ICancelObj {
  token: CancelTokenSource;
  ignoreCancel?: boolean;
}
export class RequestManager {
  private tokens: Map<string, ICancelObj> = new Map();

  private getKey(config: IRequestOption) {
    // 如果传递了requestKey则直接使用
    let requestKey = config.requestKey;
    // 没有则从url中解析
    if (!requestKey) {
      // 去掉url中的?后作为key
      const queryIndex = config.url?.indexOf('?');
      let urlKey = config.url;
      if (queryIndex !== -1) {
        urlKey = urlKey?.substring(0, queryIndex);
      }
      requestKey = urlKey;
    }

    return `${requestKey}-${config.method}`;
  }

  addToken(config: IRequestOption, tokenObj: ICancelObj) {
    const key = this.getKey(config);
    this.tokens.set(key, tokenObj);
  }

  removeToken(config: string): void;
  removeToken(config: IRequestOption): void;
  removeToken(config: string | IRequestOption): void {
    let key: string;
    if (typeof config !== 'string') {
      key = this.getKey(config);
    } else {
      key = config;
    }
    if (this.tokens.has(key)) {
      this.tokens.delete(key);
    }
  }

  clearToken() {
    this.tokens.clear();
  }

  cancelRequest(config: string): void;
  cancelRequest(config: IRequestOption): void;
  cancelRequest(config: string | IRequestOption): void {
    // if(process.server)return
    let key;
    if (typeof config === 'string') {
      key = config;
    } else {
      key = this.getKey(config);
    }
    const cancelToken = this.tokens.get(key);
    if (cancelToken) {
      if (!cancelToken.ignoreCancel) {
        cancelToken.token?.cancel();
      }
      this.removeToken(key);
    }
  }

  cancelAllRequest() {
    // if(process.server)return
    this.tokens.forEach((ICancelObj, key) => {
      this.cancelRequest(key);
    });
    this.clearToken();
  }
}

const manager = new RequestManager();

export default manager;
