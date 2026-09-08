import React from 'react';
import { TIERS } from '../data/cookingData';
import { TierType } from '../types';
import { PlusCircle } from 'lucide-react';

interface BottomActionPanelProps {
  vouchers: number;
  currentTier: TierType;
  onChangeTier: (tier: TierType) => void;
  onCookSingle: () => void;
  onCookTen: () => void;
  onOpenVoucherModal: () => void;
  disabled?: boolean;
}

export const BottomActionPanel: React.FC<BottomActionPanelProps> = ({
  vouchers,
  currentTier,
  onChangeTier,
  onCookSingle,
  onCookTen,
  onOpenVoucherModal,
  disabled = false,
}) => {
  const activeTierConfig = TIERS.find((t) => t.id === currentTier) || TIERS[0];
  const costSingle = activeTierConfig.cost;
  const costTen = activeTierConfig.cost * 10;

  return (
    <div className="flex flex-col gap-2 pt-2 border-t-2 border-[#52331F] bg-[#2E1A10] px-3 pb-2 text-[#FFF7E8]">
      {/* Upper Row: Voucher Counter + Cook 1x & Cook 10x Buttons */}
      <div className="flex items-end justify-between gap-2">
        {/* Collapsible/Expandable Cooking Voucher Entry */}
        <button
          id="btn-voucher-entry"
          onClick={onOpenVoucherModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#3F2516] hover:bg-[#4E2E1C] active:scale-95 border-2 border-[#663D24] shadow-xs cursor-pointer text-left transition select-none flex-shrink-0"
        >
          <span className="text-base">🎟</span>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#D7CCC8] leading-tight">料理券</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold font-pixel-num text-[#FFE082]">
                {vouchers}
              </span>
              <PlusCircle className="w-3 h-3 text-[#FFB74D]" />
            </div>
          </div>
        </button>

        {/* Right side: 10-draw note + Action Buttons */}
        <div className="flex-1 flex flex-col items-end">
          {/* Microcopy note for 10-draw rule */}
          <div className="text-[8.5px] text-[#D7CCC8] mb-1 tracking-tight text-right">
            十连只需选择1次厨具，本轮统一揭晓并汇总。
          </div>

          <div className="flex items-center gap-2 w-full justify-end">
            {/* Cook 1x Button */}
            <button
              id="btn-cook-single"
              disabled={disabled || vouchers < costSingle}
              onClick={onCookSingle}
              className={`flex-1 max-w-[130px] h-10 rounded-lg pixel-btn-primary flex flex-col items-center justify-center font-bold transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-xs leading-tight font-black tracking-wide">
                烹饪1次
              </span>
              <span className="text-[10px] text-[#FFE082] font-pixel-num font-medium leading-tight">
                {costSingle}券
              </span>
            </button>

            {/* Cook 10x Button */}
            <button
              id="btn-cook-ten"
              disabled={disabled || vouchers < costTen}
              onClick={onCookTen}
              className={`flex-1 max-w-[140px] h-10 rounded-lg pixel-btn-primary bg-gradient-to-b from-[#FFA726] to-[#EF6C00] flex flex-col items-center justify-center font-bold transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center gap-1">
                <span className="text-xs leading-tight font-black tracking-wide">
                  烹饪10次
                </span>
                <span className="text-[8.5px] bg-[#D84315] text-[#FFE082] px-1 rounded-sm">
                  特惠
                </span>
              </div>
              <span className="text-[10px] text-[#FFF9C4] font-pixel-num font-medium leading-tight">
                {costTen}券
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Nine: Bottom Gear/Tier Switcher (底部固定悬浮档位栏) */}
      <div className="pt-1.5 border-t border-[#462817]">
        <div className="flex items-center justify-between text-[9px] text-[#A1887F] mb-1 px-0.5">
          <span>烹饪档位选择</span>
          <span>当前倍率：{activeTierConfig.multiplierText}</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {TIERS.map((tier) => {
            const isSelected = tier.id === currentTier;
            return (
              <button
                key={tier.id}
                id={`btn-tier-${tier.id}`}
                onClick={() => onChangeTier(tier.id)}
                className={`py-1.5 px-1 rounded-md text-center flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'pixel-btn-tier-active scale-[1.02]'
                    : 'pixel-btn-tier-inactive hover:bg-[#4E2F20] opacity-80'
                }`}
              >
                <span className={`text-[11px] font-bold ${isSelected ? 'text-[#FFF]' : 'text-[#D7CCC8]'}`}>
                  {tier.name}
                </span>
                <span className={`text-[9px] font-pixel-num ${isSelected ? 'text-[#FFD54F] font-bold' : 'text-[#8D6E63]'}`}>
                  {tier.cost}券
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
