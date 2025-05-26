import { useState } from 'react';
import { useCollections, useCreateCollection, useDeleteCollection } from '@/hooks/useCollections';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, FolderOpen, Trash2, Folder, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const folderColors = [
  "text-blue-400",
  "text-green-400",
  "text-yellow-400",
  "text-pink-400",
  "text-purple-400",
  "text-orange-400",
  "text-cyan-400",
];

export const CollectionsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const { data: collections, isLoading } = useCollections();
  const createCollection = useCreateCollection();
  const deleteCollection = useDeleteCollection();
  
  const filteredCollections = collections?.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      await createCollection.mutateAsync({ name: newCollectionName.trim() });
      setNewCollectionName('');
      toast.success('Collection created successfully');
    } catch (error) {
      toast.error('Failed to create collection');
    }
  };

  const handleDeleteCollection = async (id: string) => {
      try {
        await deleteCollection.mutateAsync(id);
        toast.success('Collection deleted successfully');
      } catch (error) {
        toast.error('Failed to delete collection');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">Loading collections...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Collections</h1>
        </div>
        
      <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
        <Card className="bg-slate-800 border-slate-700 w-64 min-h-[35px] flex flex-col justify-start p-2">
          <CardHeader className="pb-1">
            <CardTitle className="text-white text-base">Create Collection</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleCreateCollection} className="space-y-1">
              <Input
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name"
                className="bg-slate-700 border-slate-600 text-white text-xs h-8"
              />
              <Button
                type="submit"
                className="w-full h-8 text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow"
                disabled={createCollection.isPending}
              >
                <Plus className="w-3 h-3 mr-1" />
                Create
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex-1 flex flex-col">
          <div className="mb-2 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white w-full"
            />
          </div>
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-3"
          >
            {filteredCollections?.map((collection, idx) => {
              const colorClass = folderColors[idx % folderColors.length];
              const hasSnippets = Number(collection.snippet_count) > 0;
              return (
                <div
                  key={collection.id}
                  className="relative flex flex-col items-center justify-center w-36 h-36 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-xl shadow-lg hover:shadow-2xl transition-all group border-2 border-slate-700 hover:border-blue-500 focus:outline-none overflow-hidden"
                >
                  <span
                    className={
                      "absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm " +
                      (hasSnippets
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-slate-900/80 text-blue-300")
                    }
                  >
                    {collection.snippet_count || 0}
                  </span>
                  <button
                    onClick={() => handleDeleteCollection(collection.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 hover:bg-red-600 transition-colors opacity-80 hover:opacity-100"
                    title="Delete collection"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                  <Link
                    href={`/dashboard/collections/${collection.id}`}
                    className="flex flex-col items-center w-full justify-center h-full"
                  >
                    {hasSnippets ? (
                      <FolderOpen className={`w-14 h-14 ${colorClass} group-hover:text-white transition-colors mb-2`} />
                    ) : (
                      <Folder className={`w-14 h-14 ${colorClass} group-hover:text-white transition-colors mb-2`} />
                    )}
                    <span className="text-slate-100 font-medium truncate w-full text-center">
                      {collection.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
