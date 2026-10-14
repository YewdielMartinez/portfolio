import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/*.{png,jpg,jpeg,webp}');

/** Resolve a data path like "/projects/TRON.png" to its optimisable asset, or null when missing. */
export async function loadProjectImage(path?: string): Promise<ImageMetadata | null> {
  if (!path) return null;
  const name = path.split('/').pop();
  const load = files[`/src/assets/projects/${name}`];
  return load ? (await load()).default : null;
}
