import React from 'react';
import { Button } from '../ui/Button';

export const Header: React.FC<{ onNavigate: (view: string) => void, currentView: string }> = ({ onNavigate, currentView }) => {
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
          onClick={() => onNavigate('chat')}
          className={`text-sm font-medium transition-colors ${currentView === 'chat' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
        >
          History
        </button>
        <button 
          onClick={() => onNavigate('profile')}
          className={`text-sm font-medium transition-colors ${currentView === 'profile' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
        >
          Profile
        </button>
      </nav>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => onNavigate('login')}
          className="hidden md:block text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
        >
          Login
        </button>
        <Button onClick={() => onNavigate('chat')} size="md">
          Start Consultation
        </Button>
      </div>
    </header>
  );
};
