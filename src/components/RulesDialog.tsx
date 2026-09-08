import React from 'react';
import { X, Sparkles, Flame } from 'lucide-react';

interface RulesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesDialog: React.FC<RulesDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-xl pixel-wood-frame p-4 bg-[#FDF5E6] text-[#3E2412] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#5C3A21] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">📜</span>
            <h3 className="font-pixel-title text-base font-black text-[#8D2B0C]">
              《神秘料理锅》玩法指南与规则
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#E0D0B8] hover:bg-[#D4C0A2] border border-[#5C3A21] flex items-center justify-center text-[#5C3A21] font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-col gap-3 text-xs leading-relaxed">
          {/* Section 1: Core Loop */}
          <div className="p-2.5 rounded-lg bg-[#F5EAD2] border border-[#D7C4A5]">
            <h4 className="font-bold text-[#8D2B0C] flex items-center gap-1 mb-1">
              <span>🍳</span> 核心烹饪玩法
            </h4>
            <p className="text-[#5D4037]">
              使用料理券开启料理锅，依次揭晓三道随机主料，决定初始基础数值。之后从两个神秘厨具中二选一，揭晓本次烹饪法门！
            </p>
          </div>

          {/* Section 2: 4 Cooking Methods & Math */}
          <div className="p-2.5 rounded-lg bg-[#F5EAD2] border border-[#D7C4A5]">
            <h4 className="font-bold text-[#8D2B0C] flex items-center gap-1 mb-1.5">
              <span>⚖️</span> 4种烹饪方式与算式法则
            </h4>
            <div className="space-y-1 text-[#4E342E]">
              <div className="flex items-start gap-1">
                <span className="font-bold text-[#1E88E5]">1. ♨️ 蒸：</span>
                <span>加法计算。例：(5＋5＋4)×1.2＝17</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="font-bold text-[#43A047]">2. 🍲 煮：</span>
                <span>加法计算。例：(5＋5＋4)×1.2＝17</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="font-bold text-[#8E24AA]">3. 🥘 熬：</span>
                <span>加法计算。例：(5＋5＋4)×1.2＝17</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="font-bold text-[#E53935]">4. 🔥 炒：</span>
                <span><strong>乘法计算！</strong>美味爆发！例：5×5×4×1.2＝120</span>
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-[#795548] border-t border-[#DEC9AC] pt-1">
              最终计算数值即为“本次美味值”，数值越高，进入稀有、史诗及传说礼物的获取概率越高！
            </p>
          </div>

          {/* Section 3: Burst Fire Overdrive */}
          <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#FFF3E0] to-[#FFE0B2] border border-[#FFB74D]">
            <h4 className="font-bold text-[#E65100] flex items-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-[#FF5722]" /> 🔥 爆炒火候累计机制
            </h4>
            <p className="text-[#5D4037]">
              每烹饪1次，无论最终揭晓蒸、煮、熬还是炒，均累计1点爆炒火候。累计达到 <strong>10/10</strong> 后，下一次烹饪<strong>必定触发【爆炒】</strong>！
            </p>
            <p className="text-[11px] text-[#D84315] font-bold mt-1">
              ★ 爆炒使用超级乘法，灶火升级，且必定产出珍稀及以上高阶礼物！
            </p>
          </div>

          {/* Section 4: Fair Odds Disclosure */}
          <div className="p-2.5 rounded-lg bg-[#F5EAD2] border border-[#D7C4A5]">
            <h4 className="font-bold text-[#5C3A21] flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> 概率透明说明
            </h4>
            <ul className="list-disc pl-4 space-y-0.5 text-[#5D4037]">
              <li>右侧两个神秘厨具揭秘概率<strong>完全相同（各50%）</strong>。</li>
              <li>仅揭开用户选中的厨具；未选中的厨具保持密封，杜绝伪随机与事后调控。</li>
              <li>十连抽只需选择1次厨具，本轮统一揭晓并聚合发放美味值。</li>
            </ul>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-4 pt-2 border-t border-[#D7C4A5] flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg pixel-btn-primary font-bold text-xs"
          >
            我已知晓，开始掌勺！
          </button>
        </div>
      </div>
    </div>
  );
};
