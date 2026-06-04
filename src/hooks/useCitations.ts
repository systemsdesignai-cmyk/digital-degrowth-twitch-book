import { useState, useEffect } from 'react';
import { cachedFetch } from '@/sanity/lib/cached-fetch';
import { Citation } from '@/types/blog';
import groq from 'groq';

export function useCitations() {
  const [citations, setCitations] = useState<Citation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCitations = async () => {
      try {
        const query = groq`*[_type == "citation"] | order(order asc) {
          _id,
          image,
          order
        }`;
        const data = await cachedFetch<Citation[]>(query);
        setCitations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch citations'));
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCitations();
  }, []);

  return { citations, loading, error };
}
