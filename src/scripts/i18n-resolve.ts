export function resolvePath(source: unknown, path: string): string | undefined {
  let value: unknown = source;
  for (const key of path.split('.')) {
    if (value == null || typeof value !== 'object') return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
}
