import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../types';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('articles')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'articles' 
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setArticles(prev => [payload.new as Article, ...prev]);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { articles, loading, error };
}