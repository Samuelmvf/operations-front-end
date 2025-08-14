/**
 * Base Repository Class
 * Provides common functionality for all repository classes including:
 * - Standardized error handling
 * - Response formatting
 * - Common HTTP methods
 */
import httpAxios from "@/lib/api-client";

export class BaseRepository {
  constructor(basePath = "") {
    this.basePath = basePath;
    this.httpClient = httpAxios;
  }

  /**
   * Handles API responses and errors consistently
   * @param {Promise} apiCall - The axios promise
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async handleApiCall(apiCall) {
    try {
      const response = await apiCall;
      return {
        success: true,
        data: response.data?.data || response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handles different types of API errors
   * @param {Error} error - The error object from axios
   * @returns {{success: boolean, error: string, details?: any}}
   */
  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return {
            success: false,
            error: data?.message || "Bad request",
            details: data?.errors || null,
          };
        case 401:
          return {
            success: false,
            error: data?.message || "Authentication failed. Please login again.",
          };
        case 403:
          return {
            success: false,
            error: data?.message || "Access denied",
          };
        case 404:
          return {
            success: false,
            error: data?.message || "Resource not found",
          };
        case 422:
          return {
            success: false,
            error: data?.message || "Validation failed",
            details: data?.errors || null,
          };
        case 500:
          return {
            success: false,
            error: "Internal server error. Please try again later.",
          };
        default:
          return {
            success: false,
            error: data?.message || `Request failed with status ${status}`,
          };
      }
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      };
    } else {
      // Other error
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const url = `${this.basePath}${endpoint}`;
    return this.handleApiCall(this.httpClient.get(url, { params }));
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    const url = `${this.basePath}${endpoint}`;
    return this.handleApiCall(this.httpClient.post(url, data));
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    const url = `${this.basePath}${endpoint}`;
    return this.handleApiCall(this.httpClient.put(url, data));
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    const url = `${this.basePath}${endpoint}`;
    return this.handleApiCall(this.httpClient.delete(url));
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = {}) {
    const url = `${this.basePath}${endpoint}`;
    return this.handleApiCall(this.httpClient.patch(url, data));
  }
}

export default BaseRepository;
