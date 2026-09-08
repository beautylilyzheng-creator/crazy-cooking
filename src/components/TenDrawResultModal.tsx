import React from 'react';
import { X, Sparkles, Flame } from 'lucide-react';
import { CalculationResult } from '../types';

interface TenDrawResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: CalculationResult[];
  totalPoints: number;
}

export const TenDrawResultModal: React.FC<TenDrawResultModalProps> = ({
  isOpen,
  onClose,
  results,
  totalPoints,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-xl pixel-wood-frame p-4 bg-[#FDF5E6] text-[#3E2412] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#5C3A21] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🍱</span>
            <div>
              <h3 className="font-pixel-title text-base font-black text-[#8D2B0C]">
                十连烹饪 · 汇总揭晓
              </h3>
              <p className="text-[10px] text-[#795548]">
                统一选择揭秘，总计获得丰厚美味值
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#E0D0B8] hover:bg-[#D4C0A2] border border-[#5C3A21] flex items-center justify-center text-[#5C3A21] font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Total Points Added Banner */}
        <div className="my-2.5 p-3 rounded-lg bg-gradient-to-r from-[#D84315] to-[#E65100] text-white flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] text-[#FFE0B2]">本轮十连总计获得</span>
            <div className="text-xl font-black font-pixel-num text-[#FFEB3B]">
              +{totalPoints.toLocaleString()} <span className="text-xs font-normal">美味值</span>
            </div>
          </div>
          <div className="px-2 py-1 rounded bg-[#BF360C] text-[#FFF9C4] text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>丰收大成</span>
          </div>
        </div>

        {/* 10 runs list */}
        <div className="space-y-1.5 max-h-[42vh] overflow-y-auto pr-1">
          {results.map((res, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg border flex items-center justify-between text-xs ${
                res.isBurst
                  ? 'bg-[#FFF3E0] border-[#FF9800]'
                  : 'bg-[#F5EAD2] border-[#D7C4A5]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-pixel-num text-[10px] text-[#8D6E63] font-bold">
                  #{String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-base">{res.method.symbol}</span>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#3E2412]">
                      {res.method.name} ({res.method.mathType})
                    </span>
                    {res.isBurst && (
                      <span className="bg-[#E65100] text-white text-[8.5px] px-1 rounded font-bold">
                        爆炒
                      </span>
                    )}
                  </div>
                  <span className="text-[9.5px] text-[#795548] font-pixel-num truncate">
                    {res.formulaStr}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-pixel-num font-bold text-[#D84315] text-[11px]">
                  +{res.finalPoints}分
                </div>
                <div className="text-[9px] text-[#2E7D32] font-semibold">
                  {res.giftTier}礼物
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Close */}
        <div className="mt-3 pt-2 border-t border-[#D7C4A5] flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg pixel-btn-primary font-bold text-xs"
          >
            收下美味值与奖励
          </button>
        </div>
      </div>
    </div>
  );
};
