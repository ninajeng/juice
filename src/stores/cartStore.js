import { defineStore } from 'pinia';
import {
  getCartInfo, initCart, updateCart, getCoupon, sentOrder, clearCart,
} from '@/api/userRequest';
import userAccountStore from '@/stores/userAccountStore';
import errorMessage from '@/utils/errorMessage';
import utils from '@/utils/sortProduct';

export default defineStore('cartStore', {
  state: () => ({
    cartInfo: [],
  }),
  actions: {
    async getCartInfo() {
      if (!this.userId) {
        return '請先登入';
      }
      const res = await getCartInfo(this.userId);
      if (res.success) {
        if (res.data.message.length) {
          [this.cartInfo] = res.data.message;
          return '';
        }
        const initRes = await this.initCart(this.userId);
        return initRes;
      }
      return errorMessage;
    },
    async initCart() {
      if (!this.userId) {
        return '請先登入';
      }
      const res = await initCart(this.userId);
      if (res.success) {
        this.cartInfo = res.data.message;
        return '';
      }
      return errorMessage;
    },
    async addToCart(data, isUpdate) {
      const resError = await this.getCartInfo(this.userId);
      if (resError) {
        return resError;
      }
      let list = [...this.cartInfo.list];
      if (isUpdate) {
        list = this.updateList(list, data);
        if (!list) {
          return { isNotUpdate: true };
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

      list.sort((a, b) => utils.sortData(a, b));

      const res = await this.updateCart(list, this.userId);
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
    async setItemQty(cartId, qty) {
      const resError = await this.getCartInfo(this.userId);
      if (resError) {
        return resError;
      }
      const index = this.cartInfo.list.findIndex((item) => item.cartId === cartId);
      if (index < 0) {
        return { isNotUpdate: true };
      }
      const list = [...this.cartInfo.list];
      list[index].qty = qty;

      const res = await this.updateCart(list, this.userId);
      return res;
    },
    async removeItem(cartId) {
      const index = this.cartInfo.list.findIndex((item) => item.cartId === cartId);
      const list = [...this.cartInfo.list];
      list.splice(index, 1);

      const res = await this.updateCart(list);
      return res;
    },
    async removeAll() {
      const res = await this.updateCart([]);
      return res;
    },
    async updateCart(list) {
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
      const error = await this.getCartInfo(this.userId);
      if (error) {
        return errorMessage;
      }
      return '';
    },
    async getCoupon(code) {
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
      const error = await this.getCartInfo(this.userId);
      if (error) {
        return errorMessage;
      }
      return '';
    },
    async sentOrder(data) {
      if (!this.userId) {
        return '請先登入';
      }
      const order = {
        ...data,
        isFinish: false,
        createTime: new Date().getTime(),
      };
      let res = await sentOrder(this.userId, order);
      if (!res.success) {
        return errorMessage;
      }
      res = await clearCart(data.cartInfo.id);
      if (!res.success) {
        return errorMessage;
      }
      const error = await this.getCartInfo(this.userId);
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
    userId() {
      const { userData } = userAccountStore();
      return userData.id;
    },
  },
});
