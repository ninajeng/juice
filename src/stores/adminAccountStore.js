import { defineStore } from 'pinia';
import { checkAuth } from '@/api/adminRequest';

export default defineStore('adminAccountStore', {
  state: () => ({
    hasCheckedAuth: false,
  }),
  actions: {
    async checkAccountState(page) {
      const res = await checkAuth();
      if (res.success) {
        this.hasCheckedAuth = true;
        if (page.$route.name === 'adminLogin') {
          page.$router.replace('/admin/products');
        }
        return true;
      }
      this.hasCheckedAuth = false;
      if (page.$route.name !== 'adminLogin') {
        page.$router.replace({ name: 'adminLogin' });
      }
      return false;
    },
    setLogoutState() {
      this.hasCheckedAuth = false;
    },
  },
});
