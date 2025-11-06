// API Client for Edge Functions
import type { FormData, VideoStatusResponse, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:54321/functions/v1';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
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
          error: data.error || 'Request failed',
          details: data.details
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async submitForm(formData: FormData): Promise<ApiResponse> {
    return this.request('handle-form-submission', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  }

  async checkVideoStatus(requestId: string): Promise<ApiResponse<VideoStatusResponse>> {
    return this.request(`check-video-status?request_id=${requestId}`, {
      method: 'GET'
    });
  }

  async getSubscription(userId: string): Promise<ApiResponse> {
    return this.request(`manage-subscriptions?user_id=${userId}`, {
      method: 'GET'
    });
  }

  async getPricingTiers(): Promise<ApiResponse> {
    return this.request('manage-subscriptions?action=tiers', {
      method: 'GET'
    });
  }

  async updateSubscription(userId: string, tier: string): Promise<ApiResponse> {
    return this.request('manage-subscriptions', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, tier })
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;