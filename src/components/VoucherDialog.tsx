import React from 'react';
import { X, CheckCircle, Gift, Sparkles } from 'lucide-react';

interface VoucherDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: number;
  onAddVouchers: (amount: number) => void;
}

export const VoucherDialog: React.FC<VoucherDialogProps> = ({
  isOpen,
  onClose,
  vouchers,
  onAddVouchers,
}) => {
  if (!isOpen) return null;

  const tasks = [
    { title: '每日厨艺晨练打卡', reward: 50, icon: '🌅', done: false },
    { title: '品鉴好友招牌名菜', reward: 30, icon: '🍲', done: false },
    { title: '完成神厨日常考核', reward: 80, icon: '📜', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-sm rounded-xl pixel-wood-frame p-4 bg-[#FDF5E6] text-[#3E2412] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#5C3A21] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🎟</span>
            <h3 className="font-pixel-title text-base font-black text-[#8D2B0C]">
              料理券工坊
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#E0D0B8] hover:bg-[#D4C0A2] border border-[#5C3A21] flex items-center justify-center text-[#5C3A21] font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Balance */}
        <div className="my-3 p-3 rounded-lg bg-[#3E2412] border-2 border-[#6D4227] text-white flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#D7CCC8]">当前拥有料理券</span>
            <span className="text-xl font-black font-pixel-num text-[#FFD54F]">
              {vouchers} <span className="text-xs font-normal">券</span>
            </span>
          </div>
          <button
            onClick={() => {
              onAddVouchers(100);
            }}
            className="px-3 py-1.5 rounded-lg pixel-btn-primary text-xs font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>补充100券 (模拟)</span>
          </button>
        </div>

        {/* Obtain Tasks */}
        <div className="space-y-2 text-xs">
          <div className="text-[11px] font-bold text-[#6D4C41]">
            免费获取途径：
          </div>
          {tasks.map((t, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-[#F5EAD2] border border-[#D7C4A5] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{t.icon}</span>
                <div className="flex flex-col">
                  <span className="font-bold text-[#4E342E]">{t.title}</span>
                  <span className="text-[10px] text-[#E65100] font-pixel-num font-semibold">
                    +{t.reward} 料理券
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  onAddVouchers(t.reward);
                }}
                className="px-2.5 py-1 rounded pixel-btn-secondary text-[11px] font-bold"
              >
                领取
              </button>
            </div>
          ))}
        </div>

        {/* Footer Close */}
        <div className="mt-4 pt-2 border-t border-[#D7C4A5] flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-[#5C3A21] hover:bg-[#4E3019] text-[#FFF] font-bold text-xs"
          >
            返回烹饪台
          </button>
        </div>
      </div>
    </div>
  );
};
