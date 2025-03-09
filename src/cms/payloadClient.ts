// Simple fetch wrapper for Payload CMS API requests
const BASE_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://localhost:3000/api";

type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

// Generic fetch function to handle API requests
export const fetchFromPayload = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { method = "GET", body, headers = {} } = options;

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, requestOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `API error: ${response.status} - ${error.message || response.statusText}`
    );
  }

  return response.json();
};
