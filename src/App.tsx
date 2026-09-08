import React, { useState, useEffect } from 'react';
import { 
  CookwareId, 
  UIState, 
  CalculationResult, 
  Dish, 
  CookingMethodType,
  TierType
} from './types';
import { 
  DEFAULT_DISHES, 
  SAMPLE_DISH_POOL, 
  COOKING_METHODS, 
  TIERS
} from './data/cookingData';
import { TopChefBar } from './components/TopChefBar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { RareRecipeBar } from './components/RareRecipeBar';
import { DishesColumn } from './components/DishesColumn';
import { CookingStoveCenter } from './components/CookingStoveCenter';
import { MysteriousCookwareSection } from './components/MysteriousCookwareSection';
import { BottomActionPanel } from './components/BottomActionPanel';
import { RulesDialog } from './components/RulesDialog';
import { VoucherDialog } from './components/VoucherDialog';
import { RareRecipeModal } from './components/RareRecipeModal';
import { TenDrawResultModal } from './components/TenDrawResultModal';
import { DesignAnnotationsView } from './components/DesignAnnotationsView';
import { 
  Smartphone, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  LayoutTemplate, 
  Layers, 
  Info,
  Maximize2,
  ChevronDown
} from 'lucide-react';

export default function App() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'simulator' | 'annotations' | 'comparison'>('simulator');
  const [showPhoneBezel, setShowPhoneBezel] = useState(true);

  // Core Game State
  const [uiState, setUiState] = useState<UIState>('UNPAID');
  const [vouchers, setVouchers] = useState(240);
  const [myPoints, setMyPoints] = useState(91080);
  const [burstFireCount, setBurstFireCount] = useState(7); // default 7/10 from prompt requirement
  const [currentTier, setCurrentTier] = useState<TierType>('HOME');

  // Active cooking round state
  const [activeDishes, setActiveDishes] = useState<Dish[]>(DEFAULT_DISHES);
  const [revealedDishCount, setRevealedDishCount] = useState(0);
  const [selectedPotId, setSelectedPotId] = useState<CookwareId | null>(null);
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);

  // Modals
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [tenDrawResults, setTenDrawResults] = useState<{ results: CalculationResult[]; total: number } | null>(null);

  // Helper: Perform cooking calculation
  const computeRoundResult = (
    dishes: Dish[],
    chosenPotId: CookwareId,
    forceBurst: boolean = false,
    forcedMethod?: CookingMethodType
  ): CalculationResult => {
    let methodKey: CookingMethodType;

    if (forceBurst || burstFireCount >= 10) {
      methodKey = 'BURST_STIR_FRY';
    } else if (forcedMethod) {
      methodKey = forcedMethod;
    } else {
      // 4 possible methods: 蒸 (加法), 煮 (加法), 熬 (加法), 炒 (乘法)
      // 25% each for equal chance
      const rand = Math.random();
      if (rand < 0.25) methodKey = 'STEAM';
      else if (rand < 0.50) methodKey = 'BOIL';
      else if (rand < 0.75) methodKey = 'STEW';
      else methodKey = 'STIR_FRY';
    }

    const method = COOKING_METHODS[methodKey];
    const isBurst = methodKey === 'BURST_STIR_FRY';

    // Base values from dishes
    const d1 = dishes[0]?.points || 5;
    const d2 = dishes[1]?.points || 5;
    const d3 = dishes[2]?.points || 4;
    const comboBonus = 1.2;

    let baseSum = d1 + d2 + d3;
    let baseProd = d1 * d2 * d3;
    let formulaStr = '';
    let finalPoints = 0;
    let giftTier: '普通' | '珍稀' | '史诗' | '传说' = '普通';
    let giftTitle = '';

    if (isBurst) {
      // Burst stir-fry multiplication
      finalPoints = Math.round(baseProd * comboBonus * 1.5);
      formulaStr = `${d1}×${d2}×${d3}×爆炒加成1.8＝${finalPoints}`;
      giftTier = '传说';
      giftTitle = '传说礼物·龙腾四海';
    } else if (method.mathType === '乘法') {
      finalPoints = Math.round(baseProd * comboBonus);
      formulaStr = `${d1}×${d2}×${d3}×组合加成1.2＝${finalPoints}`;
      giftTier = '珍稀';
      giftTitle = '珍稀礼物·金玉满堂';
    } else {
      // Addition
      finalPoints = Math.round(baseSum * comboBonus);
      formulaStr = `（${d1}＋${d2}＋${d3}）×组合加成1.2＝${finalPoints}`;
      giftTier = finalPoints >= 20 ? '珍稀' : '普通';
      giftTitle = finalPoints >= 20 ? '珍稀礼物·锦绣良缘' : '普通礼物·柴米油盐';
    }

    return {
      dishes,
      method,
      chosenPotId,
      baseSum,
      baseProd,
      comboBonus,
      formulaStr,
      finalPoints,
      isBurst,
      giftTitle,
      giftTier,
    };
  };

  // Action: Pay and start single cook
  const handleCookSingle = () => {
    const activeTierConfig = TIERS.find((t) => t.id === currentTier) || TIERS[0];
    if (vouchers < activeTierConfig.cost) {
      setIsVoucherOpen(true);
      return;
    }

    setVouchers((prev) => prev - activeTierConfig.cost);
    setSelectedPotId(null);
    setCalcResult(null);

    // Pick 3 dishes (default matching prompt: 5, 5, 4 or random pool)
    const newDishes: Dish[] = [
      DEFAULT_DISHES[0],
      DEFAULT_DISHES[1],
      DEFAULT_DISHES[2],
    ];
    setActiveDishes(newDishes);

    // Transition: Uncover dishes one by one
    setUiState('REVEALING_DISHES');
    setRevealedDishCount(0);

    setTimeout(() => setRevealedDishCount(1), 250);
    setTimeout(() => setRevealedDishCount(2), 500);
    setTimeout(() => {
      setRevealedDishCount(3);
      setUiState('AWAITING_COOKWARE');
    }, 750);
  };

  // Action: User chooses one of the two mysterious cookware
  const handleSelectCookware = (potId: CookwareId) => {
    if (uiState !== 'AWAITING_COOKWARE') return;

    setSelectedPotId(potId);
    setUiState('COOKING');

    setTimeout(() => {
      const willBeBurst = burstFireCount >= 10;
      const result = computeRoundResult(activeDishes, potId, willBeBurst);
      setCalcResult(result);
      setUiState('SETTLED');

      // Update points and fire gauge
      setMyPoints((prev) => prev + result.finalPoints);
      if (willBeBurst) {
        setBurstFireCount(0); // reset gauge
      } else {
        setBurstFireCount((prev) => Math.min(10, prev + 1));
      }
    }, 600);
  };

  // Action: Cook 10x
  const handleCookTen = () => {
    const activeTierConfig = TIERS.find((t) => t.id === currentTier) || TIERS[0];
    const costTen = activeTierConfig.cost * 10;
    if (vouchers < costTen) {
      setIsVoucherOpen(true);
      return;
    }

    setVouchers((prev) => prev - costTen);

    // 10-draw: 1 cookware choice resolves all 10
    const chosenPotId: CookwareId = Math.random() > 0.5 ? 1 : 2;
    setSelectedPotId(chosenPotId);

    const results: CalculationResult[] = [];
    let currentFire = burstFireCount;
    let totalAdded = 0;

    for (let i = 0; i < 10; i++) {
      const isBurst = currentFire >= 10;
      const res = computeRoundResult(DEFAULT_DISHES, chosenPotId, isBurst);
      results.push(res);
      totalAdded += res.finalPoints;
      if (isBurst) {
        currentFire = 0;
      } else {
        currentFire += 1;
      }
    }

    setBurstFireCount(Math.min(10, currentFire));
    setMyPoints((prev) => prev + totalAdded);
    setTenDrawResults({ results, total: totalAdded });
    // Also display the 1st one in main screen
    setActiveDishes(DEFAULT_DISHES);
    setRevealedDishCount(3);
    setCalcResult(results[0]);
    setUiState('SETTLED');
  };

  // Preset state apply helper for design inspection
  const handleApplyPresetState = (
    targetState: UIState, 
    forceBurst: boolean = false,
    forcedPotId: CookwareId = 1,
    forcedMethod?: CookingMethodType
  ) => {
    setUiState(targetState);
    if (targetState === 'UNPAID') {
      setSelectedPotId(null);
      setCalcResult(null);
      setRevealedDishCount(0);
    } else if (targetState === 'AWAITING_COOKWARE') {
      setActiveDishes(DEFAULT_DISHES);
      setRevealedDishCount(3);
      setSelectedPotId(null);
      setCalcResult(null);
    } else if (targetState === 'SETTLED') {
      setActiveDishes(DEFAULT_DISHES);
      setRevealedDishCount(3);
      setSelectedPotId(forcedPotId);
      const res = computeRoundResult(DEFAULT_DISHES, forcedPotId, forceBurst, forcedMethod || (forceBurst ? 'BURST_STIR_FRY' : 'STEAM'));
      setCalcResult(res);
      if (forceBurst) {
        setBurstFireCount(10);
      }
    }
  };

  // Reset to initial clean demo state
  const handleReset = () => {
    setUiState('UNPAID');
    setRevealedDishCount(0);
    setSelectedPotId(null);
    setCalcResult(null);
    setBurstFireCount(7);
    setVouchers(240);
    setMyPoints(91080);
    setCurrentTier('HOME');
  };

  return (
    <div className="min-h-screen bg-[#110A06] text-[#FFF7E8] flex flex-col items-center justify-start py-4 px-2 sm:px-4">
      {/* Top Prototype Workbench Control Bar */}
      <header className="w-full max-w-5xl mb-4 bg-[#23140C] border-2 border-[#54331C] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E64A19] to-[#BF360C] border-2 border-[#FFD54F] flex items-center justify-center text-xl shadow-md">
            🍲
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel-title text-base sm:text-lg font-black text-[#FFE082] tracking-wide">
                《神秘料理锅》
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E64A19] text-white font-bold">
                高保真原型
              </span>
            </div>
            <p className="text-[11px] text-[#BCAAA4]">
              星露谷物语 × 千禧像素手游 × 中华小当家 概率料理玩法
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#160B06] p-1 rounded-lg border border-[#442816]">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-[#E64A19] text-white shadow-sm'
                : 'text-[#BCAAA4] hover:text-[#FFE082]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>实时竖屏原型</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'comparison'
                ? 'bg-[#E64A19] text-white shadow-sm'
                : 'text-[#BCAAA4] hover:text-[#FFE082]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>双状态同屏对比 (State A & B)</span>
          </button>

          <button
            onClick={() => setActiveTab('annotations')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'annotations'
                ? 'bg-[#E64A19] text-white shadow-sm'
                : 'text-[#BCAAA4] hover:text-[#FFE082]'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>交互与数值标注</span>
          </button>
        </div>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPhoneBezel(!showPhoneBezel)}
            className="p-1.5 rounded-lg bg-[#331C10] hover:bg-[#442516] border border-[#5A3821] text-xs text-[#D7CCC8] flex items-center gap-1"
            title="切换手机外框"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FFB74D]" />
            <span className="hidden sm:inline">{showPhoneBezel ? '真机外框' : '纯净面板'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#331C10] hover:bg-[#442516] border border-[#5A3821] text-xs text-[#D7CCC8] flex items-center gap-1"
            title="重置原型至初始状态"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FFB74D]" />
            <span className="hidden sm:inline">重置</span>
          </button>
        </div>
      </header>

      {/* Main Content Area based on Active Tab */}
      <main className="w-full max-w-5xl flex justify-center items-start">
        {activeTab === 'simulator' && (
          <div className="flex flex-col items-center w-full">
            {/* Quick State Presets Toolbar */}
            <div className="mb-3 px-3 py-1.5 rounded-lg bg-[#24130A] border border-[#4E2E19] flex items-center gap-2 text-xs">
              <span className="text-[#FFB74D] font-bold text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>状态快照：</span>
              </span>
              <button
                onClick={() => handleApplyPresetState('UNPAID')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  uiState === 'UNPAID' ? 'bg-[#FF7A30] text-white font-bold' : 'bg-[#3A2214] text-[#D7CCC8] hover:bg-[#4E2F1C]'
                }`}
              >
                ① 未付费遮挡
              </button>
              <button
                onClick={() => handleApplyPresetState('AWAITING_COOKWARE')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  uiState === 'AWAITING_COOKWARE' ? 'bg-[#FF7A30] text-white font-bold' : 'bg-[#3A2214] text-[#D7CCC8] hover:bg-[#4E2F1C]'
                }`}
              >
                ② 菜出待选厨具
              </button>
              <button
                onClick={() => handleApplyPresetState('SETTLED', false, 1, 'STEAM')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  uiState === 'SETTLED' && !calcResult?.isBurst ? 'bg-[#FF7A30] text-white font-bold' : 'bg-[#3A2214] text-[#D7CCC8] hover:bg-[#4E2F1C]'
                }`}
              >
                ③ 蒸煮熬(加法)
              </button>
              <button
                onClick={() => handleApplyPresetState('SETTLED', true, 2, 'STIR_FRY')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  calcResult?.isBurst ? 'bg-[#D50000] text-white font-bold' : 'bg-[#3A2214] text-[#D7CCC8] hover:bg-[#4E2F1C]'
                }`}
              >
                ④ 爆炒时刻(乘法)
              </button>
            </div>

            {/* Mobile Viewport Container */}
            <div className={`relative ${showPhoneBezel ? 'p-3 bg-[#1C0E07] rounded-[44px] border-[6px] border-[#382012] shadow-2xl' : ''}`}>
              {/* Phone Speaker & Camera Notch */}
              {showPhoneBezel && (
                <div className="w-full flex justify-center items-center pb-2">
                  <div className="w-20 h-4 bg-[#0A0503] rounded-full flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1A0C06]" />
                    <div className="w-8 h-1 rounded-full bg-[#1A0C06]" />
                  </div>
                </div>
              )}

              {/* Complete Mobile Screen Canvas (385px × 730px, standard mobile portrait) */}
              <div className="relative w-[375px] sm:w-[390px] h-[720px] bg-[#1A0F09] rounded-[32px] overflow-hidden flex flex-col shadow-inner select-none border border-[#422513]">
                {/* Upper 1/4: Background Game Scene (Restaurant Tavern) */}
                <div className="relative h-[26%] bg-gradient-to-b from-[#2B160B] via-[#201007] to-[#160A04] flex flex-col justify-between p-3 overflow-hidden">
                  {/* Subtle pixel kitchen background tiles / decorations */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFE0B2_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="absolute top-2 right-4 text-3xl opacity-25 select-none">🏮</div>
                  <div className="absolute top-2 left-4 text-3xl opacity-25 select-none">🏮</div>

                  {/* Top Mobile Status Bar */}
                  <div className="flex items-center justify-between text-[11px] font-pixel-num text-[#A1887F] z-10 px-1">
                    <span className="font-bold">19:42</span>
                    <div className="flex items-center gap-1.5">
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Kitchen Tavern Ambient Headline */}
                  <div className="z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#3E2412]/80 border border-[#6D4227] text-[10px] text-[#FFE082] font-semibold backdrop-blur-xs">
                      <span>⛩️</span>
                      <span>御膳坊 · 灶神祭</span>
                    </div>
                    <span className="text-[10px] text-[#D7CCC8]/70 mt-1">
                      轻触下方抽屉开启今日神秘料理
                    </span>
                  </div>

                  {/* Drawer Pull Handle Indicator */}
                  <div className="w-full flex justify-center pb-0.5 z-10">
                    <div className="w-12 h-1 rounded-full bg-[#FFD54F]/40" />
                  </div>
                </div>

                {/* Lower 3/4: Rounded Drawer Panel (占屏幕高度约 2/3 ～ 3/4) */}
                <div className="relative h-[74%] bg-[#EFE0C7] rounded-t-[22px] border-t-[3px] border-x-[2px] border-[#3E2412] shadow-[0_-8px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
                  {/* Wood Board Top Edge Trim */}
                  <div className="h-1.5 w-full bg-[#5C3A21] border-b border-[#3E2412]" />

                  {/* 1. Top Personal & Chef Info */}
                  <TopChefBar
                    onOpenRules={() => setIsRulesOpen(true)}
                    myPoints={myPoints}
                  />

                  {/* 2. Global Announcement Ticker */}
                  <AnnouncementBar />

                  {/* 3. Rare Recipe Single Line Progress */}
                  <RareRecipeBar onOpenRecipeModal={() => setIsRecipeOpen(true)} />

                  {/* 4, 5, 6, 7. Core Cooking Area (Highest Visual Weight!) */}
                  <div className="flex-1 px-2 py-1.5 flex flex-col justify-between bg-wood-pattern">
                    <div className="flex items-stretch justify-between gap-1.5 h-full">
                      {/* Left: 3 Dishes Column */}
                      <DishesColumn
                        uiState={uiState}
                        dishes={activeDishes}
                        revealedCount={revealedDishCount}
                      />

                      {/* Center: Cooking Stove & Math Formula Staging */}
                      <CookingStoveCenter
                        uiState={uiState}
                        calcResult={calcResult}
                        isBurstActive={burstFireCount >= 10}
                      />

                      {/* Right: 2 Mysterious Cookware Buttons & Burst Fire Gauge */}
                      <MysteriousCookwareSection
                        uiState={uiState}
                        burstFireCount={burstFireCount}
                        selectedPotId={selectedPotId}
                        calcResult={calcResult}
                        onSelectCookware={handleSelectCookware}
                        onForceBurstToggle={() => {
                          setBurstFireCount((prev) => (prev >= 10 ? 0 : 10));
                        }}
                      />
                    </div>
                  </div>

                  {/* 8 & 9. Bottom Actions & Tier Switcher */}
                  <BottomActionPanel
                    vouchers={vouchers}
                    currentTier={currentTier}
                    onChangeTier={setCurrentTier}
                    onCookSingle={handleCookSingle}
                    onCookTen={handleCookTen}
                    onOpenVoucherModal={() => setIsVoucherOpen(true)}
                    disabled={uiState === 'REVEALING_DISHES' || uiState === 'COOKING'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison View (Requirement 10: State A vs State B Side-by-Side) */}
        {activeTab === 'comparison' && (
          <div className="w-full flex flex-col gap-4">
            <div className="p-3 bg-[#24130A] border border-[#54331C] rounded-xl flex items-center justify-between">
              <div>
                <h3 className="font-pixel-title text-base text-[#FFE082]">
                  UI原型双状态对照 (State A & State B Comparison)
                </h3>
                <p className="text-xs text-[#BCAAA4]">
                  左侧：未付费遮挡状态（密闭防偷窥） ｜ 右侧：付费后待选厨具状态（主料揭晓·等概率二选一）
                </p>
              </div>
              <button
                onClick={() => setActiveTab('simulator')}
                className="px-3 py-1.5 rounded-lg pixel-btn-primary text-xs font-bold"
              >
                返回交互原型
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {/* State A: 未付费遮挡状态 */}
              <div className="flex flex-col items-center">
                <div className="mb-2 px-3 py-1 rounded-full bg-[#3E2412] border border-[#6D4227] text-xs font-bold text-[#FFD54F] flex items-center gap-1.5">
                  <span>🔒</span>
                  <span>状态 A：未付费遮挡状态</span>
                </div>
                <div className="w-[360px] h-[640px] bg-[#1A0F09] rounded-2xl overflow-hidden border-2 border-[#5C3A21] shadow-xl flex flex-col">
                  {/* Mini Top backdrop */}
                  <div className="h-[24%] bg-[#22120A] p-2 flex flex-col justify-between text-[10px] text-[#8D6E63]">
                    <div className="flex justify-between">
                      <span>19:42</span>
                      <span>100%</span>
                    </div>
                    <div className="text-center text-[#FFE082] font-bold">
                      ⛩️ 御膳坊 · 未开启状态
                    </div>
                    <div className="w-8 h-1 mx-auto rounded-full bg-[#FFD54F]/30" />
                  </div>
                  {/* Drawer */}
                  <div className="h-[76%] bg-[#EFE0C7] rounded-t-xl border-t-2 border-[#3E2412] flex flex-col justify-between">
                    <TopChefBar onOpenRules={() => setIsRulesOpen(true)} myPoints={91080} />
                    <AnnouncementBar />
                    <RareRecipeBar onOpenRecipeModal={() => setIsRecipeOpen(true)} />
                    <div className="flex-1 p-2 flex bg-wood-pattern">
                      <DishesColumn uiState="UNPAID" dishes={DEFAULT_DISHES} revealedCount={0} />
                      <CookingStoveCenter uiState="UNPAID" calcResult={null} isBurstActive={false} />
                      <MysteriousCookwareSection
                        uiState="UNPAID"
                        burstFireCount={7}
                        selectedPotId={null}
                        calcResult={null}
                        onSelectCookware={() => {}}
                      />
                    </div>
                    <BottomActionPanel
                      vouchers={240}
                      currentTier="HOME"
                      onChangeTier={() => {}}
                      onCookSingle={() => {}}
                      onCookTen={() => {}}
                      onOpenVoucherModal={() => setIsVoucherOpen(true)}
                    />
                  </div>
                </div>
              </div>

              {/* State B: 付费后待选厨具状态 */}
              <div className="flex flex-col items-center">
                <div className="mb-2 px-3 py-1 rounded-full bg-[#D84315] border border-[#FFD54F] text-xs font-bold text-white flex items-center gap-1.5">
                  <span>👉</span>
                  <span>状态 B：付费后选择厨具状态</span>
                </div>
                <div className="w-[360px] h-[640px] bg-[#1A0F09] rounded-2xl overflow-hidden border-2 border-[#5C3A21] shadow-xl flex flex-col">
                  {/* Mini Top backdrop */}
                  <div className="h-[24%] bg-[#22120A] p-2 flex flex-col justify-between text-[10px] text-[#8D6E63]">
                    <div className="flex justify-between">
                      <span>19:42</span>
                      <span>100%</span>
                    </div>
                    <div className="text-center text-[#FFE082] font-bold">
                      🍳 主料揭晓 · 请二选一
                    </div>
                    <div className="w-8 h-1 mx-auto rounded-full bg-[#FFD54F]/30" />
                  </div>
                  {/* Drawer */}
                  <div className="h-[76%] bg-[#EFE0C7] rounded-t-xl border-t-2 border-[#3E2412] flex flex-col justify-between">
                    <TopChefBar onOpenRules={() => setIsRulesOpen(true)} myPoints={91080} />
                    <AnnouncementBar />
                    <RareRecipeBar onOpenRecipeModal={() => setIsRecipeOpen(true)} />
                    <div className="flex-1 p-2 flex bg-wood-pattern">
                      <DishesColumn uiState="AWAITING_COOKWARE" dishes={DEFAULT_DISHES} revealedCount={3} />
                      <CookingStoveCenter uiState="AWAITING_COOKWARE" calcResult={null} isBurstActive={false} />
                      <MysteriousCookwareSection
                        uiState="AWAITING_COOKWARE"
                        burstFireCount={7}
                        selectedPotId={null}
                        calcResult={null}
                        onSelectCookware={() => {}}
                      />
                    </div>
                    <BottomActionPanel
                      vouchers={230}
                      currentTier="HOME"
                      onChangeTier={() => {}}
                      onCookSingle={() => {}}
                      onCookTen={() => {}}
                      onOpenVoucherModal={() => setIsVoucherOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Design Annotations View (Requirement 10) */}
        {activeTab === 'annotations' && (
          <div className="w-full">
            <DesignAnnotationsView
              onApplyState={(state, isBurst, potId, method) => {
                handleApplyPresetState(state, isBurst, potId, method);
                setActiveTab('simulator');
              }}
              onSwitchToLive={() => setActiveTab('simulator')}
            />
          </div>
        )}
      </main>

      {/* Floating Dialogs */}
      <RulesDialog isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
      <VoucherDialog
        isOpen={isVoucherOpen}
        onClose={() => setIsVoucherOpen(false)}
        vouchers={vouchers}
        onAddVouchers={(amount) => setVouchers((prev) => prev + amount)}
      />
      <RareRecipeModal isOpen={isRecipeOpen} onClose={() => setIsRecipeOpen(false)} />
      <TenDrawResultModal
        isOpen={tenDrawResults !== null}
        onClose={() => setTenDrawResults(null)}
        results={tenDrawResults?.results || []}
        totalPoints={tenDrawResults?.total || 0}
      />
    </div>
  );
}
