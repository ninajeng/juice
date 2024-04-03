import { defineStore } from 'pinia';
import { getUserCollection, initCollection, updateCollection } from '@/api/userRequest';
import errorMessage from '@/utils/errorMessage';
import utils from '@/utils/sortProduct';
import userAccountStore from '@/stores/userAccountStore';

export default defineStore('collectStore', {
  state: () => ({
    collectInfo: [],
  }),
  actions: {
    async getCollection() {
      if (!this.userId) {
        return '請先登入';
      }
      const res = await getUserCollection(this.userId);
      if (res.success) {
        if (res.data.message.length) {
          [this.collectInfo] = res.data.message;
          return '';
        }
        const initRes = await this.initCollection(this.userId);
        return initRes;
      }
      return errorMessage;
    },
    async initCollection() {
      if (!this.userId) {
        return '請先登入';
      }
      const res = await initCollection(this.userId);
      if (res.success) {
        this.collectInfo = res.data.message;
        return '';
      }
      return errorMessage;
    },
    async addToCollection(data) {
      const resError = await this.getCollection(this.userId);
      if (resError) {
        return resError;
      }
      const list = [...this.collectInfo.list];
      if (this.isCollected(data, list)) {
        return '';
      }
      list.push(data);
      list.sort((a, b) => utils.sortData(a, b));

      const res = await this.updateCollection({ list });
      return res;
    },
    async editCollectedItem(data) {
      const resError = await this.getCollection(this.userId);
      if (resError) {
        return resError;
      }
      const list = [...this.collectInfo.list];
      if (this.isCollected(data, list)) {
        const res = await this.removeItem(data.collectionId);
        return res;
      }
      const index = list.findIndex((item) => item.collectionId === data.collectionId);

      if (index > -1) {
        list.splice(index, 1, data);
      } else {
        list.push(data);
      }
      list.sort((a, b) => utils.sortData(a, b));

      const res = await this.updateCollection({ list });
      return res;
    },
    async removeItem(collectionId) {
      const index = this.collectInfo.list.findIndex((item) => item.collectionId === collectionId);
      if (index < 0) {
        return '';
      }
      const list = [...this.collectInfo.list];
      list.splice(index, 1);

      const res = await this.updateCollection({ list });
      return res;
    },
    async removeAll() {
      const res = await this.updateCollection({ list: [] });
      return res;
    },
    async updateCollection(data) {
      const res = await updateCollection(this.collectInfo.id, data);
      if (!res.success) {
        return errorMessage;
      }
      const error = await this.getCollection(this.userId);
      if (error) {
        return errorMessage;
      }
      return '';
    },
    clearCollectInfo() {
      this.collectInfo = [];
    },
    isCollected(target, list) {
      const index = list.findIndex((item) => item.product.id === target.product.id
          && JSON.stringify(item.userCustom) === JSON.stringify(target.userCustom));
      return index > -1;
    },
  },
  getters: {
    userId() {
      const { userData } = userAccountStore();
      return userData.id;
    },
  },
});
