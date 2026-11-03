// Career Accelerator HTTP & LocalStorage Client connecting to Express Backend

const STORAGE_KEY_PREFIX = 'career_pilot_';
const API_BASE = '/api';

export const delay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
  static getItem<T>(key: string, defaultData: T): T {
    try {
      const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return item ? JSON.parse(item) : defaultData;
    } catch {
      return defaultData;
    }
  }

  static setItem<T>(key: string, data: T): void {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save to local storage', err);
    }
  }

  static clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_KEY_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }

  /**
   * Performs real HTTP GET request to Express backend with fallback
   */
  static async httpGet<T>(endpoint: string, fallback: T): Promise<T> {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      return json.data !== undefined ? json.data : (json.user !== undefined ? json.user : (json.report !== undefined ? json.report : (json.questions !== undefined ? json.questions : json)));
    } catch (err) {
      console.warn(`[Backend API] GET ${endpoint} unavailable, using cached state`, err);
      return fallback;
    }
  }

  /**
   * Performs real HTTP POST request to Express backend
   */
  static async httpPost<T>(endpoint: string, payload: any, fallback?: T): Promise<T> {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || json.error || `HTTP ${res.status}`);
      }
      return json;
    } catch (err: any) {
      console.warn(`[Backend API] POST ${endpoint} failed:`, err.message);
      if (fallback !== undefined) return fallback;
      throw err;
    }
  }

  /**
   * Performs real multipart file upload to Express backend
   */
  static async uploadFile<T>(endpoint: string, file: File, fieldName: string = 'resumeFile', extraData?: Record<string, string>): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);
    if (extraData) {
      Object.entries(extraData).forEach(([k, v]) => formData.append(k, v));
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      body: formData
    });

    const json = await res.json();
    if (!res.ok) {
      const error: any = new Error(json.error || json.message || 'File upload failed');
      error.status = res.status;
      error.data = json;
      throw error;
    }
    return json;
  }
}
