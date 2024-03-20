export const types = {
  drink: {
    name: '飲品',
  },
  fruit: {
    name: '水果',
  },
};

export const categories = [
  {
    type: 'drink',
    name: '純果汁',
  },
  {
    type: 'drink',
    name: '混搭果汁',
  },
  {
    type: 'drink',
    name: '果汁佐茶',
  },
  {
    type: 'drink',
    name: '經典手搖',
  },
  {
    type: 'fruit',
    name: '切片水果',
  },
  {
    type: 'fruit',
    name: '整顆/分裝水果',
  },
];

export const drinkOptions = {
  sugar: {
    isCustom: true,
    name: '甜度',
    options: ['無糖', '微糖', '半糖', '少糖', '全糖'],
  },
  ice: {
    isCustom: true,
    name: '冰熱',
    options: ['熱飲', '溫飲', '去冰', '少冰', '正常冰'],
  },
  extras: {
    isCustom: true,
    name: '配料',
    options: ['加珍珠', '加仙草', '加芋圓'],
    addPrice: 10,
  },
  size: {
    isCustom: true,
    name: '尺寸',
    options: ['M', 'L'],
    addPrice: 10,
  },
};

export const sugarGramPer100ml = 6;
