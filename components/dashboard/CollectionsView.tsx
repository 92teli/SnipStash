import { useState } from 'react';
import { useCollections, useCreateCollection, useDeleteCollection } from '@/hooks/useCollections';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, FolderOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Create Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <Input
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
                disabled={createCollection.isPending}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Collection
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div className="space-y-2">
            {filteredCollections?.map((collection) => (
              <Card key={collection.id} className="bg-slate-800 border-slate-700">
                <CardContent className="flex items-center justify-between p-4">
                  <Link
                    href={`/dashboard/collections/${collection.id}`}
                    className="flex items-center space-x-3 flex-1"
                  >
                    <FolderOpen className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">{collection.name}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCollection(collection.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
