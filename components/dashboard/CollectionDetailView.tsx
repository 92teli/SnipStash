import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCollection, useCollectionSnippets, useRemoveSnippetFromCollection, useAddSnippetToCollection } from '@/hooks/useCollections';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useIncrementCopyCount, useSnippets } from '@/hooks/useSnippets';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

export const CollectionDetailView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSnippetIds, setSelectedSnippetIds] = useState<string[]>([]);
  const { data: allSnippets, isLoading: allSnippetsLoading } = useSnippets();
  const addSnippetToCollection = useAddSnippetToCollection();
  const [snippetSearch, setSnippetSearch] = useState('');

  const { data: collection, isLoading: collectionLoading } = useCollection(id as string || '');
  const { data: snippets, isLoading: snippetsLoading } = useCollectionSnippets(id as string || '');
  const removeSnippet = useRemoveSnippetFromCollection();
  const incrementCopyCount = useIncrementCopyCount();

  const filteredSnippets = snippets?.filter(snippet =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAllSnippets = allSnippets?.filter(snippet =>
    snippet.title.toLowerCase().includes(snippetSearch.toLowerCase()) ||
    snippet.content.toLowerCase().includes(snippetSearch.toLowerCase())
  ) || [];

  const handleCopy = async (snippetId: string, content: string) => {
    await navigator.clipboard.writeText(content);
    await incrementCopyCount.mutateAsync(snippetId);
    toast.success('Copied to clipboard!');
  };

  const handleRemoveSnippet = async (snippetId: string) => {
    if (!id) return;
    try {
      await removeSnippet.mutateAsync({ snippetId, collectionId: id as string });
      toast.success('Snippet removed from collection');
    } catch (error) {
      toast.error('Failed to remove snippet from collection');
    }
  };

  const handleAddSnippets = async () => {
    if (!id) return;
    try {
      await Promise.all(selectedSnippetIds.map(snippetId =>
        addSnippetToCollection.mutateAsync({ snippetId, collectionId: id as string })
      ));
      toast.success('Snippets added to collection!');
      setShowAddModal(false);
      setSelectedSnippetIds([]);
    } catch (error) {
      toast.error('Failed to add snippets');
    }
  };

  if (collectionLoading || snippetsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">Loading collection...</div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">Collection not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard/collections')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Button>
          <h1 className="text-2xl font-bold text-white">{collection.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
            onClick={() => setShowAddModal(true)}
          >
            + Add to Collection
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
            onClick={() => router.push(`/dashboard/snippets/new?collectionId=${collection.id}`)}
          >
            + New Snippet
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search snippets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSnippets?.map((snippet) => (
          <Card key={snippet.id} className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700 rounded-2xl shadow-lg shadow-blue-900/20 flex flex-col h-full min-h-[420px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold text-white tracking-tight">
                {snippet.title}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(snippet.id, snippet.content)}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSnippet(snippet.id)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              {/* Meta info */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span className="font-semibold text-blue-400">{snippet.language || 'Other'}</span>
                <span>•</span>
                <span>{snippet.created_at ? new Date(snippet.created_at).toLocaleDateString() : ''}</span>
              </div>
              {/* Colorful tags with icons - always above code */}
              {snippet.tags && snippet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {snippet.tags.map((tag, idx) => {
                    const tagColors = [
                      'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
                      'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white',
                      'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white',
                      'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
                      'bg-gradient-to-r from-red-500 to-pink-600 text-white',
                      'bg-gradient-to-r from-indigo-500 to-blue-700 text-white',
                      'bg-gradient-to-r from-green-500 to-lime-500 text-white',
                    ];
                    const color = tagColors[idx % tagColors.length];
                    return (
                      <span
                        key={tag}
                        className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full font-semibold shadow ${color}`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M7 2l-5 12M14 2l-5 12"/><path d="M2 6h12M2 10h12"/></svg>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}
              <pre className="text-sm text-slate-200 bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono shadow-inner flex-1 min-h-[100px] max-h-[100px] overflow-y-auto whitespace-pre-line">
                {snippet.content}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white">Add Snippets to Collection</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search snippets..."
            value={snippetSearch}
            onChange={e => setSnippetSearch(e.target.value)}
            className="mb-3 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          <div className="max-h-[420px] overflow-y-auto space-y-4">
            {allSnippetsLoading ? (
              <div className="text-slate-400">Loading snippets...</div>
            ) : filteredAllSnippets.length === 0 ? (
              <div className="text-slate-400">No snippets found.</div>
            ) : filteredAllSnippets.map(snippet => (
              <label
                key={snippet.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition cursor-pointer"
              >
                <Checkbox
                  checked={selectedSnippetIds.includes(snippet.id)}
                  onCheckedChange={checked => {
                    setSelectedSnippetIds(ids =>
                      checked ? [...ids, snippet.id] : ids.filter(id => id !== snippet.id)
                    );
                  }}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate">{snippet.title}</span>
                    <span className="text-xs text-slate-400 ml-2">{snippet.language}</span>
                  </div>
                  {snippet.tags && snippet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-1">
                      {snippet.tags.map((tag, idx) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold bg-blue-900/50 text-blue-200 border border-blue-800`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <pre className="bg-slate-950 text-slate-200 rounded p-2 text-xs font-mono max-h-20 overflow-y-auto whitespace-pre-wrap border border-slate-800">
                    {snippet.content.slice(0, 180)}{snippet.content.length > 180 ? '...' : ''}
                  </pre>
                </div>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddSnippets}
              disabled={selectedSnippetIds.length === 0 || addSnippetToCollection.isPending}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
            >
              Add Selected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
