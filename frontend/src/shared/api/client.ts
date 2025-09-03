export const API_BASE = "http://localhost:3001/api/v1";

export const client = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${API_BASE}${url}`, options);
  if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);
  return res.json();
};
