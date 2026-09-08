import React from 'react';
import { ChevronRight } from 'lucide-react';

interface RareRecipeBarProps {
  onOpenRecipeModal: () => void;
}

export const RareRecipeBar: React.FC<RareRecipeBarProps> = ({ onOpenRecipeModal }) => {
  return (
    <div 
      onClick={onOpenRecipeModal}
      className="h-7 px-3 bg-[#442918] hover:bg-[#4E301D] active:bg-[#3D2314] border-b border-[#5E3922] flex items-center justify-between text-xs text-[#EFEBE9] cursor-pointer transition select-none"
    >
      <div className="flex items-center gap-2 overflow-hidden text-[11px]">
        <span className="font-bold text-[#FFCC80] tracking-tight flex-shrink-0">
          珍稀菜谱
        </span>
        <span className="text-[#8D6E63] text-[10px]">｜</span>
        <span className="text-[#FFE082] font-semibold flex-shrink-0">
          龙王海宴 <span className="font-pixel-num text-[#81C784]">2/6</span>
        </span>
        <span className="text-[#8D6E63] text-[10px]">｜</span>
        <span className="inline-flex items-center gap-1 text-[13px] tracking-tight">
          <span>🦞</span>
          <span>🦀</span>
          <span className="w-4 h-4 rounded bg-[#2D1B11] border border-[#5D4037] inline-flex items-center justify-center text-[10px] text-[#FFB74D]">❔</span>
        </span>
      </div>

      <div className="flex items-center gap-0.5 text-[10px] text-[#FFB74D] font-medium flex-shrink-0">
        <span>查看</span>
        <ChevronRight className="w-3 h-3 text-[#FFB74D]" />
      </div>
    </div>
  );
};
