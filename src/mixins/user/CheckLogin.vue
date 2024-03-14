<script>
import { mapActions } from 'pinia';
import userStore from '@/stores/userAccountStore';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  mixins: [ToastMessage],
  methods: {
    ...mapActions(userStore, ['checkAuth', 'setLoginWindowSignal']),
  },
  async created() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
    const isLogin = await this.checkAuth();
    if (this.$route.path.indexOf('/user/') > -1 && !isLogin) {
      this.toastShow('error', '請先登入會員');
      this.setLoginWindowSignal(true);
      this.$router.replace({ name: 'products' });
      return;
    }
    if (this.init) {
      this.init();
    }
  },
};
</script>
