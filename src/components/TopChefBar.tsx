import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface TopChefBarProps {
  onOpenRules: () => void;
  myPoints: number;
}

export const TopChefBar: React.FC<TopChefBarProps> = ({ onOpenRules, myPoints }) => {
  const [countdown, setCountdown] = useState('03:28:16');
  const chefPoints = 98420;
  const diffPoints = Math.max(0, chefPoints - myPoints);

  useEffect(() => {
    let totalSec = 3 * 3600 + 28 * 60 + 16;
    const timer = setInterval(() => {
      totalSec = Math.max(0, totalSec - 1);
      const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const s = String(totalSec % 60).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative px-3 pt-2 pb-1.5 bg-[#382114] border-b-2 border-[#52331F] text-[#FFF7E8]">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Chef of the Day */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#E64A19] border-2 border-[#FFD54F] flex items-center justify-center text-sm shadow-sm overflow-hidden">
              👨‍🍳
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#D84315] text-[#FFE082] text-[9px] px-1 py-0 rounded font-bold border border-[#52331F] scale-90">
              厨神
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-[#FFE082] truncate max-w-[65px]">
                御前·阿昴
              </span>
            </div>
            <div className="text-[10px] text-[#D7CCC8] font-pixel-num leading-tight">
              {chefPoints.toLocaleString()}分
            </div>
          </div>
        </div>

        {/* Center: Gap & Countdown */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#24140B] border border-[#5A3821] text-[10px] font-semibold text-[#FFB74D]">
            <span>距厨神差</span>
            <span className="text-[#FFE082] font-pixel-num font-bold">{diffPoints.toLocaleString()}</span>
          </div>
          <div className="text-[9px] text-[#A1887F] mt-0.5 tracking-tight">
            今日 <span className="font-pixel-num text-[#FFCC80]">{countdown}</span> 结算
          </div>
        </div>

        {/* Right: My Profile */}
        <div className="flex items-center gap-1.5 min-w-0 justify-end">
          <div className="flex flex-col items-end min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-[#FFF] truncate max-w-[65px]">
                料理学徒
              </span>
            </div>
            <div className="text-[10px] text-[#FFB74D] font-pixel-num leading-tight font-semibold">
              {myPoints.toLocaleString()}分
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#6D4C41] border-2 border-[#BCAAA4] flex items-center justify-center text-sm shadow-sm overflow-hidden">
              🧑‍🍳
            </div>
            <span className="absolute -bottom-1 -left-1 bg-[#4E342E] text-[#BCAAA4] text-[9px] px-1 py-0 rounded font-bold border border-[#2E1A10] scale-90">
              我
            </span>
          </div>

          {/* Question button floating on top-right */}
          <button
            id="btn-rules-help"
            onClick={onOpenRules}
            aria-label="查看玩法规则"
            className="w-6 h-6 ml-0.5 rounded-full bg-[#FFB300] hover:bg-[#FFA000] active:scale-95 text-[#3E2412] font-black flex items-center justify-center border border-[#5D4037] shadow transition"
            title="玩法规则与指引"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
