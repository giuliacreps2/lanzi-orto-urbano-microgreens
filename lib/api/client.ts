const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiRequestOptions = RequestInit & {
  accessToken?: string | null;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not define in .env.local file");
  }

  const { accessToken, headers, ...rest } = options;

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  console.log("API REQUEST:", `${API_BASE_URL}${endpoint}`);
  console.log("ACCESS TOKEN PRESENTE:", Boolean(accessToken));
  console.log("REQUEST HEADERS:", requestHeaders);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: requestHeaders,
  });

  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = "Errore ${response.status}: durante la richiesta";

    try {
      //const errorBody = await response.json();
      const errorBody = JSON.parse(responseText);
      errorMessage =
        errorBody.message || errorBody.error || JSON.stringify(errorBody);
    } catch {
      //errorMessage = await response.text();
      if (responseText) errorMessage = responseText;
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  //return response.json() as Promise<T>;
  return JSON.parse(responseText) as T;
}
