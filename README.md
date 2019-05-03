### faxios

faxios like axios implement with fetch api

### usage

```
import fetchApi from 'faxios';
import {FaxiosResponse, FaxiosRequest, RequestInteceptor, ResponseInteceptor} from 'faxios';
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

const reqAop: RequestInteceptor = (req: FaxiosRequest) => {
  console.log('RequestInteceptor...');
  console.log(req);
  return req;
};
const resAop: ResponseInteceptor = (res: FaxiosResponse) => {
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
