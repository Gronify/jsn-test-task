export const API_BASE = "http://localhost:3001/api/v1";

export const client = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${API_BASE}${url}`, options);

  if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return null;
  }

  return res.json();
};
