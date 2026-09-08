import React from 'react';
import { X, Trophy, Sparkles } from 'lucide-react';

interface RareRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RareRecipeModal: React.FC<RareRecipeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const seaFeastDishes = [
    { name: '深海波士顿龙虾', icon: '🦞', collected: true, score: '+80' },
    { name: '黄金翡翠帝王蟹', icon: '🦀', collected: true, score: '+75' },
    { name: '千岛东海大黄鱼', icon: '🐟', collected: false, score: '+90' },
    { name: '极品极光鲍鱼羹', icon: '🍲', collected: false, score: '+110' },
    { name: '九天银河扇贝柱', icon: '🐚', collected: false, score: '+85' },
    { name: '深海巨蛟珍珠蚌', icon: '🦪', collected: false, score: '+130' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-sm rounded-xl pixel-wood-frame p-4 bg-[#FDF5E6] text-[#3E2412] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#5C3A21] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">👑</span>
            <h3 className="font-pixel-title text-base font-black text-[#8D2B0C]">
              珍稀菜谱 · 龙王海宴 (2/6)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#E0D0B8] hover:bg-[#D4C0A2] border border-[#5C3A21] flex items-center justify-center text-[#5C3A21] font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipe Info */}
        <div className="my-2.5 p-2 rounded-lg bg-[#F5EAD2] border border-[#D7C4A5] text-xs">
          <div className="flex items-center justify-between font-bold text-[#8D2B0C] mb-1">
            <span>集齐6道深海珍馐奖励：</span>
            <span className="text-[#D84315] font-pixel-num">传说称号 + 888券</span>
          </div>
          <p className="text-[11px] text-[#6D4C41]">
            在料理锅中揭晓高美味值或触发【爆炒】，即有极大概率点亮珍稀图鉴！
          </p>
        </div>

        {/* 6 Grid Slots */}
        <div className="grid grid-cols-3 gap-2 my-2">
          {seaFeastDishes.map((item, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg border-2 flex flex-col items-center justify-center text-center transition ${
                item.collected
                  ? 'bg-[#FFF8E1] border-[#FFA000] shadow-xs'
                  : 'bg-[#EAE0CD] border-[#BCAAA4] opacity-60'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold text-[#3E2412] truncate max-w-[70px]">
                {item.name}
              </span>
              <span className={`text-[9px] mt-0.5 font-pixel-num font-bold ${item.collected ? 'text-[#2E7D32]' : 'text-[#8D6E63]'}`}>
                {item.collected ? '已点亮' : '未解锁'}
              </span>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-3 pt-2 border-t border-[#D7C4A5] flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg pixel-btn-primary font-bold text-xs"
          >
            继续烹饪收集
          </button>
        </div>
      </div>
    </div>
  );
};
