import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="h-6 bg-[#26150C] border-b border-[#4A2D1B] overflow-hidden flex items-center px-2 relative">
      <div className="w-full overflow-hidden whitespace-nowrap text-[11px] text-[#FFE082] flex items-center">
        <span className="flex-shrink-0 mr-1.5 text-xs">📣</span>
        <div className="animate-marquee-smooth inline-block tracking-wide font-medium">
          <span className="text-[#FFB74D] font-bold">全服喜报：</span>
          恭喜 <span className="text-[#FFF59D] font-bold">星河大厨</span> 爆炒获得传说礼物·<span className="text-[#FF8A65] font-bold underline decoration-[#FF8A65]/40">龙腾四海</span>！
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          🔥 厨气冲霄！恭喜 <span className="text-[#FFF59D] font-bold">小笼包仙子</span> 烹饪触发爆炒时刻！
        </div>
      </div>
    </div>
  );
};
