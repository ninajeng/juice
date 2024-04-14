import { defineStore } from 'pinia';
import * as userApi from '@/api/userRequest';
import { delUserCookie } from '@/utils/cookie';
import errorMessage from '@/utils/errorMessage';

export default defineStore('userAccountStore', {
  state: () => ({
    userData: {},
    userSettings: {},
  }),
  actions: {
    setUserData(data) {
      this.userData = data;
    },
    setUserSettings(settings) {
      this.userSettings = settings;
    },
    clearData() {
      this.userData = {};
      this.userSettings = {};
    },
    async checkAuth() {
      const res = await userApi.checkLoginState();
      if (res.success) {
        this.setUserData(res.data.message);
        return true;
      }
      delUserCookie();
      this.setUserData({});
      return false;
    },
    checkIsAdmin() {
      if (!this.userData.isAdmin) {
        return false;
      }
      return true;
    },
    setLoginWindowSignal(show) {
      if (show && !this.userData.email) {
        this.loginWindowSignal = show;
      } else if (!show) {
        this.loginWindowSignal = show;
      }
    },
    async updateUserData(data) {
      const res = await userApi.updateUserData(data);
      if (!res.success) {
        return errorMessage;
      }
      const successRes = await this.checkAuth();
      if (!successRes) {
        return errorMessage;
      }
      return '';
    },
    async updateUserPassword({ oldPassword, newPassword }) {
      const userData = {
        email: this.userData.email,
        password: oldPassword,
      };
      let res = await userApi.login(userData);
      if (!res.success) {
        return '舊密碼輸入不正確，請確認！';
      }
      res = await userApi.updatePassword(this.userData.id, { password: newPassword });
      if (!res.success) {
        return errorMessage;
      }
      return '';
    },
    async getUserSettings() {
      let res = await userApi.getUserSettings(this.userData.id);
      if (!res.success) {
        return errorMessage;
      }

      if (!res.data.message.length) {
        res = await this.initUserSettings();
        return res;
      }
      [this.userSettings] = res.data.message;
      return '';
    },
    async initUserSettings() {
      const data = {
        name: this.userData.name,
        phone: this.userData.phone,
      };
      let res = await userApi.initUserSettings(this.userData.id, data);
      if (!res.success) {
        return errorMessage;
      }
      res = await userApi.getUserSettings(this.userData.id);
      if (!res.success || !res.data.message.length) {
        return errorMessage;
      }
      [this.userSettings] = res.data.message;
      return '';
    },
    async updateUserSettings(data) {
      let res = await userApi.updateUserSettings(this.userSettings.id, data);
      if (!res.success) {
        return errorMessage;
      }
      res = await userApi.getUserSettings(this.userData.id);
      if (!res.success) {
        return errorMessage;
      }
      return '';
    },
    async getOrder(orderId) {
      const res = await userApi.getOrder(this.userData.id, orderId);
      return res;
    },
    async getOrderList() {
      const res = await userApi.getOrderList(this.userData.id);
      return res;
    },
  },
  getters: {
    hasLogin({ userData }) {
      return userData.email;
    },
  },
});
