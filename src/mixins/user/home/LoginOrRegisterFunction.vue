<script>
import { mapActions, mapState } from 'pinia';
import userAccountStore from '@/stores/userAccountStore';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  mixins: [ToastMessage],
  computed: {
    ...mapState(userAccountStore, ['hasLogin']),
  },
  methods: {
    login() {
      if (!this.hasLogin) {
        this.setLoginWindowSignal(true);
      } else {
        this.toastShow('success', '您已登入會員！');
      }
    },
    ...mapActions(userAccountStore, ['setLoginWindowSignal', 'clearData']),
  },
};
</script>
