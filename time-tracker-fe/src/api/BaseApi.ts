/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

class BaseApi {
    private _axios = axios.create({
        baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    constructor() {
        this._axios.interceptors.request.use(this.requestHandler, (error) => Promise.reject(error));

        this._axios.interceptors.response.use((response) => response, this.errorHandler);
    }

    private async requestHandler(request: any) {
        const token = localStorage.getItem("token");
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    }

    private async errorHandler(error: any) {
        if (error.response?.status === 401) {
            console.error("Token expired");
        }
        return Promise.reject(error);
    }

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
