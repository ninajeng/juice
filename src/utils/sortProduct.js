import { drinkOptions, categories } from '@/utils/productTemplate';

const categoriesName = categories.map((item) => item.name);
const sortKeys = [
  {
    attr: 'product',
    key: 'category',
  },
  {
    attr: 'product',
    key: 'id',
  },
  {
    attr: 'userCustom',
    key: 'size',
  },
  {
    attr: 'userCustom',
    key: 'sugar',
  },
  {
    attr: 'userCustom',
    key: 'ice',
  },
  {
    attr: 'userCustom',
    key: 'extras',
  },
];

export default {
  sortData(a, b) {
    let result = 0;
    for (let i = 0; i < sortKeys.length; i += 1) {
      const target = sortKeys[i];
      let itemAValue = '';
      let itemBValue = '';
      if (drinkOptions[target.key]) {
        const { options } = drinkOptions[target.key];
        itemAValue = options.findIndex((item) => item === a[target.attr][target.key]);
        itemBValue = options.findIndex((item) => item === b[target.attr][target.key]);
      } else if (target.key === 'category') {
        itemAValue = categoriesName.findIndex((item) => item === a[target.attr][target.key]);
        itemBValue = categoriesName.findIndex((item) => item === b[target.attr][target.key]);
      } else {
        itemAValue = a[target.attr][target.key];
        itemBValue = b[target.attr][target.key];
      }

      if (itemAValue > itemBValue) {
        result = 1;
        break;
      }
      if (itemAValue < itemBValue) {
        result = -1;
        break;
      }
    }
    return result;
  },
};
