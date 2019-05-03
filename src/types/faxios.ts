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
  