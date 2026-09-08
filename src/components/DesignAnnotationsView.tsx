import React, { useState } from 'react';
import { Info, CheckCircle2, Flame, Sparkles, Eye, ShieldCheck, Calculator, Smartphone } from 'lucide-react';
import { UIState } from '../types';

interface DesignAnnotationsViewProps {
  onApplyState: (state: UIState, isBurst?: boolean, potId?: 1 | 2, method?: 'STEAM' | 'STIR_FRY') => void;
  onSwitchToLive: () => void;
}

export const DesignAnnotationsView: React.FC<DesignAnnotationsViewProps> = ({
  onApplyState,
  onSwitchToLive,
}) => {
  const [activePin, setActivePin] = useState<number | null>(1);

  const annotations = [
    {
      id: 1,
      title: '第一视觉中心与信息层级 (Visual Center & Hierarchy)',
      badge: '构图法则',
      icon: <Smartphone className="w-4 h-4 text-[#FF7A30]" />,
      summary: '核心视觉中心牢牢锁定在“三道主料＋两个神秘厨具”，非核心模块高度紧凑压缩。',
      details: [
        '顶部厨神信息栏高度仅占约48px，使用三段式紧凑排版，留足中心烹饪区空间。',
        '全服滚动播报与珍稀菜谱均严格控制为单行（各约26px-28px），杜绝繁杂运营活动板感。',
        '手机端2/3～3/4抽屉结构，圆角木质边框与米黄案台营造沉浸式像素小当家厨房氛围。',
      ],
    },
    {
      id: 2,
      title: '未付费绝对密闭遮挡 (Unpaid Shielding Logic)',
      badge: '合规与期望',
      icon: <ShieldCheck className="w-4 h-4 text-[#10B981]" />,
      summary: '付费前绝对不提前展示菜品与数值，采用像素深色锦缎密封盖与金印问号遮挡。',
      details: [
        '3个菜品格子在未付费状态下完全隐藏菜名、插图与点数，仅显示“待付费揭晓”。',
        '核心文案明确告知“支付料理券后揭晓三道菜”，消除用户预期混淆。',
        '付费后采用逐张翻盖揭晓动效（0.25s阶梯延迟），强化开箱惊喜感与仪式感。',
      ],
    },
    {
      id: 3,
      title: '4种法门预告与2选1等概率透明度 (Equal Odds 2-Choice UX)',
      badge: '数学模型与心理学',
      icon: <Calculator className="w-4 h-4 text-[#3B82F6]" />,
      summary: '展示4种烹饪结果全集，但仅提供2个神秘厨具供用户二选一，两边概率严格相同。',
      details: [
        '厨具上方置顶告知全集结果：“可能揭晓：♨️蒸＋｜🍲煮＋｜🥘熬＋｜🔥炒×”。',
        '仅提供2个大尺寸手感触控锅具（赤铜双耳锅 vs 砂陶紫砂煲），外观质感微调但无数值暗示。',
        '底部明文强提示：“请选择一个厨具 · 两边揭秘概率相同”，避免玩家产生“选错亏损”悔恨心理。',
        '选中后仅翻开选中的锅具，未选厨具保持遮挡并灰度淡化（Opacity 35%），杜绝“偷看底牌”假象。',
      ],
    },
    {
      id: 4,
      title: '算式演进与美味值爆发 (Math Formula Staging)',
      badge: '爽感放大器',
      icon: <Sparkles className="w-4 h-4 text-[#EAB308]" />,
      summary: '蒸/煮/熬走加法稳健保底，炒/爆炒走乘法极巨化爆发，数值跳跃一目了然。',
      details: [
        '加法示例：（5＋5＋4）×组合加成1.2＝17分，平稳获取基础收益。',
        '乘法示例：5×5×4×组合加成1.2＝120分，产生约7倍的惊人飞跃！',
        '算式下方高亮呈现“本次美味值＋120”与“已进入珍稀礼物区间”，即刻正向反馈。',
      ],
    },
    {
      id: 5,
      title: '爆炒火候保底机制 (Burst Fire Overdrive)',
      badge: '保底心智',
      icon: <Flame className="w-4 h-4 text-[#EF4444]" />,
      summary: '10次烹饪火候必出爆炒，橙色条紧凑附着于厨具区下方，目标感清晰。',
      details: [
        '无论揭晓何种方式，每次均稳步累积1点火候（7/10），显示“再烹饪3次，下一次必定爆炒”。',
        '达到10次后，灶火升级为烈焰金龙光效，下一次必定触发“爆炒时刻”，必得珍稀及以上礼物！',
        '作为次级关键指标，紧凑嵌入厨具模块下方，绝不挤占主料理台视线。',
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 bg-[#26160D] rounded-xl border-2 border-[#54331C] text-[#FFF7E8] shadow-xl">
      {/* Title & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#4E2F1B] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📐</span>
          <div>
            <h3 className="font-pixel-title text-base text-[#FFE082] font-black">
              高保真原型设计规范与交互状态对比
            </h3>
            <p className="text-[11px] text-[#D7CCC8]">
              严格对照需求设计：4种结果、2个等概率厨具、加法/乘法算式与爆炒火候
            </p>
          </div>
        </div>

        <button
          onClick={onSwitchToLive}
          className="px-3 py-1.5 rounded-lg pixel-btn-primary text-xs font-bold flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>进入可交互操作原型</span>
        </button>
      </div>

      {/* State Switcher Shortcuts for Rapid Prototype Evaluation */}
      <div className="p-2.5 rounded-lg bg-[#3A2215] border border-[#5A3821] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#FFCC80]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>原型状态一键载入预览 (State Simulation)</span>
          </span>
          <span className="text-[10px] text-[#BCAAA4]">点击切换主原型界面状态</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => onApplyState('UNPAID')}
            className="p-2 rounded bg-[#2D1B11] hover:bg-[#4A2D1B] border border-[#6D4227] text-left transition flex flex-col"
          >
            <span className="text-[11px] font-bold text-[#FFE082]">状态① 未付费遮挡</span>
            <span className="text-[9px] text-[#A1887F] mt-0.5">三菜遮挡密封 · 厨具待命</span>
          </button>

          <button
            onClick={() => onApplyState('AWAITING_COOKWARE')}
            className="p-2 rounded bg-[#2D1B11] hover:bg-[#4A2D1B] border border-[#6D4227] text-left transition flex flex-col"
          >
            <span className="text-[11px] font-bold text-[#81D4FA]">状态② 菜品已出·待选</span>
            <span className="text-[9px] text-[#A1887F] mt-0.5">三菜揭晓 · 提示选厨具</span>
          </button>

          <button
            onClick={() => onApplyState('SETTLED', false, 1, 'STEAM')}
            className="p-2 rounded bg-[#2D1B11] hover:bg-[#4A2D1B] border border-[#6D4227] text-left transition flex flex-col"
          >
            <span className="text-[11px] font-bold text-[#A5D6A7]">状态③ 加法揭晓 (蒸+)</span>
            <span className="text-[9px] text-[#A1887F] mt-0.5">（5+5+4）×1.2＝17</span>
          </button>

          <button
            onClick={() => onApplyState('SETTLED', true, 2, 'STIR_FRY')}
            className="p-2 rounded bg-[#2D1B11] hover:bg-[#4A2D1B] border border-[#FF7043] text-left transition flex flex-col ring-1 ring-[#FF7043]/50"
          >
            <span className="text-[11px] font-bold text-[#FFAB91]">状态④ 爆炒时刻 (炒×)</span>
            <span className="text-[9px] text-[#A1887F] mt-0.5">5×5×4×1.2＝120 必得珍稀</span>
          </button>
        </div>
      </div>

      {/* Interactive Design Spec Annotations (标注列表) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
        {annotations.map((ann) => {
          const isSelected = activePin === ann.id;
          return (
            <div
              key={ann.id}
              onClick={() => setActivePin(isSelected ? null : ann.id)}
              className={`p-3 rounded-lg border-2 transition cursor-pointer ${
                isSelected
                  ? 'bg-[#3F2414] border-[#FFB300] shadow-md'
                  : 'bg-[#2E1A0F] border-[#52331E] hover:border-[#794E2E]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#1F120A] flex items-center justify-center font-pixel-num text-[11px] font-bold text-[#FFD54F] border border-[#5D3A20]">
                    {ann.id}
                  </div>
                  <span className="font-bold text-xs text-[#FFE082]">{ann.title}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#5D3A20] text-[#FFE082] font-semibold">
                  {ann.badge}
                </span>
              </div>

              <p className="text-[11px] text-[#D7CCC8] leading-relaxed">
                {ann.summary}
              </p>

              {isSelected && (
                <div className="mt-2.5 pt-2 border-t border-[#54331C] space-y-1 text-[10.5px] text-[#FFE0B2]">
                  {ann.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <span className="text-[#FFB300]">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
