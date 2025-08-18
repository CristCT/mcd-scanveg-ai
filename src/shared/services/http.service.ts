import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '../types';

/**
 * HTTP service class for making API requests
 * Provides a centralized way to handle HTTP operations with error handling
 */
class HttpService {
  private api: AxiosInstance;

  /**
   * Initializes the HTTP service with axios configuration
   */
  constructor() {
    const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors for logging and error handling
   */
  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Performs a GET request to the specified URL
   * @param url - The endpoint URL
   * @param config - Optional axios request configuration
   * @returns Promise resolving to API response with typed data
   */
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Performs a POST request to the specified URL
   * @param url - The endpoint URL
   * @param data - Request payload data
   * @param config - Optional axios request configuration
   * @returns Promise resolving to API response with typed data
   */
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  /**
   * Performs a POST request with FormData (for file uploads)
   * @param url - The endpoint URL
   * @param formData - FormData object containing files and data
   * @param config - Optional axios request configuration
   * @returns Promise resolving to API response with typed data
   */
  async postFormData<T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, formData, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  /**
   * Handles and formats errors from API requests
   * @param error - The error object from axios
   * @returns Formatted error response
   */
  private handleError<T>(error: unknown): ApiResponse<T> {
    const errorObj = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    const message =
      errorObj.response?.data?.message ||
      errorObj.message ||
      'Something went wrong';
    return {
      success: false,
      error: message,
    };
  }
}

export const httpService = new HttpService();
