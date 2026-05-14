import React from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/ui/Button';
import { Send, Paperclip, Share2, Printer, Bot, User, Gavel, FileText, Scale, Lock, Home, History } from 'lucide-react';
import { motion } from 'motion/react';

export const ChatView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden">
      <Header currentView="chat" onNavigate={onNavigate} />
      
      <div className="flex flex-1 pt-20 overflow-hidden">
        <Sidebar currentView="chat" onNavigate={onNavigate} />
        
        <main className="flex-grow lg:ml-[280px] flex flex-col relative h-full">
          {/* Chat Header */}
          <div className="px-6 md:px-10 h-16 flex items-center justify-between border-b border-border-hairline bg-white shadow-sm z-10">
            <div className="flex items-center gap-3">
              <Gavel className="text-primary" size={24} />
              <h1 className="text-xl font-bold text-ink">법률 상담 챗봇</h1>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <Printer size={20} />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-10 custom-scrollbar bg-canvas/30">
            <div className="max-w-[720px] mx-auto space-y-10">
              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="px-4 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold tracking-widest uppercase opacity-80">2024년 5월 24일</span>
              </div>

              {/* Bot Message */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white border border-border-hairline flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="text-primary" size={20} />
                </div>
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className="bg-white border border-border-hairline text-ink p-5 rounded-r-2xl rounded-bl-2xl shadow-sm text-sm leading-relaxed">
                    안녕하세요. LegalConsult 법률 챗봇입니다. 어떤 법률적 도움이 필요하신가요? 임대차, 근로계약, 가사 등 전문 분야에 대해 답변해 드릴 수 있습니다.
                  </div>
                  <span className="text-[9px] font-bold text-on-surface-variant/40 tracking-widest uppercase ml-1">오전 10:00</span>
                </div>
              </motion.div>

              {/* User Message */}
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-4 flex-row-reverse">
                <div className="w-9 h-9 rounded-lg bg-surface-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="text-white" size={20} />
                </div>
                <div className="flex flex-col gap-2 max-w-[85%] items-end">
                  <div className="bg-surface-dark text-white p-5 rounded-l-2xl rounded-br-2xl shadow-xl text-sm leading-relaxed">
                    안녕하세요. 월세 계약 만료를 앞두고 있는데, 집주인이 보증금을 돌려주기 어렵다고 합니다. 어떻게 대응해야 하나요?
                  </div>
                  <span className="text-[9px] font-bold text-on-surface-variant/40 tracking-widest uppercase mr-1">오전 10:02</span>
                </div>
              </motion.div>

              {/* Bot Detailed Message */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white border border-border-hairline flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="text-primary" size={20} />
                </div>
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className="bg-white border border-border-hairline text-ink p-6 rounded-r-2xl rounded-bl-2xl shadow-sm space-y-6">
                    <p className="text-sm leading-relaxed">보증금 미반환 문제는 매우 당황스러운 상황이시겠군요. 이런 경우 다음과 같은 절차를 고려하실 수 있습니다:</p>
                    
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-ink">내용증명 발송</span>
                          <span className="text-xs text-on-surface-variant leading-relaxed opacity-80">임대차 계약 종료 사실과 보증금 반환을 촉구하는 의사를 서면으로 남깁니다.</span>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-ink">임차권등기명령 신청</span>
                          <span className="text-xs text-on-surface-variant leading-relaxed opacity-80">이사를 가야 하는 상황이라면 반드시 임차권등기를 마쳐야 대항력과 우선변제권을 유지할 수 있습니다.</span>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-ink">지급명령 신청 또는 소송</span>
                          <span className="text-xs text-on-surface-variant leading-relaxed opacity-80">보증금 반환을 법적으로 강제하기 위한 절차입니다.</span>
                        </div>
                      </li>
                    </ul>

                    <div className="pt-6 border-t border-border-hairline flex items-center justify-between">
                      <p className="text-[11px] italic text-on-surface-variant opacity-60 leading-relaxed max-w-[80%]">
                        ※ 본 답변은 정보 제공 목적으로만 제공되며, 법적 구속력이 없습니다. 정확한 판단을 위해서는 전문 변호사 상담을 권장합니다.
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-on-surface-variant/40 tracking-widest uppercase ml-1">오전 10:03</span>
                </div>
              </motion.div>

              {/* Recommended Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
                <motion.div whileHover={{ y: -4 }} className="bg-white border border-border-hairline p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-base font-bold text-ink mb-2">내용증명 양식 받기</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">전문가가 검수한 보증금 반환 촉구 내용증명 템플릿을 바로 다운로드하세요.</p>
                </motion.div>

                <motion.div whileHover={{ y: -4 }} className="bg-white border border-border-hairline p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-base font-bold text-ink mb-2">변호사 직접 연결</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">이 사건과 유사한 경험이 있는 임대차 전문 변호사와 즉시 상담을 시작하세요.</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="w-full bg-white border-t border-border-hairline p-6 md:p-10 shadow-[0_-4px_24px_rgba(20,20,19,0.02)]">
            <div className="max-w-[720px] mx-auto">
              <div className="flex items-end gap-3 bg-canvas p-2.5 rounded-2xl border border-border-hairline focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/30 transition-all">
                <button className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-xl">
                  <Paperclip size={20} />
                </button>
                <textarea 
                  rows={1}
                  placeholder="질문을 입력하세요... (예: 임대차 계약 해지 통보 방법)"
                  className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-3 px-1 custom-scrollbar resize-none max-h-32 placeholder:text-on-surface-variant/40"
                />
                <Button size="sm" className="w-11 h-11 p-0 rounded-xl">
                  <Send size={18} />
                </Button>
              </div>
              <div className="mt-4 flex justify-center items-center gap-2 text-[10px] font-bold text-on-surface-variant/40 tracking-widest uppercase">
                <Lock size={12} />
                Secure & Encrypted Conversation
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-white border-t border-border-hairline shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate('landing')} className="flex flex-col items-center justify-center text-on-surface-variant">
          <Home size={20} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button onClick={() => onNavigate('chat')} className="flex flex-col items-center justify-center text-primary">
          <History size={20} className="fill-current" />
          <span className="text-[10px] font-bold mt-1">Chat</span>
        </button>
        <button onClick={() => onNavigate('profile')} className="flex flex-col items-center justify-center text-on-surface-variant">
          <User size={20} />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};
