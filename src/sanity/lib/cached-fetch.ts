import { client } from './client';

const CACHE_PREFIX = 'sanity_cache_';
const DEFAULT_TTL = 1000 * 60 * 60; // 1 hour default

// Read TTL from env (expected in seconds) or use default
const envTtl = import.meta.env.VITE_SANITY_CACHE_TTL;
const CACHE_TTL = envTtl ? parseInt(envTtl, 10) * 1000 : DEFAULT_TTL;

/**
 * A wrapper around client.fetch that caches results in localStorage.
 * This helps stay within Sanity's API usage limits.
 */
export async function cachedFetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  // Use a simple hash-like key for localStorage
  const keyInput = query + JSON.stringify(params);
  const cacheKey = `${CACHE_PREFIX}${hashString(keyInput)}`;
  
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_TTL;
      
      if (!isExpired) {
        console.log(`[Sanity Cache] Hit: ${cacheKey.substring(0, 20)}...`);
        return data;
      }
    }
  } catch (e) {
    console.warn('[Sanity Cache] Read error:', e);
  }

  console.log(`[Sanity Cache] Miss: ${query.substring(0, 50)}...`);
  const data = await client.fetch(query, params);

  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('[Sanity Cache] Write error:', e);
    // If quota exceeded, clear Sanity cache entries
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
    }
  }

  return data;
}

/**
 * Simple hash function to create a manageable key from the query string
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}
