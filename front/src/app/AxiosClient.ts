/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

//should be in ENV 
const API_URL = 'http://localhost:1337/api/v1';

axios.defaults.baseURL = API_URL;
// axios.defaults.withCredentials = true;

const getResponseData = async <T>(axiosRequest: Promise<AxiosResponse<T>>): Promise<T> => {
  const response = await axiosRequest;
  return response.data;
};

class AxiosClient {

  get = <OUT>(url: string, config?: AxiosRequestConfig): Promise<OUT> =>
    getResponseData<OUT>(axios.get<OUT>(url, config));

  post = <IN, OUT>(url: string, body?: IN, config?: AxiosRequestConfig): Promise<OUT> =>
    getResponseData<OUT>(axios.post<OUT>(url, body, config));

  postForm = <OUT>(url: string, data?: FormData): Promise<OUT> =>
    getResponseData<OUT>(axios.post<OUT>(url, data));

  put = <IN, OUT>(url: string, body: IN, config?: AxiosRequestConfig): Promise<OUT> =>
    getResponseData<OUT>(axios.put<OUT>(url, body, config));

  delete = <OUT>(url: string, config?: AxiosRequestConfig): Promise<OUT> =>
    getResponseData<OUT>(axios.delete<OUT>(url, config));
}

export default new AxiosClient();
