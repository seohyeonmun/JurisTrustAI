import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Gavel, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const SignUpView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      onNavigate('chat');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('이메일/비밀번호 로그인이 설정되지 않았습니다. Firebase 콘솔에서 해당 기능을 활성화해 주세요.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일 주소입니다.');
      } else if (err.code === 'auth/weak-password') {
        setError('비밀번호가 너무 취약합니다. 6자 이상의 보안성이 더 높은 비밀번호를 사용해 주세요.');
      } else {
        setError(err.message || '회원가입에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView="signup" onNavigate={onNavigate} />
      
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl border border-border-hairline overflow-hidden"
        >
          {/* Branding/Visual Side */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-surface-container-low relative">
            <div className="z-10">
              <h1 className="text-5xl text-ink mb-6">당신의 손끝에서 시작되는 전문적인 법률 가이드.</h1>
              <p className="text-lg text-on-surface-variant max-w-md">JurisTrust와 함께 현대적인 법률 상담을 경험해 보세요. 당신의 필요에 맞춘 전문적이고 안전한 맞춤형 서비스를 제공합니다.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-12 z-10">
              <div className="bg-white p-6 rounded-xl border border-border-hairline shadow-sm">
                <Gavel className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-bold text-ink">신뢰할 수 있는 조언</h3>
              </div>
              <div className="bg-white p-6 rounded-xl border border-border-hairline shadow-sm mt-8">
                <ShieldCheck className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-bold text-ink">철저한 보안 관리</h3>
              </div>
            </div>

            {/* Abstract Background Element */}
            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-10">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA8q7IGfaj49FcG4CUj5SdZBIQ6y8Ye2qUd6Kfa0ntdCE8d4tYjX2SMoc1SLzVYg4TCXD6gGEppeACDsNSXVHObdSU83fcxbUXen3U5R3mGXHNv66acq56tJAQft1m7uVmLV0jM6lxmlZDl7vuTuFwvUR4GanCPJUDNvGouW3vuFZZM1XdLEqT3u1kQv2zXptZfMEZm8wJIR86_Xn3SCdLPqHPLeMBBCI2KZZIyRG-XXWhphL1-U1k8_7Hg0mHQ6NOaoaVgUqtm3s" 
                alt="Pattern" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className="mb-10">
              <h2 className="text-3xl text-ink mb-2">계정 생성</h2>
              <p className="text-sm text-on-surface-variant font-medium">전문적인 법률 상담 서비스를 시작하기 위해 정보를 입력해 주세요.</p>
            </div>
            
            <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
              <Input 
                label="성명" 
                placeholder="홍길동" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input 
                label="이메일 주소" 
                placeholder="example@legal.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="비밀번호" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input 
                  label="비밀번호 확인" 
                  placeholder="••••••••" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" id="terms" className="mt-1 rounded border-border-hairline text-primary focus:ring-primary h-4 w-4" required />
                <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                  이용약관 및 개인정보 처리방침에 동의합니다.
                </label>
              </div>

              <Button type="submit" fullWidth size="lg" className="mt-4" disabled={loading} variant="vibrant">
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : '회원가입 완료'}
              </Button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-on-surface-variant font-medium">
                이미 계정이 있으신가요? 
                <button onClick={() => onNavigate('login')} className="text-primary font-bold hover:underline ml-2">로그인</button>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};
