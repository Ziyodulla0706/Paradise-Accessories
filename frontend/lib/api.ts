/**
 * API client for Django backend integration
 * This will be used when Django backend is connected
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email?: string;
  product_type: string;
  quantity?: number;
  message?: string;
  file?: File;
  language: string;
  source?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details?: any;
  };
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: response.status,
            message: data.error?.message || 'An error occurred',
            details: data.error?.details,
          },
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 500,
          message: error instanceof Error ? error.message : 'Network error',
        },
      };
    }
  }

  async submitContactForm(formData: ContactFormData): Promise<ApiResponse<{ lead_id: number }>> {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('phone', formData.phone);
    if (formData.email) formDataToSend.append('email', formData.email);
    formDataToSend.append('product_type', formData.product_type);
    if (formData.quantity) formDataToSend.append('quantity', formData.quantity.toString());
    if (formData.message) formDataToSend.append('message', formData.message);
    if (formData.file) formDataToSend.append('file', formData.file);
    formDataToSend.append('language', formData.language);
    if (formData.source) formDataToSend.append('source', formData.source);

    try {
      const response = await fetch(`${this.baseURL}/api/contact/submit/`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: response.status,
            message: data.error?.message || 'An error occurred',
            details: data.error?.details,
          },
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 500,
          message: error instanceof Error ? error.message : 'Network error',
        },
      };
    }
  }

  async getPortfolio(locale: string = 'ru') {
    return this.request(`/api/content/portfolio/?lang=${locale}`);
  }

  async getProducts(locale: string = 'ru') {
    return this.request(`/api/content/products/?lang=${locale}`);
  }

  async trackAnalytics(event: {
    event_type: string;
    page: string;
    language: string;
    session_id: string;
    referrer?: string;
    metadata?: any;
  }) {
    return this.request('/api/analytics/track/', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
