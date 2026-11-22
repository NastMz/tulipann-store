/**
 * Thin fetch wrapper. Authentication is a same-origin session cookie
 * (HttpOnly, set by the API); the SPA never stores a token. Unsafe requests
 * echo the CSRF token from the `csrftoken` cookie.
 */

export class ApiError extends Error {
  status: number;
  fields: Record<string, string[]>;

  constructor(status: number, message: string, fields: Record<string, string[]> = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

function readCookie(name: string): string | null {
  const match = document.cookie.split("; ").find((part) => part.startsWith(name + "="));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

let csrfReady: Promise<void> | null = null;

/** Makes sure the CSRF cookie exists before the first unsafe request. */
export function ensureCsrf(): Promise<void> {
  if (readCookie("csrftoken")) return Promise.resolve();
  // Share one in-flight request, but fetch again if the cookie later disappears.
  csrfReady ??= fetch("/api/auth/csrf", { credentials: "same-origin" })
    .then(() => undefined)
    .finally(() => {
      csrfReady = null;
    });
  return csrfReady;
}

function flatten(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (value && typeof value === "object") return Object.values(value).flatMap(flatten);
  return value == null ? [] : [String(value)];
}

function toError(status: number, body: unknown): ApiError {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const fields: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(record)) if (key !== "detail") fields[key] = flatten(value);
    const message =
      typeof record.detail === "string"
        ? record.detail
        : Object.values(fields)[0]?.[0] ?? "No se pudo completar la operación.";
    return new ApiError(status, message, fields);
  }
  if (status === 403) return new ApiError(status, "No tienes permiso para hacer esto.");
  return new ApiError(status, "El gabinete no responde. Inténtalo de nuevo en un momento.");
}

export async function api<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const method = options.method ?? "GET";
  const headers: Record<string, string> = { Accept: "application/json" };
  if (method !== "GET") {
    await ensureCsrf();
    headers["X-CSRFToken"] = readCookie("csrftoken") ?? "";
  }
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers,
      credentials: "same-origin",
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(0, "Sin conexión con el gabinete.");
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!response.ok) throw toError(response.status, data);
  return data as T;
}
