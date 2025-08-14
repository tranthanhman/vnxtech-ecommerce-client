/* eslint-disable @typescript-eslint/no-explicit-any */

export const api = {
  get: async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
      const response = await fetch(url, { ...options, method: "GET" });
      if (!response.ok) {
        throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`GET request to ${url} failed:`, error);
      throw error;
    }
  },

  post: async <T = any>(url: string, data: any, options: RequestInit = {}): Promise<T> => {
    try {
      const response = await fetch(url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`POST ${url} failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`POST request to ${url} failed:`, error);
      throw error;
    }
  },

  put: async <T = any>(url: string, data: any, options: RequestInit = {}): Promise<T> => {
    try {
      const response = await fetch(url, {
        ...options,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`PUT ${url} failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`PUT request to ${url} failed:`, error);
      throw error;
    }
  },

  delete: async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
      const response = await fetch(url, { ...options, method: "DELETE" });
      if (!response.ok) {
        throw new Error(`DELETE ${url} failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`DELETE request to ${url} failed:`, error);
      throw error;
    }
  },
};
