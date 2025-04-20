import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { handleAuth, handleResponse } from "@/utils/requests";
import type { ResponseResultDataInterface } from "./interfaces";

const config = {
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 3000
};

class Request {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config = handleAuth(config);
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.status !== 200) return Promise.reject(res.data);
        return res.data;
      },
      error => {
        if (!error.response) handleResponse(error.message);
        return Promise.reject(error);
      }
    );
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResponseResultDataInterface<T>> {
    return this.instance.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResponseResultDataInterface<T>> {
    return this.instance.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResponseResultDataInterface<T>> {
    return this.instance.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResponseResultDataInterface<T>> {
    return this.instance.delete(url, { params, ..._object });
  }
}

export default new Request(config);
