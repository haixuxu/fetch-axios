/**
 * 数据请求服务
 * 使用HttpClient
 */

import Faxios from './Faxios';
import {FaxiosOptions, FaxiosRequest, FaxiosResponse} from './types/faxios';

class FaxiosApi extends Faxios {
  public async get(url: string, options: FaxiosRequest) {
    options.method = 'GET';
    options.url = url;
    return this.request(options);
  }
  public async post(url: string, options: FaxiosRequest) {
    options.method = 'POST';
    options.url = url;
    return this.request(options);
  }
  public async delete(url: string, options: FaxiosRequest) {
    options.method = 'DELETE';
    options.url = url;
    return this.request(options);
  }
  public async put(url: string, options: FaxiosRequest) {
    options.method = 'PUT';
    options.url = url;
    return this.request(options);
  }
  public async patch(url: string, options: FaxiosRequest) {
    options.method = 'PATCH';
    options.url = url;
    return this.request(options);
  }
}

const defaultApi: any = new FaxiosApi();
defaultApi.FaxiosApi = FaxiosApi;
// export {Faxios, FaxiosApi, FaxiosOptions, FaxiosRequest, FaxiosResponse};
export default defaultApi;
