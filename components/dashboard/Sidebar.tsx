import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Code, FolderOpen, Settings, Plus, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/useCollections';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home', exact: true },
  { to: '/dashboard/snippets', icon: Code, label: 'All Snippets' },
  { to: '/dashboard/collections', icon: FolderOpen, label: 'Collections' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  const { data: collections } = useCollections();
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <Code2 className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold">SnipStash</span>
        </div>
        <p className="text-slate-400 text-sm mt-1">Your code library</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? currentPath === item.to
            : currentPath.startsWith(item.to);
          return (
            <Link href={item.to} key={item.to} legacyBehavior>
              <a
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}

        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-blue-400 tracking-wide uppercase">Collections</h3>
            <Link href="/dashboard/collections" legacyBehavior>
              <a>
                <Button
                  size="icon"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow"
                >
                  <Plus size={16} />
                </Button>
              </a>
            </Link>
          </div>
          <div className="border-b border-slate-700 mb-2" />
          {collections && collections.length > 0 ? (
            <div className="space-y-2">
              {collections.slice(0, 5).map((collection) => {
                const isActive = currentPath === `/dashboard/collections/${collection.id}`;
                return (
                  <Link href={`/dashboard/collections/${collection.id}`} key={collection.id} legacyBehavior>
                    <a
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-all group',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      )}
                      style={{ fontWeight: isActive ? 600 : 500 }}
                    >
                      <FolderOpen
                        size={18}
                        style={{ color: collection.color || '#3B82F6' }}
                        className="flex-shrink-0"
                      />
                      <span className="truncate">{collection.name}</span>
                    </a>
                  </Link>
                );
              })}
              {collections.length > 5 && (
                <Link href="/dashboard/collections" legacyBehavior>
                  <a className="block px-3 py-1.5 text-xs text-slate-500 hover:text-slate-400">
                    View all collections...
                  </a>
                </Link>
              )}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No collections yet</p>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Link href="/dashboard/snippets/new" legacyBehavior>
          <a>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25">
              <Plus size={16} className="mr-2" />
              New Snippet
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};
