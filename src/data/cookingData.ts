import { CookingMethodInfo, Dish, TierConfig } from '../types';

export const COOKING_METHODS: Record<string, CookingMethodInfo> = {
  STEAM: {
    type: 'STEAM',
    name: '蒸',
    symbol: '♨️',
    operator: '＋',
    mathType: '加法',
    tagColor: '#3B82F6',
    desc: '清鲜锁嫩，文火原味',
  },
  BOIL: {
    type: 'BOIL',
    name: '煮',
    symbol: '🍲',
    operator: '＋',
    mathType: '加法',
    tagColor: '#10B981',
    desc: '沸水交融，醇和温润',
  },
  STEW: {
    type: 'STEW',
    name: '熬',
    symbol: '🥘',
    operator: '＋',
    mathType: '加法',
    tagColor: '#8B5CF6',
    desc: '浓厚醇香，文火慢淬',
  },
  STIR_FRY: {
    type: 'STIR_FRY',
    name: '炒',
    symbol: '🔥',
    operator: '×',
    mathType: '乘法',
    tagColor: '#EF4444',
    desc: '猛火快炒，美味翻倍倍增',
  },
  BURST_STIR_FRY: {
    type: 'BURST_STIR_FRY',
    name: '爆炒',
    symbol: '⚡️🔥',
    operator: '×',
    mathType: '乘法',
    tagColor: '#F59E0B',
    desc: '锅气冲天！极巨化美味值，必得珍稀及以上礼物',
  },
};

export const SAMPLE_DISH_POOL: Dish[] = [
  { id: 'd1', name: '番茄蛋', icon: '🍅🍳', points: 5, tags: ['家常', '开胃'], rarity: 'common' },
  { id: 'd2', name: '番茄蛋', icon: '🍅🍳', points: 5, tags: ['家常', '开胃'], rarity: 'common' },
  { id: 'd3', name: '葱油鱼', icon: '🐟🥢', points: 4, tags: ['鲜美', '经典'], rarity: 'common' },
  { id: 'd4', name: '麻婆豆腐', icon: '🌶️🍲', points: 6, tags: ['川味', '辛香'], rarity: 'rare' },
  { id: 'd5', name: '黄金脆皮鸭', icon: '🍗✨', points: 7, tags: ['名菜', '酥脆'], rarity: 'rare' },
  { id: 'd6', name: '龙井虾仁', icon: '🦐🍵', points: 8, tags: ['宫廷', '极品'], rarity: 'epic' },
  { id: 'd7', name: '极品佛跳墙', icon: '🏺🌟', points: 9, tags: ['御前', '至臻'], rarity: 'epic' },
];

export const DEFAULT_DISHES: Dish[] = [
  { id: 'd1', name: '番茄蛋', icon: '🍅🍳', points: 5, tags: ['家常', '开胃'], rarity: 'common' },
  { id: 'd2', name: '番茄蛋', icon: '🍅🍳', points: 5, tags: ['家常', '开胃'], rarity: 'common' },
  { id: 'd3', name: '葱油鱼', icon: '🐟🥢', points: 4, tags: ['鲜美', '经典'], rarity: 'common' },
];

export const TIERS: TierConfig[] = [
  {
    id: 'HOME',
    name: '家常小炒',
    cost: 10,
    multiplierText: '基础倍率',
    desc: '经典体验，消耗10券，美味值基础基数',
  },
  {
    id: 'PREMIUM',
    name: '精选大餐',
    cost: 50,
    multiplierText: '5倍美味加权',
    desc: '消耗50券，所得美味值×5倍并累积5次火候',
  },
  {
    id: 'DELUXE',
    name: '豪华大餐',
    cost: 100,
    multiplierText: '10倍至尊加权',
    desc: '消耗100券，所得美味值×10倍并累积10次火候',
  },
];
