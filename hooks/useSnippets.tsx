import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Snippet = Tables<'snippets'>;
type SnippetInsert = TablesInsert<'snippets'>;
type SnippetUpdate = TablesUpdate<'snippets'>;

export const useSnippets = () => {
  return useQuery({
    queryKey: ['snippets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Snippet[];
    },
  });
};

export const useSnippet = (id: string) => {
  return useQuery({
    queryKey: ['snippet', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Snippet;
    },
    enabled: !!id,
  });
};

export const useCreateSnippet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (snippet: Omit<SnippetInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('snippets')
        .insert([{ ...snippet, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
    },
  });
};

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: SnippetUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('snippets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
    },
  });
};

export const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
    },
  });
};

export const useIncrementCopyCount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('snippets')
        .select('copy_count')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      const newCount = (data.copy_count || 0) + 1;
      
      const { error: updateError } = await supabase
        .from('snippets')
        .update({ copy_count: newCount })
        .eq('id', id);
      
      if (updateError) throw updateError;
      return newCount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
    },
  });
};

// Auto-tagging logic
export const generateSmartTags = (content: string, language?: string): string[] => {
  const tags: string[] = [];
  const lowerContent = content.toLowerCase();

  // Language-specific tags
  if (language) {
    tags.push(language.toLowerCase());
  }

  // General patterns
  if (lowerContent.includes('for') || lowerContent.includes('while') || lowerContent.includes('foreach')) {
    tags.push('loop');
  }
  if (lowerContent.includes('fetch') || lowerContent.includes('axios') || lowerContent.includes('xmlhttprequest') || lowerContent.includes('api')) {
    tags.push('api');
  }
  if (lowerContent.includes('try') && lowerContent.includes('catch')) {
    tags.push('error-handling');
  }
  if (lowerContent.includes('.map(') || lowerContent.includes('.filter(') || lowerContent.includes('.reduce(')) {
    tags.push('array-ops');
  }
  if (lowerContent.includes('console.log') || lowerContent.includes('print') || lowerContent.includes('debug')) {
    tags.push('debugging');
  }

  // React
  if (/(import\s+react|usestate|useeffect|reactdom|jsx)/.test(lowerContent)) {
    tags.push('react');
  }
  // Flutter
  if (/(widget|materialapp|scaffold|setstate|import \'package:flutter)/.test(lowerContent)) {
    tags.push('flutter');
  }
  // Dart
  if (/(void main\(\)|future|async|await|import \'dart:)/.test(lowerContent)) {
    tags.push('dart');
  }
  // Rust
  if (/(fn main\(\)|let mut|println!|use std::|cargo.toml)/.test(lowerContent)) {
    tags.push('rust');
  }
  // Python
  if (/(def |import |print\(|self|async def )/.test(lowerContent)) {
    tags.push('python');
  }
  // Node.js
  if (/(require\(|module\.exports|process\.env)/.test(lowerContent)) {
    tags.push('nodejs');
  }
  // Vue
  if (/(export default|template|props|computed)/.test(lowerContent)) {
    tags.push('vue');
  }
  // Angular
  if (/@component|ngmodule|import { .* } from '@angular\//.test(lowerContent)) {
    tags.push('angular');
  }
  // Svelte
  if (/<script>|export let|\$:/i.test(content)) {
    tags.push('svelte');
  }
  // SQL
  if (/(select |insert |update |delete |create table )/.test(lowerContent)) {
    tags.push('sql');
  }
  // Bash/Shell
  if (/(#!\/bin\/bash|echo | fi | done )/.test(lowerContent)) {
    tags.push('bash');
  }
  // PowerShell
  if (/(write-host|get-|set-)/.test(lowerContent)) {
    tags.push('powershell');
  }
  // Markdown
  if (/^#|\* |\- |\[.*\]\(.*\)/m.test(content)) {
    tags.push('markdown');
  }

  // Database
  if (lowerContent.includes('select') || lowerContent.includes('insert') || lowerContent.includes('update') || lowerContent.includes('delete')) {
    tags.push('database');
  }
  // Async patterns
  if (lowerContent.includes('async') || lowerContent.includes('await') || lowerContent.includes('promise')) {
    tags.push('async');
  }

  return [...new Set(tags)]; // Remove duplicates
};
