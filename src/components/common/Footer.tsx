import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-surface-dark text-on-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-serif text-white tracking-tighter italic">JurisTrust</span>
          <p className="text-on-surface-variant opacity-50 text-xs">
            © 2024 JurisTrust Legal AI Service. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-10">
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs border-b border-transparent hover:border-primary pb-1">Terms of Service</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs border-b border-transparent hover:border-primary pb-1">Privacy Policy</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs border-b border-transparent hover:border-primary pb-1">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};
