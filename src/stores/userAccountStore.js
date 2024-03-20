import { defineStore } from 'pinia';
import { checkLoginState } from '@/api/userRequest';
import { delUserCookie } from '@/utils/cookie';

export default defineStore('userAccountStore', {
  state: () => ({
    userData: {},
  }),
  actions: {
    setUserData(data) {
      this.userData = data;
    },
    async checkAuth() {
      const res = await checkLoginState();
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
  },
  getters: {
    hasLogin({ userData }) {
      return userData.email;
    },
  },
});
