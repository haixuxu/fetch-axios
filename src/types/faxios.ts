interface NormalObject {
  [key: string]: string;
}

export interface FaxiosOptions {
  baseUrl?: string;
  headers?: NormalObject;
  timeout?: number;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  beforeRequest?: (req: FaxiosRequest, request: Request) => void;
  afterRequest?: (req: FaxiosRequest, response: Response) => void;
  transformRequest?: (req: FaxiosRequest) => FaxiosRequest;
  transformResponse?: (res: FaxiosResponse<any>) => FaxiosResponse<any>;
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

export type RequestInterceptor = (req: FaxiosRequest) => Promise<any>;
export type ResponseInterceptor = (res: FaxiosResponse<any>) => Promise<any>;
