import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-emerald-400">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
