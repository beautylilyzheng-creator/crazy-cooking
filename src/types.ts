export type CookingMethodType = 'STEAM' | 'BOIL' | 'STEW' | 'STIR_FRY' | 'BURST_STIR_FRY';

export interface CookingMethodInfo {
  type: CookingMethodType;
  name: string;
  symbol: string;
  operator: '＋' | '×';
  mathType: '加法' | '乘法';
  tagColor: string;
  desc: string;
}

export interface Dish {
  id: string;
  name: string;
  icon: string;
  points: number;
  tags?: string[];
  rarity?: 'common' | 'rare' | 'epic';
}

export type CookwareId = 1 | 2;

export interface CookwareItem {
  id: CookwareId;
  name: string;
  potType: 'copper' | 'clay';
  lidArt: string;
  revealedMethod?: CookingMethodType;
}

export type TierType = 'HOME' | 'PREMIUM' | 'DELUXE';

export interface TierConfig {
  id: TierType;
  name: string;
  cost: number;
  multiplierText: string;
  desc: string;
}

export type UIState = 
  | 'UNPAID'              // 1. 未付费遮挡状态
  | 'REVEALING_DISHES'    // 菜品翻盖动画中
  | 'AWAITING_COOKWARE'   // 2. 菜品已出，请二选一神秘厨具
  | 'COOKING'             // 正在翻开厨具并灶台烹饪
  | 'SETTLED';            // 结算显示数值与礼物

export interface CalculationResult {
  dishes: Dish[];
  method: CookingMethodInfo;
  chosenPotId: CookwareId;
  baseSum: number;
  baseProd: number;
  comboBonus: number;
  formulaStr: string;
  finalPoints: number;
  isBurst: boolean;
  giftTitle: string;
  giftTier: '普通' | '珍稀' | '史诗' | '传说';
}
