import {FaxiosRequest, FaxiosResponse, FaxiosOptions, RequestInterceptor, ResponseInterceptor} from './faxios';

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

declare let faxiosApi: FaxiosApi;
export {FaxiosApi, FaxiosOptions, FaxiosRequest, FaxiosResponse, RequestInterceptor, ResponseInterceptor};
export default faxiosApi;
