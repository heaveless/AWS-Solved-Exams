import { Injectable } from '@heaveless/core';
import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { ConfigService } from './config.service';

@Injectable()
export class HttpService {
  private readonly instance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.instance = Axios.create({
      baseURL: this.configService.get<string>('CONF_SWAPI_API_URL'),
    });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.make<T>(this.instance.request, config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.make<T>(this.instance.get, url, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.make<T>(this.instance.delete, url, config);
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.make<T>(this.instance.head, url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.make<T>(this.instance.post, url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.make<T>(this.instance.put, url, data, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.make<T>(this.instance.patch, url, data, config);
  }

  get axiosRef(): AxiosInstance {
    return this.instance;
  }

  protected make<T>(
    axios: (...args: any[]) => AxiosPromise<T>,
    ...args: any[]
  ) {
    return new Promise<T>((resolve, reject) => {
      axios(...args)
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  }
}
