import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

class BaseApi {
    private _axios = axios.create({
        baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    get = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return this._axios.get(url, config);
    };

    post = async (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return this._axios.post(url, data, config);
    };

    put = async (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return this._axios.put(url, data, config);
    };

    patch = async (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return this._axios.patch(url, data, config);
    };

    delete = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return this._axios.delete(url, config);
    };
}

export const baseApi = new BaseApi();
