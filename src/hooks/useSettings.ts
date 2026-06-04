import { useState, useEffect } from 'react';
import { cachedFetch } from '@/sanity/lib/cached-fetch';
import { HomeSettings, Author, SiteSettings, Retailer } from '@/types/blog';
import groq from 'groq';

export function useHomeSettings() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await cachedFetch<HomeSettings>(groq`*[_type == "homeSettings"][0]`);
        setSettings(data);
      } catch (err) {
        console.error('Error fetching home settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return { settings, loading };
}

export function useAuthor() {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await cachedFetch<Author>(groq`*[_type == "author"][0]`);
        setAuthor(data);
      } catch (err) {
        console.error('Error fetching author:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, []);

  return { author, loading };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await cachedFetch<SiteSettings>(groq`*[_type == "siteSettings"][0]`);
        setSettings(data);
      } catch (err) {
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return { settings, loading };
}

export function useRetailers() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const data = await cachedFetch<Retailer[]>(groq`*[_type == "retailer"]`);
        setRetailers(data);
      } catch (err) {
        console.error('Error fetching retailers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRetailers();
  }, []);

  return { retailers, loading };
}
