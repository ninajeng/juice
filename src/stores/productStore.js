import { defineStore } from 'pinia';
import { getProducts } from '@/api/userRequest';
import errorMessage from '@/utils/errorMessage';

export default defineStore('productStore', {
  state: () => ({
    productList: [],
    targetProduct: null,
  }),
  actions: {
    setProductData(data) {
      if (!data) {
        this.targetProduct = data;
      } else if (!data.cartId) {
        this.targetProduct = data;
      } else {
        this.targetProduct = {
          ...data.product,
          userCustom: data.userCustom,
          cartQty: data.qty,
          cartId: data.cartId,
        };
      }
    },
    async getProducts() {
      this.productList = [];
      const res = await getProducts();
      if (res.success) {
        this.productList = [...res.data.products];
        return '';
      }
      return errorMessage;
    },
  },
});
