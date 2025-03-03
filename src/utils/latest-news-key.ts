export function calcLatestNewsKey(keys: string[]): string {
  return keys.sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}