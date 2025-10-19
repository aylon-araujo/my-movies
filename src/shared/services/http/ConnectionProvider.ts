import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

type RequestInterceptor = {
  onFulfilled?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected?: (error: AxiosError) => Promise<unknown>;
};

type ResponseInterceptor = {
  onFulfilled?: (
    response: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: AxiosError) => Promise<unknown>;
};

type ConnectionProviderProps = {
  externalApiUrl: string;
  prefix?: string;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;
};

export class ConnectionProvider {
  protected readonly connection: AxiosInstance;

  constructor({
    externalApiUrl,
    prefix,
    requestInterceptor,
    responseInterceptor,
  }: ConnectionProviderProps) {
    this.connection = axios.create({
      baseURL: this.buildBaseURL(externalApiUrl, prefix),
    });

    this.setRequestInterceptor(requestInterceptor);
    this.setResponseInterceptor(responseInterceptor);
  }

  private setRequestInterceptor(interceptor?: RequestInterceptor) {
    if (interceptor?.onFulfilled || interceptor?.onRejected) {
      this.connection.interceptors.request.use(
        interceptor.onFulfilled,
        interceptor.onRejected
      );
    }
  }

  private setResponseInterceptor(interceptor?: ResponseInterceptor) {
    if (interceptor?.onFulfilled || interceptor?.onRejected) {
      this.connection.interceptors.response.use(
        interceptor.onFulfilled,
        interceptor.onRejected
      );
    }
  }

  private buildBaseURL(baseURL: string, prefix?: string): string {
    const cleanBase = baseURL.replace(/\/+$/, '');
    const cleanPrefix = prefix ? prefix.replace(/^\/+/, '') : '';
    return cleanPrefix ? `${cleanBase}/${cleanPrefix}` : cleanBase;
  }

  public getInstance(): AxiosInstance {
    return this.connection;
  }
}
