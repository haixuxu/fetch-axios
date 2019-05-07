import {FaxiosRequest, FaxiosResponse, FaxiosOptions} from './types/faxios';
import {serialize, getFormData, transformHeader, promiseTimeout, promiseResolveReduce} from './utils';
import defaultOption from './default';
/**
 * design
 *  |-----custom transform FaxiosRequest ---->|or|-----global transform FaxiosRequest ---->|
 *  |--------request interceptor ------------>|
 *  |-------FaxiosRequest => Request -------->|
 *  |--------_ window.fetch(Request)----_---->|
 *  |------Response => FaxiosResponse ------->|
 *  |--------response interceptor ----------->|
 *  |-----custom transform FaxiosResponse---->|or|-----global transform FaxiosRequest ---->|
 */

/**
 * 定义FetchClient要做的事
 */
export default class Faxios {
  private interceptors: {request: any[]; response: any[]};
  private defaultOps: FaxiosOptions = {};
  constructor(options: FaxiosOptions = {}) {
    this.interceptors = {
      request: [],
      response: [],
    };
    Object.assign(this.defaultOps, defaultOption, options);
  }

  public addRequestInterceptor(interceptor: any) {
    this.interceptors.request.push(interceptor);
  }

  public addResponseInterceptor(interceptor: any) {
    this.interceptors.response.push(interceptor);
  }

  public config(options: FaxiosOptions = {}) {
    Object.assign(this.defaultOps, options);
  }
  /**
   * define FaxiosRequest=>FaxiosResponse
   * @param req
   */
  public async request(req: FaxiosRequest): Promise<FaxiosResponse<any>> {
    const customOps: FaxiosOptions = req.config || {};
    let res;
    const timeout = customOps.timeout || this.defaultOps.timeout || 30000;
    req.config = Object.assign({}, this.defaultOps, req.config);
    try {
      if (customOps.transformRequest) {
        // custom transform FaxiosRequest
        req = await customOps.transformRequest(req);
      } else if (this.defaultOps.transformRequest) {
        // global transform FaxiosRequest
        req = await this.defaultOps.transformRequest(req);
      }
      // resolve request interceptor
      req = await this.resolveRequestInterceptor(req);
      // transform FaxiosRequest => Request
      const request = await this.transformRequest(req);
      const response = await promiseTimeout(timeout, window.fetch(request));
      // transform Response => FaxiosResponse
      res = await this.transformResponse(response, req);
      // resolve response interceptor
      res = await this.resolveResponseInterceptor(res);
      if (customOps.transformResponse) {
        // custom transform FaxiosResponse
        res = await customOps.transformResponse(res);
      } else if (this.defaultOps.transformResponse) {
        // global transform FaxiosResponse
        res = await this.defaultOps.transformResponse(res);
      }

      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private async transformRequest(req: FaxiosRequest): Promise<Request> {
    const customOps: FaxiosOptions = req.config || {};
    const reqOps = Object.assign({}, this.defaultOps, customOps);
    const {mode, credentials} = reqOps;
    const {method, query, payload} = req;
    let url = req.url;
    let headers = req.headers;
    if (reqOps.baseUrl) {
      url = reqOps.baseUrl + url;
    }
    if (!url) {
      throw new Error('request: url is undefined.');
    }

    if (!method) {
      throw new Error('request: method is undefined.');
    }

    if (method.toUpperCase() === 'GET') {
      url += '?' + serialize(query);
    }
    headers = Object.assign({}, this.defaultOps.headers, headers || {});
    let body = payload;
    const contentType = headers['Content-Type'];
    if (body) {
      if (contentType === 'application/x-www-form-urlencoded') {
        body = serialize(payload);
      } else if (contentType === 'multipart/form-data') {
        body = getFormData(payload);
        delete headers['Content-Type'];
      } else if (contentType === 'application/json') {
        body = JSON.stringify(payload);
      } else {
        body = serialize(payload);
      }
    }
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request
    const requestInit: RequestInit = {
      method,
      headers,
      body,
      mode,
      credentials,
      // cache,
      // redirect,
      // referrer,
      // integrity,
    };
    return new Request(url, requestInit);
  }

  private async transformResponse(response: Response, req: FaxiosRequest): Promise<FaxiosResponse<any>> {
    const resp: FaxiosResponse<any> = {
      data: null,
      status: response.status,
      statusText: response.statusText,
      headers: transformHeader(response.headers),
      config: req.config || {},
      request: req,
      originalResponse: response,
    };
    if (response.ok) {
      let contentType = response.headers.get('Content-Type') || 'application/json';
      contentType = contentType.toLowerCase();
      if (/^application\/json/.test(contentType)) {
        resp.data = await response.json();
      } else if (/^text\/plain/.test(contentType)) {
        resp.data = await response.text();
      } else if (/^application\/octet-stream/.test(contentType)) {
        resp.data = await response.blob();
      } else {
        try {
          resp.data = await response.json();
        } catch (e) {
          console.warn('unknow content-type to parse response!');
          // ignore...
        }
      }
    }
    return resp;
  }
  private resolveRequestInterceptor(request: any) {
    return promiseResolveReduce(request, this.interceptors.request);
  }

  private resolveResponseInterceptor(response: any) {
    return promiseResolveReduce(response, this.interceptors.response);
  }
}
