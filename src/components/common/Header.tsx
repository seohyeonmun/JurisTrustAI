import React from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/AuthContext';
import { LogOut, User as UserIcon, Loader2 } from 'lucide-react';

export const Header: React.FC<{ onNavigate: (view: string) => void, currentView: string }> = ({ onNavigate, currentView }) => {
  const { user, dbUser, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate('landing');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const displayName = dbUser?.displayName || user?.displayName;
  const photoURL = dbUser?.photoURL || user?.photoURL;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-20 px-6 md:px-12 bg-canvas/80 backdrop-blur-md border-b border-border-hairline">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
        <span className="text-2xl font-serif text-ink tracking-tighter">JurisTrust</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-10">
        <button 
          onClick={() => onNavigate('landing')}
          className={`text-sm font-medium transition-colors ${currentView === 'landing' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Service Intro
        </button>
        <button 
          onClick={() => onNavigate(user ? 'chat' : 'login')}
          className={`text-sm font-medium transition-colors ${currentView === 'chat' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Consultation
        </button>
        {user && !loading && (
          <button 
            onClick={() => onNavigate('profile')}
            className={`text-sm font-medium transition-colors ${currentView === 'profile' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Profile
          </button>
        )}
      </nav>

      <div className="flex items-center gap-6">
        {loading ? (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="animate-spin text-primary" size={20} />
          </div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full border border-border-hairline">
              {photoURL ? (
                <img src={photoURL} alt={displayName || 'User'} className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <UserIcon size={14} />
                </div>
              )}
              <span className="text-sm font-bold text-ink pl-1">{displayName ? `${displayName}님` : user.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
              title="Logout"
            >
              <LogOut size={16} />
              <span>로그아웃</span>
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={() => onNavigate('login')}
              className="hidden md:block text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            >
              Login
            </button>
            <Button onClick={() => onNavigate('signup')} size="md" variant="vibrant">
              Get Started
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
