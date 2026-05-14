import React from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Edit2, Shield, Phone, User, Home, History } from 'lucide-react';
import { motion } from 'motion/react';

export const ProfileView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
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
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiSkaBpHqlyaaPEqEssCUtsmtXz5GosV2FdjMoQlefPxMdoaXq3gOgpLwBOBBl1W5NlCQSArkLuA7jvTfWnTSwSEsR2uvmo3beQq3E7HhhwklEFbDfxVZs45Jo3fUq2SaY1hY-xLZ7SvIUFMN716BOlUCOzN5N6TrTqVTbVSkZL0TMpWLQx_UAuZ4feQeIwUqWKRzxW9QiwDPh7Wu0lO4TmV_abz8QDNrxfCu53JJRabaS45-RUlneONPRl94GErnMKK79RMkaypE" 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:brightness-110 transition-all">
                    <Edit2 size={16} />
                  </button>
                </div>
                <div className="text-center md:text-left flex-grow">
                  <h1 className="text-3xl text-ink mb-1">김민수 님</h1>
                  <p className="text-on-surface-variant text-sm mb-4">가입일: 2024년 3월 15일</p>
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
                    <Input label="이름" defaultValue="김민수" />
                    <Input label="이메일 주소" defaultValue="minsoo.kim@legalconsult.com" />
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
                    <Input label="휴대폰 번호" defaultValue="010-1234-5678" />
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
                      <Input label="비밀번호 변경" placeholder="새 비밀번호 입력" type="password" />
                      <Input placeholder="비밀번호 재확인" type="password" />
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
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border-hairline gap-4">
              <Button size="lg" className="px-16">변경사항 저장</Button>
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
