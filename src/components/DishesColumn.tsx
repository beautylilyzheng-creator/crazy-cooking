import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dish, UIState } from '../types';

interface DishesColumnProps {
  uiState: UIState;
  dishes: Dish[];
  revealedCount: number; // 0, 1, 2, 3
}

export const DishesColumn: React.FC<DishesColumnProps> = ({
  uiState,
  dishes,
  revealedCount,
}) => {
  const isUnpaid = uiState === 'UNPAID';

  return (
    <div className="flex flex-col gap-1.5 w-[31%] flex-shrink-0">
      <div className="flex items-center justify-between px-1 text-[10px] font-bold text-[#5C3A21]">
        <span>三道主料</span>
        <span className="text-[#8D6E63] font-pixel-num">
          {isUnpaid ? '0/3' : `${Math.min(3, revealedCount)}/3`}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 relative">
        {dishes.map((dish, index) => {
          const isRevealed = !isUnpaid && revealedCount > index;

          return (
            <div
              key={dish.id + index}
              className="relative h-[68px] rounded-lg overflow-hidden border-2 border-[#5C3A21] shadow-sm bg-[#FDF5E6] flex flex-col justify-between p-1.5 transition-all"
            >
              {/* Unpaid or Unrevealed Covered State */}
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.div
                    key="covered"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 z-10 bg-gradient-to-b from-[#3B2215] to-[#25130A] flex flex-col items-center justify-center p-1 border border-[#6D4227]"
                  >
                    {/* Retro Fabric Texture & Seal */}
                    <div className="w-7 h-7 rounded-full bg-[#4E2E1C] border border-[#FFD54F]/70 flex items-center justify-center shadow-inner">
                      <span className="font-pixel-title text-sm text-[#FFD54F] font-bold">?</span>
                    </div>
                    <span className="text-[9px] text-[#D7CCC8] mt-1 tracking-tight scale-90 font-medium">
                      待付费揭晓
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                    className="flex flex-col h-full justify-between"
                  >
                    {/* Dish Icon & Title */}
                    <div className="flex items-center gap-1">
                      <span className="text-xl leading-none filter drop-shadow-sm flex-shrink-0">
                        {dish.icon}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-[#3E2412] truncate leading-tight">
                          {dish.name}
                        </span>
                        <span className="text-[8px] text-[#8D6E63] truncate">
                          {dish.tags?.[0] || '招牌'}
                        </span>
                      </div>
                    </div>

                    {/* Points Value Tag */}
                    <div className="flex items-center justify-between mt-auto pt-1 border-t border-[#E0D0B8]">
                      <span className="text-[9px] text-[#795548] font-medium">基础数值</span>
                      <div className="px-1.5 py-0.2 rounded bg-[#E65100] text-white font-pixel-num text-[11px] font-bold shadow-xs">
                        +{dish.points}点
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Unpaid prompt badge */}
      {isUnpaid && (
        <div className="px-1 py-1 rounded bg-[#2D1A10] border border-[#5A3821] text-[9px] text-[#FFCC80] text-center leading-tight font-medium shadow-xs">
          支付料理券后<br />揭晓三道菜
        </div>
      )}
    </div>
  );
};
