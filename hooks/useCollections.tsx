
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Collection = Tables<'collections'>;
type CollectionInsert = TablesInsert<'collections'>;
type CollectionUpdate = TablesUpdate<'collections'>;
type SnippetCollection = Tables<'snippet_collections'>;

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Collection[];
    },
  });
};

export const useCollection = (id: string) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Collection;
    },
    enabled: !!id,
  });
};

export const useCollectionSnippets = (collectionId: string) => {
  return useQuery({
    queryKey: ['collection-snippets', collectionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippet_collections')
        .select(`
          snippet_id,
          snippets (*)
        `)
        .eq('collection_id', collectionId);
      
      if (error) throw error;
      return data.map(item => item.snippets).filter(Boolean);
    },
    enabled: !!collectionId,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (collection: Omit<CollectionInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('collections')
        .insert([{ ...collection, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: CollectionUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('collections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

export const useAddSnippetToCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ snippetId, collectionId }: { snippetId: string; collectionId: string }) => {
      const { data, error } = await supabase
        .from('snippet_collections')
        .insert([{ snippet_id: snippetId, collection_id: collectionId }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection-snippets'] });
    },
  });
};

export const useRemoveSnippetFromCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ snippetId, collectionId }: { snippetId: string; collectionId: string }) => {
      const { error } = await supabase
        .from('snippet_collections')
        .delete()
        .eq('snippet_id', snippetId)
        .eq('collection_id', collectionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection-snippets'] });
    },
  });
};
