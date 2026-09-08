import React from 'react';
import { motion } from 'motion/react';
import { CookwareId, UIState, CalculationResult } from '../types';

interface MysteriousCookwareSectionProps {
  uiState: UIState;
  burstFireCount: number; // e.g. 7 out of 10
  selectedPotId: CookwareId | null;
  calcResult: CalculationResult | null;
  onSelectCookware: (potId: CookwareId) => void;
  onForceBurstToggle?: () => void;
}

export const MysteriousCookwareSection: React.FC<MysteriousCookwareSectionProps> = ({
  uiState,
  burstFireCount,
  selectedPotId,
  calcResult,
  onSelectCookware,
  onForceBurstToggle,
}) => {
  const isAwaitingChoice = uiState === 'AWAITING_COOKWARE';
  const isSettled = uiState === 'SETTLED' && calcResult !== null;
  const isUnpaid = uiState === 'UNPAID';
  const remainingForBurst = Math.max(0, 10 - burstFireCount);

  return (
    <div className="flex flex-col gap-1.5 w-[37%] flex-shrink-0">
      {/* Top compact 4 possible results guide */}
      <div className="px-1.5 py-0.5 rounded bg-[#382114] border border-[#5A3821] text-[9px] text-[#FFE082] text-center font-medium leading-tight shadow-xs">
        <span className="text-[#FFB74D] font-bold">可能揭晓：</span>
        <span className="whitespace-nowrap">♨️蒸＋｜🍲煮＋｜🥘熬＋｜🔥炒×</span>
      </div>

      {/* Two Mysterious Cookware Buttons */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Pot 1: 赤铜双耳锅 */}
        {renderPotButton(1, '赤铜双耳锅', 'copper', '🍲')}
        {/* Pot 2: 砂陶老火煲 */}
        {renderPotButton(2, '砂陶紫砂煲', 'clay', '🥘')}
      </div>

      {/* Bottom disclaimer: Equal probability */}
      <div className="px-1 py-0.5 rounded bg-[#FAF2E1] border border-[#D7C4A5] text-[8.5px] text-[#5D4037] text-center font-bold leading-tight">
        请选择一个厨具 · 两边揭秘概率相同
      </div>

      {/* Burst Fire Gauge (爆炒火候 7/10) */}
      <div 
        className="mt-0.5 px-2 py-1 rounded-lg bg-[#2E1A0F] border-2 border-[#54341F] shadow-xs cursor-pointer select-none"
        onClick={onForceBurstToggle}
        title="点击可快捷模拟加满/清空火候进行测试"
      >
        <div className="flex items-center justify-between text-[9.5px] font-bold">
          <span className="text-[#FF9800] flex items-center gap-0.5">
            <span>🔥</span>
            <span>爆炒火候</span>
          </span>
          <span className="text-[#FFE082] font-pixel-num">
            {burstFireCount}/10
          </span>
        </div>

        {/* 10-step segmented progress bar in hearth flame orange */}
        <div className="w-full h-2 rounded-full bg-[#180C07] p-0.5 border border-[#4E2E1A] my-0.5 flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full rounded-[1px] transition-all duration-300 ${
                i < burstFireCount
                  ? 'bg-gradient-to-r from-[#FF9800] to-[#F57C00] shadow-[0_0_3px_#FF9800]'
                  : 'bg-[#3A2215]'
              }`}
            />
          ))}
        </div>

        <div className="text-[8.5px] text-[#D7CCC8] text-center font-medium leading-none">
          {burstFireCount >= 10 ? (
            <span className="text-[#FFEB3B] font-bold animate-pulse">🔥 下一次烹饪必定触发【爆炒】！</span>
          ) : (
            <span>再烹饪 <strong className="text-[#FFB74D] font-pixel-num">{remainingForBurst}</strong> 次，下一次必定爆炒</span>
          )}
        </div>
      </div>
    </div>
  );

  function renderPotButton(
    potId: CookwareId,
    potLabel: string,
    potType: 'copper' | 'clay',
    potIcon: string
  ) {
    const isChosen = selectedPotId === potId;
    const isOtherChosen = selectedPotId !== null && selectedPotId !== potId;
    const isClickable = isAwaitingChoice;

    return (
      <motion.button
        key={potId}
        id={`btn-cookware-pot-${potId}`}
        disabled={!isClickable}
        onClick={() => onSelectCookware(potId)}
        whileTap={isClickable ? { scale: 0.94 } : {}}
        className={`relative h-[86px] rounded-lg border-2 flex flex-col items-center justify-between p-1.5 transition-all text-left overflow-hidden ${
          isClickable
            ? 'cursor-pointer hover:border-[#FFB74D] ring-2 ring-[#FF9800]/50 animate-pulse bg-gradient-to-b from-[#FFF3E0] to-[#FFE0B2]'
            : isOtherChosen
            ? 'opacity-35 grayscale contrast-75 bg-[#2A180E] border-[#4A2D1B]'
            : isChosen && isSettled
            ? 'border-[#FFB74D] bg-gradient-to-b from-[#FFFDE7] to-[#FFF8E1] shadow-md'
            : 'bg-[#FDF5E6] border-[#6D4227]'
        }`}
      >
        {/* Pot Number Tag */}
        <div className="w-full flex items-center justify-between text-[9px] font-bold">
          <span className={`px-1 rounded ${
            potType === 'copper' 
              ? 'bg-[#B85D19] text-white' 
              : 'bg-[#5D4037] text-[#FFE082]'
          }`}>
            {potId === 1 ? '1号厨具' : '2号厨具'}
          </span>
          {isChosen && (
            <span className="text-[8px] text-[#D84315] font-extrabold bg-[#FFCCBC] px-1 rounded">
              已选
            </span>
          )}
        </div>

        {/* Revealed vs Covered Content */}
        {isChosen && isSettled && calcResult ? (
          /* ONLY the chosen cookware reveals! */
          <motion.div
            initial={{ scale: 0.8, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex flex-col items-center justify-center my-auto text-center"
          >
            <span className="text-2xl drop-shadow-sm leading-none">
              {calcResult.method.symbol}
            </span>
            <div className="mt-1 flex items-center gap-0.5">
              <span className={`text-[11px] font-black ${
                calcResult.method.mathType === '乘法' ? 'text-[#D84315]' : 'text-[#2E7D32]'
              }`}>
                {calcResult.method.name}
              </span>
              <span className="text-[9px] text-[#5D4037] font-bold">
                ｜{calcResult.method.mathType}
              </span>
            </div>
          </motion.div>
        ) : (
          /* Covered state: Cloth curtain, question mark, pot silhouette */
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                potType === 'copper'
                  ? 'bg-gradient-to-br from-[#CD7F32] to-[#8C4F1A] border-[#FFE082]'
                  : 'bg-gradient-to-br from-[#6D4C41] to-[#3E2723] border-[#D7CCC8]'
              } shadow-inner`}>
                <span className="text-sm font-pixel-title text-[#FFF] font-black drop-shadow">
                  ?
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs">
                {potIcon}
              </span>
            </div>
            <span className="text-[8.5px] text-[#6D4C41] mt-1 font-semibold truncate max-w-[54px]">
              {isUnpaid ? '遮挡密封' : isOtherChosen ? '未选中·保密' : '神秘厨具'}
            </span>
          </div>
        )}

        {/* Pot Material Subtitle */}
        <div className="w-full text-center text-[8px] text-[#8D6E63] font-medium border-t border-[#E6D7C3] pt-0.5">
          {potLabel}
        </div>
      </motion.button>
    );
  }
};
