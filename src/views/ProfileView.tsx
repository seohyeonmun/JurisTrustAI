import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Edit2, Shield, Phone, User, Home, History } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile, updatePassword, reauthenticateWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const ProfileView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { user, dbUser } = useAuth();
  
  const currentDisplayName = dbUser?.displayName || user?.displayName || '';
  const currentEmail = dbUser?.email || user?.email || '';
  const currentPhotoURL = dbUser?.photoURL || user?.photoURL || '';
  
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [email, setEmail] = useState(currentEmail);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [initialPhone, setInitialPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isDirty) {
      setDisplayName(currentDisplayName);
      setEmail(currentEmail);
      if (dbUser?.phoneNumber) {
        setPhoneNumber(dbUser.phoneNumber);
        setInitialPhone(dbUser.phoneNumber);
      }
    }
  }, [user, dbUser, isDirty, currentDisplayName, currentEmail]);

  useEffect(() => {
    const isNameChanged = displayName !== currentDisplayName;
    const isPhoneChanged = phoneNumber !== initialPhone;
    const isPasswordChanged = password !== '';
    const isPhotoChanged = photoDataUrl !== null;
    setIsDirty(isNameChanged || isPhoneChanged || isPasswordChanged || isPhotoChanged);
    setError(null);
    setSuccess(null);
  }, [displayName, phoneNumber, password, user, initialPhone, photoDataUrl, currentDisplayName]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('이미지 크기는 5MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 300;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPhotoDataUrl(dataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('photo-upload')?.click();
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Update Display Name if changed
      if (displayName !== currentDisplayName) {
        await updateProfile(user, { displayName });
        await updateDoc(doc(db, 'users', user.uid), { displayName });
      }

      // 2. Update Phone Number if changed
      if (phoneNumber !== initialPhone) {
        await updateDoc(doc(db, 'users', user.uid), { phoneNumber });
        setInitialPhone(phoneNumber);
      }

      // 3. Update Photo if changed
      if (photoDataUrl) {
        // We do NOT update Firebase Auth photoURL here because of Data URI length limits,
        // we only update it in our Firestore 'users' collection.
        await updateDoc(doc(db, 'users', user.uid), { photoURL: photoDataUrl });
        setPhotoDataUrl(null);
      }

      // 4. Update Password if provided
      if (password) {
        if (password !== confirmPassword) {
          throw new Error("새 비밀번호가 일치하지 않습니다.");
        }
        if (password.length < 6) {
          throw new Error("비밀번호는 최소 6자 이상이어야 합니다.");
        }
        try {
          await updatePassword(user, password);
        } catch (passErr: any) {
          if (passErr.code === 'auth/requires-recent-login' || passErr.code === 'auth/invalid-credential') {
            const provider = new GoogleAuthProvider();
            try {
              await reauthenticateWithPopup(user, provider);
              await updatePassword(user, password);
            } catch (reauthErr: any) {
              console.error("재인증 에러:", reauthErr);
              throw new Error("재인증에 실패했습니다. 올바른 계정인지 확인하거나 다시 시도해주세요.");
            }
          } else {
            throw passErr;
          }
        }
        setPassword('');
        setConfirmPassword('');
      }

      setSuccess("변경사항이 성공적으로 저장되었습니다.");
      setIsDirty(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login' || err.code === 'auth/invalid-credential') {
        setError("인증에 실패했습니다. 다시 로그인해주세요.");
      } else {
        setError(err.message || "변경사항을 저장하는 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Header currentView="profile" onNavigate={onNavigate} />
      <div className="flex pt-20">
        <Sidebar currentView="profile" onNavigate={onNavigate} />
        
        <main className="flex-grow lg:ml-[280px] p-6 md:p-12 pb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Profile Hero Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="flex flex-col md:flex-row items-center gap-8 bg-surface-card border-outline-variant">
                <div className="relative">
                  <input 
                    type="file" 
                    id="photo-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoChange} 
                  />
                  {photoDataUrl || currentPhotoURL ? (
                    <img 
                      src={photoDataUrl || currentPhotoURL || ''} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-primary/10 flex items-center justify-center shadow-sm">
                      <User size={48} className="text-primary" />
                    </div>
                  )}
                  <button 
                    onClick={handlePhotoClick}
                    className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:brightness-110 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
                <div className="text-center md:text-left flex-grow">
                  <h1 className="text-3xl text-ink mb-1">{user?.displayName ? `${user.displayName} 님` : (user?.email || '알 수 없음')}</h1>
                  {user?.metadata.creationTime && (
                    <p className="text-on-surface-variant text-sm mb-4">가입일: {new Date(user.metadata.creationTime).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
                  )}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">프리미엄 회원</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">본인인증 완료</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Form Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <User className="text-primary" size={24} />
                    <h2 className="text-xl text-ink font-bold">기본 정보</h2>
                  </div>
                  <div className="space-y-4">
                    <Input label="이름" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    <Input label="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
                  </div>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <Phone className="text-primary" size={24} />
                    <h2 className="text-xl text-ink font-bold">연락처 및 알림</h2>
                  </div>
                  <div className="space-y-4">
                    <Input 
                      label="휴대폰 번호" 
                      placeholder="010-0000-0000" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    <div className="flex items-center justify-between pt-4 border-t border-border-hairline">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-ink">SMS 알림 수신</span>
                        <span className="text-[11px] text-on-surface-variant opacity-70">중요 상담 안내 문자</span>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Security Settings (Full Width) */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-2">
                <Card>
                  <div className="flex items-center gap-3 mb-8">
                    <Shield className="text-primary" size={24} />
                    <h2 className="text-xl text-ink font-bold">보안 설정</h2>
                  </div>
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-grow space-y-4">
                      <Input 
                        label="비밀번호 변경" 
                        placeholder="새 비밀번호 입력" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input 
                        placeholder="비밀번호 재확인" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-xl border border-border-hairline md:w-1/3 flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-bold text-ink mb-2">로그인 관리</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed opacity-80 mb-6">현재 2개의 기기에서 로그인 중입니다.</p>
                      </div>
                      <button className="text-primary text-xs font-bold border-b border-primary w-fit hover:opacity-80 transition-opacity">모든 기기 로그아웃</button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Action Buttons */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm">
                {success}
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border-hairline gap-4">
              <Button size="lg" className="px-16" disabled={!isDirty || isSaving} onClick={handleSave}>
                {isSaving ? "저장 중..." : "변경사항 저장"}
              </Button>
              <button className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all">회원 탈퇴</button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      
      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-white border-t border-border-hairline shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate('landing')} className="flex flex-col items-center justify-center text-on-surface-variant">
          <Home size={20} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button onClick={() => onNavigate('chat')} className="flex flex-col items-center justify-center text-on-surface-variant">
          <History size={20} />
          <span className="text-[10px] font-bold mt-1">Chat</span>
        </button>
        <button onClick={() => onNavigate('profile')} className="flex flex-col items-center justify-center text-primary">
          <User size={20} className="fill-current" />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};
