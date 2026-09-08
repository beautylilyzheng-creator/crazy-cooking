import React from 'react';
import { motion } from 'motion/react';
import { UIState, CalculationResult } from '../types';
import { Sparkles, Flame } from 'lucide-react';

interface CookingStoveCenterProps {
  uiState: UIState;
  calcResult: CalculationResult | null;
  isBurstActive: boolean;
}

export const CookingStoveCenter: React.FC<CookingStoveCenterProps> = ({
  uiState,
  calcResult,
  isBurstActive,
}) => {
  const isSettled = uiState === 'SETTLED' && calcResult !== null;
  const isBurst = calcResult?.isBurst || isBurstActive;

  return (
    <div className="flex-1 flex flex-col items-center justify-between min-w-0 px-1">
      {/* Top Title/State Indicator */}
      <div className="w-full flex justify-center mb-1">
        {uiState === 'UNPAID' && (
          <div className="px-2 py-0.5 rounded-full bg-[#3E2412] text-[#D7CCC8] text-[10px] font-semibold border border-[#5A3821] shadow-xs">
            等待烹饪
          </div>
        )}
        {uiState === 'REVEALING_DISHES' && (
          <div className="px-2 py-0.5 rounded-full bg-[#D84315] text-[#FFE082] text-[10px] font-bold border border-[#BF360C] animate-pulse">
            揭晓主料中...
          </div>
        )}
        {uiState === 'AWAITING_COOKWARE' && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="px-2.5 py-0.5 rounded-full bg-[#E65100] text-white text-[10px] font-bold border border-[#FFD54F] shadow-sm flex items-center gap-1"
          >
            <span>👉</span>
            <span>请选择一个神秘厨具</span>
          </motion.div>
        )}
        {uiState === 'COOKING' && (
          <div className="px-2 py-0.5 rounded-full bg-[#BF360C] text-[#FFF] text-[10px] font-bold border border-[#FFAB91] animate-bounce">
            揭秘秘法中...
          </div>
        )}
        {isSettled && isBurst && (
          <motion.div
            initial={{ scale: 0.8, y: -4 }}
            animate={{ scale: 1, y: 0 }}
            className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D50000] via-[#FF6D00] to-[#FFD600] text-[#FFF] text-[10px] font-black border border-[#FFE082] shadow-md flex items-center gap-1"
          >
            <Flame className="w-3 h-3 text-[#FFEB3B] fill-current animate-bounce" />
            <span>🔥 爆炒时刻</span>
          </motion.div>
        )}
        {isSettled && !isBurst && (
          <div className="px-2 py-0.5 rounded-full bg-[#4E342E] text-[#FFE082] text-[10px] font-bold border border-[#6D4C41]">
            烹饪大成
          </div>
        )}
      </div>

      {/* Hearth & Stove Pixel Animation Area */}
      <div className="relative w-full h-[120px] rounded-lg border-2 border-[#5C3A21] bg-[#1F120A] overflow-hidden flex flex-col items-center justify-end pb-1 shadow-inner">
        {/* Hearth Brick Background pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFE0B2_1px,transparent_1px)] [background-size:6px_6px]" />

        {/* Dynamic Light Beam / Steam */}
        {isSettled && (
          <div className="absolute inset-0 pointer-events-none flex justify-center">
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.3], scaleY: 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-16 h-full origin-bottom ${
                isBurst
                  ? 'bg-gradient-to-t from-[#FF6D00]/50 via-[#FFD600]/30 to-transparent'
                  : 'bg-gradient-to-t from-[#FFE082]/30 via-[#FFF9C4]/15 to-transparent'
              }`}
            />
          </div>
        )}

        {/* Small Iron Wok & Pot */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Steam / Aromas */}
          <div className="flex gap-1 mb-0.5">
            <motion.span
              animate={{ y: [-2, -8, -12], opacity: [0, 0.8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              className="text-[10px]"
            >
              ♨️
            </motion.span>
            <motion.span
              animate={{ y: [-2, -10, -14], opacity: [0, 0.9, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: 0.4, ease: 'easeOut' }}
              className="text-[11px]"
            >
              ♨️
            </motion.span>
          </div>

          {/* Cooking Pan Graphic */}
          <div className="relative">
            <div className={`w-16 h-7 rounded-b-full border-2 border-[#1A0E07] flex items-center justify-center transition-colors ${
              isBurst 
                ? 'bg-gradient-to-b from-[#8C1D06] to-[#4E0D02]' 
                : 'bg-gradient-to-b from-[#5C3822] to-[#2B160C]'
            }`}>
              {/* Dish inside pot */}
              <div className="text-xs">
                {uiState === 'UNPAID' ? '🥣' : isBurst ? '🍲✨' : '🥘'}
              </div>
            </div>
            {/* Handles */}
            <div className="absolute -left-1.5 top-1.5 w-2 h-2 rounded-full border border-[#1A0E07] bg-[#4E2E1C]" />
            <div className="absolute -right-1.5 top-1.5 w-2 h-2 rounded-full border border-[#1A0E07] bg-[#4E2E1C]" />
          </div>

          {/* Stove Fire Grate */}
          <div className="w-14 h-2 bg-[#120804] border border-[#3E2412] mt-0.5 rounded-sm flex items-center justify-around px-1">
            <div className="w-1 h-1 bg-[#BF360C] rounded-full" />
            <div className="w-1 h-1 bg-[#BF360C] rounded-full" />
            <div className="w-1 h-1 bg-[#BF360C] rounded-full" />
          </div>
        </div>

        {/* Animated Fire Hearth */}
        <div className="relative w-full flex justify-center items-end h-7 mt-0.5">
          {uiState === 'UNPAID' ? (
            <div className="flex gap-1 text-[11px] opacity-40">
              <span>🔥</span>
            </div>
          ) : isBurst ? (
            <motion.div
              animate={{ scale: [1, 1.12, 0.98, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="flex items-center gap-0.5 text-base drop-shadow-[0_0_8px_#FF5722]"
            >
              <span>🔥</span>
              <span className="text-lg">⚡️🔥</span>
              <span>🔥</span>
            </motion.div>
          ) : (
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="flex items-center gap-1 text-xs drop-shadow-[0_0_4px_#FF9800]"
            >
              <span>🔥</span>
              <span>🔥</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Formula & Calculation Staging Display */}
      <div className="w-full mt-1.5 min-h-[64px] rounded-lg bg-[#FDF7EB] border-2 border-[#5C3A21] p-1.5 flex flex-col justify-center text-center shadow-xs">
        {uiState === 'UNPAID' && (
          <div className="flex flex-col items-center justify-center text-[#8D6E63]">
            <span className="text-[11px] font-bold text-[#5C3A21]">待点燃灶火</span>
            <span className="text-[9px] mt-0.5">点击下方按钮投入料理券</span>
          </div>
        )}

        {uiState === 'REVEALING_DISHES' && (
          <div className="text-[10px] text-[#D84315] font-bold animate-pulse">
            烹饪主料正在下锅...
          </div>
        )}

        {uiState === 'AWAITING_COOKWARE' && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-black text-[#D84315] tracking-tight">
              食材已齐备！
            </span>
            <span className="text-[9px] text-[#5C3A21] mt-0.5 leading-tight">
              蒸/煮/熬加法 · 炒乘法
            </span>
          </div>
        )}

        {uiState === 'COOKING' && (
          <div className="text-[10px] text-[#E65100] font-bold animate-spin">
            🍳 颠勺揭秘中...
          </div>
        )}

        {isSettled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Math Formula line */}
            <div className="text-[10.5px] font-pixel-num font-bold text-[#3E2412] leading-tight break-all">
              {calcResult.formulaStr}
            </div>

            {/* Prominently below formula: 本次美味值 +xxx & Gift Tier */}
            <div className="flex items-center gap-1 mt-1">
              <div className="px-1.5 py-0.5 rounded bg-[#D84315] text-[#FFF] font-pixel-num text-[11px] font-black shadow-xs">
                本次美味值 ＋{calcResult.finalPoints}
              </div>
            </div>

            <div className="text-[9px] font-bold mt-1 text-[#C2410C] flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>
                {calcResult.isBurst
                  ? '🔥 必得珍稀及以上礼物！'
                  : '已进入珍稀礼物区间'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
