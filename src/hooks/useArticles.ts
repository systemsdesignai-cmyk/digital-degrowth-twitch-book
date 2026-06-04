import { useState, useEffect } from 'react';
import { cachedFetch } from '@/sanity/lib/cached-fetch';
import { BlogArticle } from '@/types/blog';
import groq from 'groq';

export function useArticles() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const query = groq`*[_type == "article"] | order(date desc) {
          _id,
          title,
          slug,
          date,
          outlet,
          image,
          excerpt,
          content,
          tag,
          readTime
        }`;
        const data = await cachedFetch<BlogArticle[]>(query);
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch articles'));
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const query = groq`*[_type == "article" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          date,
          outlet,
          image,
          excerpt,
          content,
          tag,
          readTime
        }`;
        const data = await cachedFetch<BlogArticle>(query, { slug });
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch article'));
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}
