import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { ArrowRight, Gavel, FileText, Briefcase, Users, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';

export const LandingView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView="landing" onNavigate={onNavigate} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-canvas py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              <span className="inline-block px-3 py-1 mb-6 text-primary border border-primary/20 rounded-full text-xs bg-primary/5 uppercase tracking-widest font-bold">The New Standard</span>
              <h1 className="text-3xl md:text-5xl text-ink mb-8 max-w-2xl">
                당신의 법률 파트너,<br/><span className="text-primary uppercase">JurisTrust</span> AI
              </h1>
              <p className="text-lg text-on-surface-variant mb-12 max-w-lg leading-relaxed">
                복잡한 법률 용어와 절차, 이제 JurisTrust AI와 함께 해결하세요. 24시간 언제 어디서나 신뢰할 수 있는 법률 초안 작성과 가이드를 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => onNavigate(user ? 'chat' : 'login')} size="lg" className="gap-2" variant="vibrant">
                  상담 시작하기
                  <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" size="lg">
                  서비스 안내
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"></div>
              <div className="relative z-10 p-2 bg-white border border-border-hairline shadow-2xl rounded-2xl overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPaZiMM6hS8CAXW5BwkVfElsXkVE8dC-5cQi7mm8phP2qyABeE4ajcCmOaj4TBaZJpJC1AAqTO-DNN_ikTUo9TofTzQweGFjK_Vwlvuz0oMN_dvScfRRCInukRmZKnR7QES1IH0Ai3yDUvYYf11aTSkr1A3lCkxM7sNsEcaaUc_4UUo-09hCwdcBO9Z0-TRy-THfE4y6rAKEOrk-G3S10wZq7mAY9OQIrUKiByesnEacdQ9tZx7JtTEL3eqzNjZDEWwbAahZdgLno" 
                  alt="Legal" 
                  className="w-full h-auto object-cover aspect-[4/3] grayscale-[20%]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="bg-surface-container-low py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl text-ink mb-4">어떤 도움이 필요하신가요?</h2>
              <p className="text-on-surface-variant text-base max-w-2xl">JurisTrust는 AI의 정확성과 인간의 감성을 결합하여 다양한 법률 분야의 전문 지식을 제공합니다.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-auto md:h-[640px]">
              {/* Large Card */}
              <div className="md:col-span-2 md:row-span-2 bg-white border border-border-hairline p-10 rounded-xl flex flex-col justify-between hover:shadow-xl transition-all group border-b-4 border-b-primary/30">
                <div>
                  <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-10 border border-primary/10">
                    <Gavel size={28} />
                  </div>
                  <h3 className="text-2xl text-ink mb-6">민사/형사 분쟁 가이드</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">일상에서 발생하는 다양한 법적 갈등에 대한 체계적인 대응 시나리오와 판례 기반 가이드를 제공합니다. 법적 분쟁의 첫 걸음을 저희와 함께하세요.</p>
                </div>
                <div onClick={() => onNavigate(user ? 'chat' : 'login')} className="mt-12 flex items-center text-primary font-bold gap-2 cursor-pointer">
                  <span className="text-sm">자세히 알아보기</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Dark Feature Card */}
              <div className="md:col-span-2 bg-surface-dark p-10 rounded-xl flex items-center justify-between group cursor-pointer border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl text-white mb-3">자동 계약서 검토</h3>
                  <p className="text-on-surface-variant text-sm max-w-[280px] opacity-80">AI가 누락된 조항이나 불리한 독소 조항을 실시간으로 분석하여 권익을 보호합니다.</p>
                </div>
                <FileText size={80} className="text-white opacity-5 absolute -right-4 -bottom-4 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" />
              </div>

              {/* Small Category Cards */}
              <div className="bg-surface-card p-8 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white transition-all border border-border-hairline">
                <Briefcase size={32} className="text-primary mb-6" />
                <h4 className="text-sm font-bold text-ink mb-1">노무/기업</h4>
                <p className="text-on-surface-variant text-[11px] opacity-70">근로 계약 및 경영 자문 전문</p>
              </div>
              <div className="bg-surface-card p-8 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white transition-all border border-border-hairline">
                <Users size={32} className="text-primary mb-6" />
                <h4 className="text-sm font-bold text-ink mb-1">상속/가사</h4>
                <p className="text-on-surface-variant text-[11px] opacity-70">섬세한 가족 법률 상담 서비스</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-canvas py-24 border-y border-border-hairline">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-5xl text-primary mb-4 font-extrabold">99%</h3>
              <p className="text-xl text-ink mb-2">신속한 답변율</p>
              <p className="text-sm text-on-surface-variant opacity-70">대기 없는 즉각적인 상담 시스템</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-5xl text-primary mb-4 font-extrabold">2.4k+</h3>
              <p className="text-xl text-ink mb-2">일일 상담 건수</p>
              <p className="text-sm text-on-surface-variant opacity-70">매일 성장하는 법률 데이터베이스</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-5xl text-primary mb-4 font-extrabold">100%</h3>
              <p className="text-xl text-ink mb-2">상담 보안 유지</p>
              <p className="text-sm text-on-surface-variant opacity-70">업계 최고 수준의 데이터 암호화</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 mb-12">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="max-w-7xl mx-auto bg-primary rounded-2xl p-16 md:p-24 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]"></div>
            <h2 className="text-4xl text-white mb-8 relative z-10 max-w-2xl mx-auto leading-tight">지금 바로 전문가 수준의 법률 상담을 시작해 보세요</h2>
            <p className="text-on-primary-container opacity-90 mb-12 max-w-xl mx-auto text-base relative z-10">
              첫 상담은 무료로 제공됩니다. 고민하고 있는 법률 문제를 JurisTrust AI에게 상세히 물어보세요.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary border-none relative z-10 hover:bg-canvas"
              onClick={() => onNavigate(user ? 'chat' : 'login')}
            >
              지금 시작하기
            </Button>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
