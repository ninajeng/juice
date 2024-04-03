<script>
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2/dist/sweetalert2';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import SetCustomOption from '@/mixins/user/SetCustomOption.vue';
import ToastMessage from '@/mixins/ToastMessage.vue';

const swalConfirmAlert = Swal.mixin({
  icon: 'warning',
  confirmButtonText: '確定',
  showCancelButton: true,
  cancelButtonText: '取消',
  customClass: {
    confirmButton: 'btn btn-primary m-1',
    cancelButton: 'btn m-1',
    title: 'lh-base',
  },
  buttonsStyling: false,
});

export default {
  mixins: [SetCustomOption, ToastMessage],
  computed: {
    ...mapState(userAccountStore, ['hasLogin', 'userData']),
  },
  methods: {
    async addItemToCart() {
      this.isLoading = true;
      if (!this.hasLogin) {
        this.setLoginWindowSignal(true);
        this.isLoading = false;
        return;
      }
      const data = this.setCustomOption(this.productData);
      const cartId = data.product.cartId || new Date().getTime();
      const resError = await this.addToCart(this.userData.id, {
        ...data, qty: this.qty, cartId,
      }, this.isUpdate);
      if (!resError) {
        if (this.productModal) {
          this.hide();
        }
        this.toastShow('success', `已${this.isUpdate ? '更新' : '加入'}購物車！`);
      } else if (resError.isNotUpdate) {
        const tempData = { ...this.productData };
        delete tempData.cartId;
        if (this.productModal) {
          this.hide();
        }
        const userRes = await swalConfirmAlert.fire({
          title: '購物車目前無該品項\n是否要新增至購物車?',
        });
        if (userRes.isConfirmed) {
          this.isUpdate = false;
          this.productData = tempData;
          this.addItemToCart();
          return;
        }
      } else if (resError !== '未登入') {
        this.toastShow('error', resError);
      }
      this.isLoading = false;
    },
    setConfirmResult(result) {
      if (result) {
        this.isUpdate = false;
        this.addItemToCart();
      }
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal']),
  },
};
</script>
