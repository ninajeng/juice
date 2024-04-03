<script>
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2/dist/sweetalert2';
import collectStore from '@/stores/collectStore';
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
    collectedProduct() {
      let info = null;
      if (!this.collectInfo.list) {
        return info;
      }
      for (let i = 0; i < this.collectInfo.list.length; i += 1) {
        const data = this.collectInfo.list[i];
        if (data.product.id === this.productData.id) {
          if (JSON.stringify(this.userCustom) === JSON.stringify(data.userCustom)) {
            info = { ...this.collectInfo.list[i] };
            break;
          }
        }
      }
      return info;
    },
    isOriginSettings() {
      return JSON.stringify(this.userCustom) === JSON.stringify(this.productData.userCustom);
    },
    ...mapState(collectStore, ['collectInfo']),
    ...mapState(userAccountStore, ['hasLogin']),
  },
  methods: {
    checkUserAuth() {
      if (!this.hasLogin) {
        this.setLoginWindowSignal(true);
        return false;
      }
      return true;
    },
    setCollection() {
      if (!this.collectedProduct) {
        this.addItemToCollection();
      } else {
        this.removeItemToCollection(this.collectedProduct.collectionId);
      }
    },
    setLoading(value) {
      if (!this.isEditCollection) {
        this.isCollectLoading = value;
      } else {
        this.isLoading = value;
      }
    },
    async addItemToCollection() {
      if (!this.checkUserAuth()) {
        return;
      }
      this.setLoading(true);
      const data = this.setCustomOption(this.productData);
      const collectionId = new Date().getTime();
      const resError = await this.addToCollection({ ...data, collectionId });
      if (!resError) {
        this.toastShow('success', '已加入收藏！');
      } else {
        this.toastShow('error', resError);
      }
      this.setLoading(false);
    },
    async editCollection() {
      if (!this.checkUserAuth()) {
        return;
      }
      this.setLoading(true);
      const data = this.setCustomOption(this.productData);
      const { collectionId } = this.productData;
      const resError = await this.editCollectedItem({ ...data, collectionId });
      if (!resError) {
        this.toastShow('success', '已更新收藏！');
        if (this.hide) {
          this.hide();
        }
      } else {
        this.toastShow('error', resError);
      }
      this.setLoading(false);
    },
    async removeItemToCollection() {
      if (!this.checkUserAuth()) {
        return;
      }

      const { product, userCustom } = this.collectedProduct;
      let productInfo = `${product.title}`;
      if (userCustom.size) {
        productInfo += `(${userCustom.size})`;
      }
      if (userCustom.sugar) {
        productInfo += `, ${userCustom.sugar}`;
      }
      if (userCustom.ice) {
        productInfo += `, ${userCustom.ice}`;
      }
      if (userCustom.extras?.length) {
        productInfo += `, ${userCustom.extras.join(' ,')}`;
      }
      const userRes = await swalConfirmAlert.fire({
        title: '確定要移除收藏嗎?',
        text: productInfo,
      });
      if (!userRes.isConfirmed) {
        return;
      }

      this.setLoading(true);
      const resError = await this.removeItem(this.collectedProduct.collectionId);
      if (!resError) {
        this.toastShow('success', '已移除收藏！');
      } else {
        this.toastShow('error', resError);
      }
      this.setLoading(false);
    },
    async removeAllCollection() {
      if (!this.checkUserAuth()) {
        return;
      }
      const userRes = await swalConfirmAlert.fire({
        title: '確定要移除所有收藏嗎?',
        text: '移除後將無法恢復',
      });
      if (!userRes.isConfirmed) {
        return;
      }
      this.setLoading(true);

      const resError = await this.removeAll();
      if (!resError) {
        this.toastShow('success', '已移除收藏！');
      } else {
        this.toastShow('error', resError);
      }
      this.setLoading(false);
    },
    setConfirmResult(result) {
      if (result) {
        this.isUpdate = false;
        this.addItemToCart();
      }
    },
    ...mapActions(userAccountStore, ['setLoginWindowSignal']),
    ...mapActions(collectStore, ['getCollection', 'addToCollection', 'editCollectedItem', 'removeItem', 'removeAll']),
  },
};
</script>
