<script>
import { mapActions } from 'pinia';
import collectStore from '@/stores/collectStore';
import userStore from '@/stores/userAccountStore';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  mixins: [ToastMessage],
  methods: {
    ...mapActions(collectStore, ['getCollection']),
    ...mapActions(userStore, ['checkAuth', 'setLoginWindowSignal']),
  },
  async created() {
    this.isLoading = true;
    const isLogin = await this.checkAuth();
    if (this.$route.path.indexOf('/user/') > -1 && !isLogin) {
      this.toastShow('warning', '請先登入會員');
      this.setLoginWindowSignal(true);
      this.$router.replace({ name: 'products' });
      return;
    }
    await this.getCollection();
    if (this.init) {
      this.init();
    } else {
      this.isLoading = false;
    }
  },
};
</script>
