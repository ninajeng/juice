<script>
import { mapState, mapActions } from 'pinia';
import CartList from '@/components/user/CartList.vue';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      couponCode: '',
      steps: [
        {
          icon: 'bi-1-square',
          info: '確認訂單',
        },
        {
          icon: 'bi-2-square',
          info: '填寫資料',
        },
        {
          icon: 'bi-3-square',
          info: '完成訂購',
        },
      ],
      stepNum: 1,
      isLoading: false,
    };
  },
  mixins: [CheckLogin],
  components: {
    CartList,
  },
  computed: {
    ...mapState(cartStore, ['cartInfo', 'cartItemNum']),
    ...mapState(userAccountStore, ['userData']),
  },
  methods: {
    init() {
      this.getCartInfo();
    },
    setCoupon() {
      this.getCoupon(this.userData.id, this.couponCode);
    },
    ...mapActions(cartStore, ['getCartInfo', 'getCoupon']),
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <div class="position-relative">
    <img src="https://images.unsplash.com/photo-1524222717473-730000096953?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="購物車結帳背景圖"
      style="height: 300px; width: 100%; object-fit: cover; object-position: bottom center;">
    <!-- <h4 class="position-absolute top-50 start-50 translate-middle
      display-3 text-gray-dark"
      style="backdrop-filter: blur(10px)">購物車結帳</h4> -->
  </div>
  <div class="container py-5">
    <h2 class="h5">結帳</h2>
    <div class="d-flex flex-wrap text-nowrap mb-5">
      <p class="p-2 mb-1 flex-fill text-center stepLabel" :class="{'stepActive': stepNum > key}"
        v-for="(step, key) in steps" :key="'step' + key">
        <i class="bi me-1" :class="step.icon"></i>{{ step.info }}
      </p>
    </div>

    <div class="row g-4 flex-column-reverse flex-lg-row justify-content-between">
      <div class="col-lg-7 col-xl-6">
        <CartList :cart-info="cartInfo"/>
      </div>
      <div class="col-lg-5" v-if="cartInfo.list?.length">
        <div class="card border-primary p-3 mb-5">
          <h3 class="mb-0 h5">訂單明細</h3>
          <hr>
          <div class="d-flex justify-content-between">
            <p>{{ `商品共 ${cartItemNum} 件` }}</p>
            <p>{{ `NT$ ${cartInfo.price}` }}</p>
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control border-primary"
              placeholder="輸入優惠碼" v-model.trim="couponCode">
            <button class="btn btn-outline-primary" type="button"
              :disabled="!couponCode" @click="setCoupon">套用優惠券</button>
          </div>
          <template v-if="cartInfo.coupon?.code">
            <p>已套用的優惠券：</p>
            <div class="d-flex justify-content-between">
              <p class="mb-0">{{ `${cartInfo.coupon.code} ${cartInfo.coupon.name}
                ${cartInfo.coupon.discount * 100 % 10 === 0 ?
                  cartInfo.coupon.discount * 10 : cartInfo.coupon.discount * 100 } 折` }}</p>
              <p class="mb-0">
                {{ `-${$filters.currency(cartInfo.price - cartInfo.totalPrice)}` }}
              </p>
            </div>
          </template>
          <hr>
          <div class="d-flex justify-content-between">
            <p>總金額</p>
            <p class="fw-bolder">{{ `NT$ ${cartInfo.totalPrice}` }}</p>
          </div>
          <button type="button" class="btn btn-primary">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.stepLabel{
  position: relative;
  margin-right: 1.5rem;
  background-color: var(--bs-secondary-bg-subtle);
}
.stepLabel::after{
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(100%, 0%);
  border: 1.25rem solid;
  border-color: transparent transparent transparent var(--bs-secondary-bg-subtle);
  aspect-ratio: 1;
  height: 100%;
}
.stepActive{
  &.stepLabel{
    background-color: var(--bs-secondary);
    color: white;
  }
  &.stepLabel::after{
    border-color: transparent transparent transparent var(--bs-secondary);
  }
}
@media(max-width: 310px){
  .stepLabel {
    width: 100%;
  }
}
</style>
