import { defineStore } from 'pinia';
import {
  getCartInfo, initCart, updateCart, getCoupon, sentOrder, clearCart,
} from '@/api/userRequest';
import errorMessage from '@/utils/errorMessage';

export default defineStore('cartStore', {
  state: () => ({
    cartInfo: [],
  }),
  actions: {
    async getCartInfo(userId) {
      if (!userId) {
        return '請先登入';
      }
      const res = await getCartInfo(userId);
      if (res.success) {
        if (res.data.message.length) {
          [this.cartInfo] = res.data.message;
          return '';
        }
        const initRes = await this.initCart(userId);
        return initRes;
      }
      return errorMessage;
    },
    async initCart(userId) {
      if (!userId) {
        return '請先登入';
      }
      const res = await initCart(userId);
      if (res.success) {
        this.cartInfo = res.data.message;
        return '';
      }
      return errorMessage;
    },
    async addToCart(userId, data, isUpdate) {
      if (!userId) {
        return '請先登入';
      }
      let list = [...this.cartInfo.list];
      if (isUpdate) {
        list = this.updateList(list, data);
        if (!list) {
          return errorMessage;
        }
      } else {
        const index = list.findIndex((item) => item.product.id === data.product.id
          && JSON.stringify(item.userCustom) === JSON.stringify(data.userCustom));
        if (index > -1) {
          list[index].qty += data.qty;
        } else {
          list.push(data);
        }
      }

      list.sort((a, b) => {
        if (a.product.id > b.product.id) return 1;
        if (a.product.id < b.product.id) return -1;
        return 0;
      });

      const res = await this.updateCart(list, userId);
      return res;
    },
    updateList(cartList, data) {
      const list = [...cartList];
      const index = list.findIndex((item) => item.cartId === data.cartId);
      if (index < 0) {
        return null;
      }
      list[index].qty = data.qty;
      list[index].userCustom = { ...data.userCustom };
      list[index].price = data.price;
      list[index].originPrice = data.originPrice;
      const sameItemIndex = list.findIndex((item) => item.product.id === data.product.id
      && JSON.stringify(item.userCustom) === JSON.stringify(data.userCustom)
      && item.cartId !== data.cartId);
      if (sameItemIndex > -1) {
        list[index].qty += list[sameItemIndex].qty;
        list.splice(sameItemIndex, 1);
      }
      return list;
    },
    async setItemQty(userId, cartId, qty) {
      const index = this.cartInfo.list.findIndex((item) => item.cartId === cartId);
      const list = [...this.cartInfo.list];
      list[index].qty = qty;

      const res = await this.updateCart(list, userId);
      return res;
    },
    async removeItem(userId, cartId) {
      const index = this.cartInfo.list.findIndex((item) => item.cartId === cartId);
      const list = [...this.cartInfo.list];
      list.splice(index, 1);

      const res = await this.updateCart(list, userId);
      return res;
    },
    async removeAll(userId) {
      const res = await this.updateCart([], userId);
      return res;
    },
    async updateCart(list, userId) {
      let price = 0;
      let cartItemNum = 0;
      if (list.length > 0) {
        price = list.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
        cartItemNum = list.reduce((acc, cur) => acc + cur.qty, 0);
      }
      let totalPrice = price;
      if (this.cartInfo.coupon?.code) {
        totalPrice = Math.ceil(totalPrice * this.cartInfo.coupon.discount * 0.01);
      }
      const res = await updateCart(this.cartInfo.id, {
        list, price, totalPrice, cartItemNum,
      });
      if (!res.success) {
        return errorMessage;
      }
      const error = await this.getCartInfo(userId);
      if (error) {
        return errorMessage;
      }
      return '';
    },
    async getCoupon(userId, code) {
      const couponInfo = await getCoupon(code);
      if (!couponInfo.success) {
        return errorMessage;
      }
      if (!couponInfo.data.message.length || !couponInfo.data.message[0].isEnabled) {
        return '此優惠卷不存在';
      }
      if (new Date(couponInfo.data.message[0].dueDate).getTime() < Date.now()) {
        return '此優惠卷已過期';
      }
      const coupon = { ...couponInfo.data.message[0] };
      let totalPrice = 0;
      if (this.cartInfo.list.length > 0) {
        totalPrice = this.cartInfo.list.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
      }
      totalPrice = Math.ceil(totalPrice * coupon.discount * 0.01);
      const res = await updateCart(this.cartInfo.id, { coupon, totalPrice });
      if (!res.success) {
        return errorMessage;
      }
      const error = await this.getCartInfo(userId);
      if (error) {
        return errorMessage;
      }
      return '';
    },
    async sentOrder(userId, data) {
      if (!userId) {
        return '請先登入';
      }
      const order = {
        ...data,
        isFinish: false,
        createTime: new Date().getTime(),
      };
      let res = await sentOrder(userId, order);
      if (!res.success) {
        return errorMessage;
      }
      res = await clearCart(data.cartInfo.id);
      if (!res.success) {
        return errorMessage;
      }
      const error = await this.getCartInfo(userId);
      if (error) {
        return errorMessage;
      }
      return '';
    },
  },
  getters: {
    cartItemNum({ cartInfo }) {
      return cartInfo.list?.reduce((acc, cur) => acc + cur.qty, 0) || 0;
    },
  },
});
