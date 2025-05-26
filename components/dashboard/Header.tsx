import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

export const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error && error.status !== 403) {
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
      }
      router.push('/signin');
    } catch (err) {
      toast.success('Signed out successfully');
      router.push('/signin');
    }
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-slate-400 text-sm">Manage your code snippets</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm">
          <User size={16} className="text-slate-400" />
          <span className="text-slate-300">{user?.email}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-slate-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white"
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
};
