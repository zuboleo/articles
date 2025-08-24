export function debounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  timeInMs: number,
  thisArg: object | null = null
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(thisArg, args), timeInMs);
  };
}
