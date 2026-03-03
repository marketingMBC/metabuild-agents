// Abstract API client — wraps mock data with async interface
// When backend arrives, only this layer changes

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiGet<T>(data: T, delayMs?: number): Promise<T> {
  await delay(delayMs);
  return structuredClone(data) as T;
}

export async function apiPost<T>(data: T, delayMs?: number): Promise<T> {
  await delay(delayMs);
  return structuredClone(data) as T;
}

export async function apiPut<T>(data: T, delayMs?: number): Promise<T> {
  await delay(delayMs);
  return structuredClone(data) as T;
}

export async function apiDelete(delayMs?: number): Promise<void> {
  await delay(delayMs);
}
