import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Mail, Lock, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView="login" onNavigate={onNavigate} />
      
      <main className="flex-grow flex items-center justify-center pt-20 pb-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[440px] flex flex-col gap-6"
        >
          <Card className="shadow-lg">
            <div className="flex flex-col gap-2 mb-10 text-center">
              <h1 className="text-3xl text-ink">로그인</h1>
              <p className="text-sm text-on-surface-variant font-medium">법률 전문가와의 상담을 위해 계정에 접속하세요.</p>
            </div>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onNavigate('chat'); }}>
              <Input 
                label="이메일 주소" 
                placeholder="example@juristrust.com" 
                type="email" 
                icon={Mail} 
              />
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-on-surface-variant">비밀번호</label>
                  <button type="button" className="text-xs text-primary hover:underline">비밀번호를 잊으셨나요?</button>
                </div>
                <Input 
                  placeholder="비밀번호 입력" 
                  type="password" 
                  icon={Lock} 
                />
              </div>

              <Button type="submit" fullWidth size="lg" className="mt-4">
                로그인
              </Button>
            </form>

            <div className="flex items-center gap-4 my-10">
              <div className="flex-grow h-px bg-border-hairline"></div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-50">또는</span>
              <div className="flex-grow h-px bg-border-hairline"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-border-hairline rounded-lg hover:bg-surface-container-low transition-colors text-xs font-bold text-on-surface-variant">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFO6mQ_CLgOrknRH2sfZu8C-lkwkmhfIoxxq2BljpznIXSkD98vtLgEhTBcfbi4g503Pf4BCwwq4BtPehK8lDpr1c8KI_EvUqs21FQeKPLDnQSj474OWaiNOU2nqmZyj7qpgWTGgDBrUwuSWOwrWjAq8VL5eY-9cUakD3ztpQimrg_VeXepFDM0vLR93kVgmBLQ6hv0CrH1QN_XEIkJFJPzw-GBmuXQtXDk-T8X5fngVl0MzNfL2h0hQIqxEnFz2a8J2_tAO9x_fo" 
                  className="w-4 h-4" 
                  alt="Google" 
                  referrerPolicy="no-referrer"
                /> 
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-border-hairline rounded-lg hover:bg-surface-container-low transition-colors text-xs font-bold text-on-surface-variant">
                <UserCircle size={18} className="text-outline" /> 
                SSO 로그인
              </button>
            </div>
          </Card>

          <div className="text-center p-4">
            <p className="text-sm text-on-surface-variant">
              아직 계정이 없으신가요? 
              <button onClick={() => onNavigate('signup')} className="text-primary font-bold hover:underline ml-2">회원가입 하기</button>
            </p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};
