import { useState, useMemo } from 'react';
import { useSnippets, useDeleteSnippet, useIncrementCopyCount, useUpdateSnippet } from '@/hooks/useSnippets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Copy, Edit, Trash2, Heart, HeartOff, Code, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';

type Snippet = Tables<'snippets'>;

export const SnippetsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: snippets, isLoading } = useSnippets();
  const deleteSnippet = useDeleteSnippet();
  const incrementCopyCount = useIncrementCopyCount();
  const updateSnippet = useUpdateSnippet();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [expandRecent, setExpandRecent] = useState(true);
  const [expandFavorites, setExpandFavorites] = useState(true);
  const [expandByLang, setExpandByLang] = useState(true);
  const [previewSnippet, setPreviewSnippet] = useState<Snippet | null>(null);

  // Collect all unique languages and tags
  const languages = useMemo(() => snippets ? [...new Set(snippets.map(s => s.language).filter((l): l is string => !!l))] : [], [snippets]);
  const tags = useMemo(() => {
    const allTags = snippets?.flatMap(s => s.tags || []) || [];
    return [...new Set(allTags)];
  }, [snippets]);

  // Filtering logic
  const filteredSnippets = useMemo(() => {
    let result = snippets || [];
    if (searchQuery) {
      result = result.filter(snippet =>
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedLanguage) {
      result = result.filter(snippet => snippet.language === selectedLanguage);
    }
    if (selectedTag) {
      result = result.filter(snippet => snippet.tags?.includes(selectedTag));
    }
    if (showFavorites) {
      result = result.filter(snippet => snippet.is_favorite);
    }
    return result;
  }, [snippets, searchQuery, selectedLanguage, selectedTag, showFavorites]);

  // Smart categorization
  const recentlyAdded = useMemo(() => {
    if (!snippets) return [];
    return [...snippets].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
  }, [snippets]);

  const favorites = useMemo(() => snippets?.filter(s => s.is_favorite) || [], [snippets]);

  const snippetsByLanguage = useMemo(() => {
    if (!snippets) return {};
    const grouped: Record<string, Snippet[]> = {};
    snippets.forEach(s => {
      if (s.language) {
        if (!grouped[s.language]) grouped[s.language] = [];
        grouped[s.language].push(s);
      }
    });
    return grouped;
  }, [snippets]);

  // To avoid duplicate display, track shown snippet IDs
  const shownSnippetIds = new Set<string>();

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    await incrementCopyCount.mutateAsync(id);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
      try {
        await deleteSnippet.mutateAsync(id);
      toast.success('Snippet deleted');
      } catch (error) {
        toast.error('Failed to delete snippet');
      }
  };

  const handleToggleFavorite = async (snippet: Snippet) => {
    try {
      await updateSnippet.mutateAsync({ id: snippet.id, is_favorite: !snippet.is_favorite });
      toast.success(snippet.is_favorite ? 'Removed from favorites' : 'Marked as favorite');
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  const isFiltering = !!searchQuery || !!selectedLanguage || !!selectedTag || showFavorites;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">Loading snippets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My Snippets</h1>
        <Link href="/dashboard/snippets/new">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25">
            <Plus className="w-4 h-4 mr-2" />
            New Snippet
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <select
          value={selectedLanguage || ''}
          onChange={e => setSelectedLanguage(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white rounded-md px-3 py-2"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          value={selectedTag || ''}
          onChange={e => setSelectedTag(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white rounded-md px-3 py-2"
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <Button
          variant={showFavorites ? 'default' : 'outline'}
          className={showFavorites ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' : 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-300 hover:from-slate-500 hover:to-slate-600'}
          onClick={() => setShowFavorites(fav => !fav)}
        >
          <Heart className="w-4 h-4 mr-1" fill={showFavorites ? 'currentColor' : 'none'} />
          Favorites
        </Button>
      </div>

      {isFiltering ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map(snippet => (
            <Card key={snippet.id} className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700 rounded-2xl shadow-lg shadow-blue-900/20 relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-white">
                    {snippet.title}
                  </CardTitle>
                  <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(snippet.id, snippet.content)}
                    className="text-slate-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="ml-1 text-xs text-slate-400">{snippet.copy_count || 0}</span>
                  </Button>
                  <Link href={`/dashboard/snippets/${snippet.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-blue-500 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                    size="icon"
                      onClick={() => handleDelete(snippet.id)}
                      className="text-slate-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white"
                    >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleFavorite(snippet)}
                    className={snippet.is_favorite ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}
                    aria-label={snippet.is_favorite ? 'Unfavorite' : 'Favorite'}
                  >
                    <Heart className="w-4 h-4" fill={snippet.is_favorite ? 'currentColor' : 'none'} />
                    </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{snippet.language}</span>
                    <span>•</span>
                    <span>{new Date(snippet.created_at).toLocaleDateString()}</span>
                  </div>
                  {/* Colorful tags with icons - always above code */}
                  {snippet.tags && snippet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-1">
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
                  <pre
                    className="text-sm text-slate-400 bg-slate-900 p-3 rounded-md w-full block overflow-x-auto min-h-[100px] max-h-60 whitespace-pre font-mono"
                    style={{ boxSizing: 'border-box' }}
                  >
                    {snippet.content}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredSnippets.length === 0 && (
            <div className="text-slate-400 col-span-full">No snippets found.</div>
          )}
        </div>
      ) : (
        <>
          {/* Only keep Recently Added Section */}
          <div>
            <button className="flex items-center gap-2 text-lg font-semibold text-white mb-2" onClick={() => setExpandRecent(e => !e)}>
              {expandRecent ? <ChevronDown size={18}/> : <ChevronRight size={18}/>} Recently Added
            </button>
            {expandRecent && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                {recentlyAdded.map(snippet => {
                  shownSnippetIds.add(snippet.id);
                  return (
                    <Card key={snippet.id} className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700 rounded-2xl shadow-lg shadow-blue-900/20 relative">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-semibold text-white">
                          {snippet.title}
                        </CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(snippet.id, snippet.content)}
                            className="text-slate-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="ml-1 text-xs text-slate-400">{snippet.copy_count || 0}</span>
                          </Button>
                          <Link href={`/dashboard/snippets/${snippet.id}/edit`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-400 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-blue-500 hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
            </Button>
          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(snippet.id)}
                            className="text-slate-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleFavorite(snippet)}
                            className={snippet.is_favorite ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}
                            aria-label={snippet.is_favorite ? 'Unfavorite' : 'Favorite'}
                          >
                            <Heart className="w-4 h-4" fill={snippet.is_favorite ? 'currentColor' : 'none'} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{snippet.language}</span>
                            <span>•</span>
                            <span>{new Date(snippet.created_at).toLocaleDateString()}</span>
                          </div>
                          {/* Colorful tags with icons - always above code */}
                          {snippet.tags && snippet.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-1">
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
                          <pre
                            className="text-sm text-slate-400 bg-slate-900 p-3 rounded-md w-full block overflow-x-auto min-h-[100px] max-h-60 whitespace-pre font-mono"
                            style={{ boxSizing: 'border-box' }}
                          >
                            {snippet.content}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {recentlyAdded.length === 0 && <div className="text-slate-400">No recent snippets.</div>}
              </div>
            )}
        </div>
        </>
      )}

      <Drawer open={!!previewSnippet} onOpenChange={open => !open && setPreviewSnippet(null)}>
        <DrawerContent className="fixed right-0 top-0 h-full w-full max-w-xl bg-slate-900 border-l border-slate-700 shadow-2xl z-50 flex flex-col">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-2xl text-white">{previewSnippet?.title}</DrawerTitle>
              <DrawerClose asChild>
                <button className="text-slate-400 hover:text-white text-2xl">×</button>
              </DrawerClose>
            </div>
            <div className="flex items-center gap-4 text-slate-400 text-sm mt-2">
              <span>{previewSnippet?.language}</span>
              <span>•</span>
              <span>{previewSnippet && new Date(previewSnippet.created_at).toLocaleDateString()}</span>
            </div>
          </DrawerHeader>
          <div className="px-6 py-2 flex-1 overflow-y-auto">
            {previewSnippet?.description && (
              <div className="mb-4 text-slate-300">
                <span className="font-semibold">Description:</span> {previewSnippet.description}
              </div>
            )}
            {previewSnippet?.tags && previewSnippet.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {previewSnippet.tags.map(tag => (
                  <Badge key={tag} className="bg-slate-700 text-slate-300">{tag}</Badge>
                ))}
              </div>
            )}
            <div className="mb-4">
              <span className="font-semibold text-slate-300">Code:</span>
              <pre
                className="text-sm text-slate-400 bg-slate-900 p-3 rounded-md w-full block overflow-x-auto min-h-[100px] max-h-60 whitespace-pre font-mono"
                style={{ boxSizing: 'border-box' }}
              >
                <code>{previewSnippet?.content}</code>
              </pre>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-slate-700 flex gap-2">
            <Button onClick={() => {navigator.clipboard.writeText(previewSnippet?.content || ''); toast.success('Copied to clipboard!')}}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25">
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
            <Link href={previewSnippet ? `/dashboard/snippets/${previewSnippet.id}/edit` : '#'}>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25">
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
            </Link>
            <Button onClick={() => handleToggleFavorite(previewSnippet!)}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25 ${previewSnippet?.is_favorite ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
            >
              <Heart className="w-4 h-4 mr-2" fill={previewSnippet?.is_favorite ? 'currentColor' : 'none'} />
              {previewSnippet?.is_favorite ? 'Unfavorite' : 'Favorite'}
            </Button>
            <Button variant="destructive" onClick={() => {handleDelete(previewSnippet!.id); setPreviewSnippet(null);}}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
