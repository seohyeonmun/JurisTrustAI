/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { SignUpView } from './views/SignUpView';
import { ProfileView } from './views/ProfileView';
import { ChatView } from './views/ChatView';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || 'landing';
  });

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView onNavigate={setCurrentView} />;
      case 'login':
        return <LoginView onNavigate={setCurrentView} />;
      case 'signup':
        return <SignUpView onNavigate={setCurrentView} />;
      case 'profile':
        return <ProfileView onNavigate={setCurrentView} />;
      case 'chat':
        return <ChatView onNavigate={setCurrentView} />;
      default:
        return <LandingView onNavigate={setCurrentView} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}
