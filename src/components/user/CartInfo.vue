<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  data() {
    return {
      couponCode: '',
      isLoading: false,
    };
  },
  props: ['cartInfo', 'cartItemNum', 'isEdit'],
  mixins: [ToastMessage],
  methods: {
    async setCoupon() {
      this.isLoading = true;
      const errorRes = await this.getCoupon(this.couponCode);
      if (errorRes) {
        this.toastShow('error', errorRes);
      } else {
        this.toastShow('success', '已套用優惠券');
      }
      this.couponCode = '';
      this.isLoading = false;
    },
    ...mapActions(cartStore, ['getCoupon']),
  },
};
</script>

<template>
  <div class="position-relative">
    <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
    <div class="card p-3 mb-5 pb-0" :class="{'border-primary': isEdit}">
      <h3 class="mb-0 h5">訂單明細</h3>
      <hr>
      <div class="d-flex justify-content-between">
        <p class="mb-0">{{ `商品共 ${cartItemNum} 件` }}</p>
        <p class="mb-0">{{ `NT$ ${$filters.currency(cartInfo.price)}` }}</p>
      </div>
      <div class="input-group mt-3" v-if="isEdit">
        <input type="text" class="form-control border-primary"
          placeholder="輸入優惠碼" v-model.trim="couponCode">
        <button class="btn btn-outline-primary" type="button"
          :disabled="!couponCode" @click="setCoupon">套用優惠券</button>
      </div>
      <template v-if="cartInfo.coupon?.code">
        <p class="mt-3">已套用的優惠券：</p>
        <div class="d-flex justify-content-between">
          <p class="mb-0">{{ `${cartInfo.coupon.code} ${cartInfo.coupon.name}
            ${cartInfo.coupon.discount % 10 === 0 ?
              cartInfo.coupon.discount / 10 : cartInfo.coupon.discount } 折` }}</p>
          <p class="mb-0">
            {{ `-${$filters.currency(cartInfo.price - cartInfo.totalPrice)}` }}
          </p>
        </div>
      </template>
      <hr>
      <div class="d-flex justify-content-between">
        <p>總金額</p>
        <p class="fw-bolder">{{ `NT$ ${$filters.currency(cartInfo.totalPrice)}` }}</p>
      </div>
      <router-link :to="{name: 'orderContact' }"
        class="btn btn-primary mb-3" v-if="isEdit">
        下一步<i class="bi bi-caret-right-fill ms-1"></i>
      </router-link>
    </div>
  </div>
</template>
