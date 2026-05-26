const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiRequestOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not define in .env.local file");
  }

  const { token, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "Errore durante la richiesta";

    try {
      const errorBody = await response.json();
      errorMessage =
        errorBody.message || errorBody.error || JSON.stringify(errorBody);
    } catch {
      errorMessage = await response.text();
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
