import React from 'react';
import { Home, History, Settings, HelpCircle, Plus, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Home', view: 'landing' },
    { icon: History, label: 'Chat History', view: 'chat' },
    { icon: Settings, label: 'Settings', view: 'profile' },
    { icon: HelpCircle, label: 'Help', view: 'help' },
  ];

  return (
    <aside className="hidden lg:flex flex-col h-full border-r border-border-hairline py-4 fixed left-0 w-[280px] bg-canvas shadow-sm">
      <div className="px-6 py-4 border-b border-border-hairline mb-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiSkaBpHqlyaaPEqEssCUtsmtXz5GosV2FdjMoQlefPxMdoaXq3gOgpLwBOBBl1W5NlCQSArkLuA7jvTfWnTSwSEsR2uvmo3beQq3E7HhhwklEFbDfxVZs45Jo3fUq2SaY1hY-xLZ7SvIUFMN716BOlUCOzN5N6TrTqVTbVSkZL0TMpWLQx_UAuZ4feQeIwUqWKRzxW9QiwDPh7Wu0lO4TmV_abz8QDNrxfCu53JJRabaS45-RUlneONPRl94GErnMKK79RMkaypE" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border border-border-hairline"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-sm text-ink">김민수 님</p>
            <p className="text-on-surface-variant text-[11px] font-semibold uppercase tracking-wider opacity-60">Verified Account</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.view)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium
              ${currentView === item.view 
                ? 'bg-surface-container text-primary border border-border-hairline' 
                : 'text-on-surface-variant hover:bg-surface-container-low'}
            `}
          >
            <item.icon size={18} className={currentView === item.view ? 'text-primary' : 'text-outline'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-8 mt-auto space-y-4">
        <Button 
          variant="primary" 
          fullWidth 
          className="gap-2"
          onClick={() => onNavigate('chat')}
        >
          <Plus size={18} />
          New Consultation
        </Button>
        <button className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-red-500 transition-colors text-sm font-medium w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
