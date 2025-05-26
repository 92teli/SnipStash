import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnippet, useCreateSnippet, useUpdateSnippet, generateSmartTags } from '@/hooks/useSnippets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Sparkles, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const LANGUAGE_OPTIONS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'HTML', 'CSS', 'SQL', 'Bash', 'PowerShell', 'JSON', 'YAML', 'XML', 'Markdown', 'Other'
];

export const SnippetEditor = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: existingSnippet } = useSnippet(id as string || '');
  const createSnippet = useCreateSnippet();
  const updateSnippet = useUpdateSnippet();

  useEffect(() => {
    if (existingSnippet) {
      setTitle(existingSnippet.title);
      setContent(existingSnippet.content);
      setDescription(existingSnippet.description || '');
      setLanguage(existingSnippet.language || '');
      setTags(existingSnippet.tags || []);
      setIsFavorite(!!existingSnippet.is_favorite);
    }
  }, [existingSnippet]);

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSmartTags = () => {
    const smartTags = generateSmartTags(content, language);
    setTags(Array.from(new Set([...tags, ...smartTags])));
    toast.success('Smart tags added!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const snippetData = {
      title,
      content,
      description,
      language,
      tags,
      is_favorite: isFavorite,
    };
    try {
      if (isEditing) {
        await updateSnippet.mutateAsync({ id, ...snippetData });
        toast.success('Snippet updated successfully');
      } else {
        await createSnippet.mutateAsync(snippetData);
        toast.success('Snippet created successfully');
      }
      router.push('/dashboard/snippets');
    } catch (error) {
      toast.error(isEditing ? 'Failed to update snippet' : 'Failed to create snippet');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/snippets')}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white">
          {isEditing ? 'Edit Snippet' : 'Create New Snippet'}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Snippet Content */}
          <Card className="flex-1 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Snippet Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter snippet title..."
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Code</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your code here..."
                  className="font-mono bg-slate-700 border-slate-600 text-white min-h-[200px]"
                  required
                />
              </div>
            </CardContent>
          </Card>
          {/* Right: Details */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description..."
                    className="bg-slate-700 border-slate-600 text-white min-h-[60px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-slate-700 border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select language</option>
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-400 text-sm">Mark as favorite</span>
                  <Switch checked={isFavorite} onCheckedChange={setIsFavorite} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="bg-slate-700 text-slate-200 flex items-center pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-slate-400 hover:text-red-400"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} className="bg-emerald-600 hover:bg-emerald-700 px-3">
                    <Plus size={16} />
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSmartTags}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-1 px-3"
                  >
                    <Sparkles size={16} /> Smart Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25 px-6 py-2 text-lg"
                disabled={createSnippet.isPending || updateSnippet.isPending}
              >
                <Save className="w-5 h-5 mr-2" />
                {isEditing ? 'Update Snippet' : 'Save Snippet'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
