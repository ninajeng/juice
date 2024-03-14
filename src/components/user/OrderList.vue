<script>
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2/dist/sweetalert2';
import ProductModal from '@/components/user/ProductModal.vue';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import ToastMessage from '@/mixins/ToastMessage.vue';
import productStore from '@/stores/productStore';

const swalDeleteAlert = Swal.mixin({
  icon: 'warning',
  confirmButtonText: '刪除',
  showCancelButton: true,
  cancelButtonText: '取消',
  customClass: {
    confirmButton: 'btn btn-danger m-1',
    cancelButton: 'btn m-1',
  },
  buttonsStyling: false,
});

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  props: ['cartInfo', 'isEdit'],
  mixins: [ToastMessage],
  components: {
    ProductModal,
  },
  computed: {
    ...mapState(userAccountStore, ['userData']),
  },
  methods: {
    addItem(cartItem) {
      this.setProductData(cartItem.product);
    },
    async confirmDeleteItem(item) {
      const userRes = await swalDeleteAlert.fire({
        title: `確定要移除 "${item.product.title}" 嗎?`,
        text: '移除後將無法恢復',
      });
      if (!userRes.isConfirmed) {
        return;
      }
      this.isLoading = true;
      const resError = await this.removeItem(this.userData.id, item.cartId);
      this.isLoading = false;
      if (!resError) {
        this.toastShow('success', '已更新購物車！');
      } else {
        this.toastShow('error', this.$errorMessage);
      }
    },
    async confirmDeleteAll() {
      const userRes = await swalDeleteAlert.fire({
        title: '確定要清空購物車嗎?',
        text: '清空後將無法恢復',
      });
      if (!userRes.isConfirmed) {
        return;
      }
      this.isLoading = true;
      const resError = await this.removeAll(this.userData.id);
      this.isLoading = false;
      if (!resError) {
        this.toastShow('success', '已清空購物車！');
      } else {
        this.toastShow('error', this.$errorMessage);
      }
    },
    async setQuantity(cartId, qty) {
      this.isLoading = true;
      const resError = await this.setItemQty(this.userData.id, cartId, qty);
      this.isLoading = false;
      if (!resError) {
        this.toastShow('success', '已更新購物車！');
      } else {
        this.toastShow('error', this.$errorMessage);
      }
    },
    ...mapActions(cartStore, ['removeItem', 'removeAll', 'setItemQty']),
    ...mapActions(productStore, ['setProductData']),
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <ProductModal/>
  <div class="d-flex justify-content-between align-items-end mb-3">
    <h3 class="mb-0 h5">購物清單</h3>
    <a href="#" @click.prevent="confirmDeleteAll"
      class="link-gray-dark link-offset-2" v-if="cartInfo.list?.length && isEdit">
      移除所有品項
    </a>
  </div>
  <div v-if="cartInfo.list?.length">
    <div class="mb-2 d-flex flex-column flex-sm-row align-items-center cartList"
      v-for="cartItem in cartInfo.list" :key="cartItem.id">
      <div class="mx-1 w-100 text-end d-sm-none">
        <button type="button"
          class="btn" title="移除品項"
          @click.prevent="confirmDeleteItem(cartItem)"
          v-if="isEdit">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="position-relative">
        <img :src="cartItem.product.imageUrl"
          :alt="cartItem.product.title"
          style="height: 180px; width: 250px; object-fit: cover;">
        <a href="#" class="stretched-link" @click.prevent="addItem(cartItem)" v-if="isEdit">
          <span class="position-absolute bottom-0 end-0 me-2 mb-1 link-dark">
            <i class="bi bi-plus-square-fill"></i>
          </span>
        </a>
      </div>
      <div class="px-4 py-3 py-lg-0 flex-fill text-center text-sm-start d-flex flex-column"
        style="min-height: 180px;">
        <div class="position-relative" v-if="cartItem.product.type === 'drink'">
          <p class="mb-1">
            {{ `${cartItem.product.title} (${cartItem.userCustom.size})` }}
          </p>
          <p class="mb-2 d-inline-block">
            <span class="productBadge secondaryOutlineBadge me-2 mb-1 fw-normal fs-6">
              {{ cartItem.userCustom.ice || '冷熱固定' }}
            </span>
            <span class="productBadge secondaryOutlineBadge me-2 mb-1 fw-normal fs-6">
              {{ cartItem.userCustom.sugar || '甜度固定' }}
            </span>
          </p>
          <p class="mb-2 d-inline-block d-lg-inline text-nowrap">
            <span class="productBadge secondaryOutlineBadge me-2 mb-1 fw-normal fs-6"
              v-for="(extra, key) in cartItem.userCustom.extras" :key="'extras' + key">
              {{ extra }}
            </span>
            <a href="#" class="link-secondary stretched-link" title="編輯品項"
              @click.prevent="setProductData(cartItem)" v-if="isEdit">
              <i class="bi bi-pencil"></i>
            </a>
          </p>
        </div>
        <div v-else-if="cartItem.product.type === 'fruit'">
          <p class="mb-2">
            {{ cartItem.product.title }}
          </p>
        </div>
        <p class="mt-0 mt-sm-auto mb-1">
          <span v-if="cartItem.originPrice === cartItem.price">
            {{ `單價 ${$filters.currency(cartItem.price)} 元` }}
          </span>
          <span class="text-danger" v-else>
            {{ `單價 ${$filters.currency(cartItem.price)} 元` }}
            <del class="ms-1 text-muted">
              {{ `${$filters.currency(cartItem.originPrice)}` }}
            </del>
          </span>
          <span class="text-muted fs-7">{{ ` / ${cartItem.product.unit}` }}</span>
        </p>
        <div class="row g-2 g-sm-3
          align-items-center justify-content-center justify-content-sm-start" v-if="isEdit">
          <div class="col-auto">
            <label :for="'itemQty' + cartItem.cartId" class="text-nowrap">數量</label>
          </div>
          <div class="col-auto" style="min-width: 120px;">
            <select class="form-select" :id="'itemQty' + cartItem.cartId"
              :value="cartItem.qty"
              @change="setQuantity(cartItem.cartId, Number($event.target.value))">
              <option v-for="i in 10" :key="'cartItemQty' + i">{{ i }}</option>
            </select>
          </div>
        </div>
        <div v-else>{{ `數量 ${cartItem.qty}` }}</div>
      </div>
      <div class="mx-2 my-1 my-lg-0 align-self-start d-none d-sm-block">
        <a href="#" title="移除品項"
          class="link-gray"
          @click.prevent="confirmDeleteItem(cartItem)"
          v-if="isEdit">
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
    </div>
  </div>
  <div v-else>
    <p>尚無品項</p>
    <router-link to="/products" class="btn btn-primary">
      瀏覽菜單<i class="bi bi-caret-right-fill"></i>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.stretched-link:hover{
  .bi-pencil::before {
    content: "\f4c9";
  }
  .bi-plus-square-fill{
    opacity: 0.75;
  }
}
.cartList{
  border: 1px solid var(--bs-border-color);
}
@media (min-width: 992px){
  .cartList{
    padding-bottom: 0.5rem;
    border: 0px;
    border-bottom: 1px solid var(--bs-border-color);
  }
  .cartList:nth-child(1){
    padding-top: 0.5rem;
    border-top: 1px solid var(--bs-border-color);
  }
}
</style>
