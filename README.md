### faxios

faxios like axios implement with fetch api

### usage

```ts
import fetchApi from 'fetch-axios';
import {FaxiosResponse, FaxiosRequest, RequestInterceptor, ResponseInterceptor} from 'fetch-axios';
import errors from '@/common/errors';
fetchApi.config({
  baseUrl: '/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: (res: FaxiosResponse<any>) => {
    if (res.status >= 200 && res.status < 300) {
      const data = res.data;
      if (data.status === 'ok') {
        // business ok
        return data.data;
      } else {
        throw new errors.BuessinessError({code: data.code, message: data.message});
      }
    } else {
      throw new errors.NetworkError({httpCode: res.status, message: res.statusText});
    }
  },
});

const reqAop: RequestInterceptor = (req: FaxiosRequest) => {
  console.log('RequestInteceptor...');
  console.log(req);
  return req;
};
const resAop: ResponseInterceptor = (res: FaxiosResponse) => {
  console.log('ResponseInteceptor....');
  console.log(res);
  return res;
};

fetchApi.addRequestInterceptor(reqAop);
fetchApi.addResponseInterceptor(resAop);

export default fetchApi;
```

### design

```js
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
```

### api types

```ts
interface NormalObject {
  [key: string]: string;
}

export interface FaxiosOptions {
  baseUrl?: string;
  headers?: NormalObject;
  timeout?: number;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  transformRequest?: (request: FaxiosRequest) => FaxiosRequest;
  transformResponse?: (response: FaxiosResponse<any>) => FaxiosResponse<any>;
}

export interface FaxiosRequest {
  url?: string;
  method?: string;
  headers?: NormalObject;
  query?: NormalObject;
  urlParams?: NormalObject;
  payload?: any;
  config?: FaxiosOptions;
}

export interface FaxiosResponse<T> {
  status: number;
  statusText: string;
  data: T;
  headers: NormalObject;
  config: FaxiosOptions;
  request: FaxiosRequest;
  originalResponse: Response;
}

export type RequestInterceptor = (req: FaxiosRequest) => FaxiosRequest;
export type ResponseInterceptor = (res: FaxiosResponse<any>) => FaxiosResponse<any>;
```

### faxios api

```ts
type ReqMethod = (url: string, options: FaxiosRequest) => Promise<FaxiosResponse<any>>;
interface FaxiosApi {
  get: ReqMethod;
  post: ReqMethod;
  put: ReqMethod;
  delete: ReqMethod;
  patch: ReqMethod;
  request: (options: FaxiosRequest) => Promise<FaxiosResponse<any>>;
  config: (defaultOpts: FaxiosOptions) => void;
  addRequestInterceptor: (reqInterceptor: any) => void;
  addResponseInterceptor: (resInterceptor: any) => void;
  FaxiosApi: any;
}
```
