<script>
import { mapState, mapActions } from 'pinia';
import CartInfo from '@/components/user/CartInfo.vue';
import OrderList from '@/components/user/OrderList.vue';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      couponCode: '',
      initFinish: false,
      isLoading: false,
    };
  },
  emits: ['stepNum'],
  mixins: [CheckLogin],
  components: {
    CartInfo,
    OrderList,
  },
  computed: {
    ...mapState(cartStore, ['cartInfo', 'cartItemNum']),
    ...mapState(userAccountStore, ['userData']),
  },
  methods: {
    async init() {
      this.isLoading = true;
      await this.getCartInfo(this.userData.id);
      this.initFinish = true;
      this.isLoading = false;
    },
    ...mapActions(cartStore, ['getCartInfo']),
  },
  created() {
    this.$emit('stepNum', 1);
  },
};
</script>

<template>
  <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
  <div class="border-start border-primary border-3 bg-primary-subtle p-2 ps-3 mb-3
    d-flex align-items-center justify-content-between"  v-if="!cartInfo.list?.length">
    <h3 class="h5 my-2 me-3">購物車</h3>
  </div>
  <div class="row g-4 flex-column-reverse flex-lg-row justify-content-between">
    <template v-if="initFinish">
      <div class="col-lg-7 col-xl-6">
        <OrderList :cart-info="cartInfo" :isEdit="true"/>
      </div>
      <div class="col-lg-5" v-if="cartInfo.list?.length">
        <CartInfo :cart-info="cartInfo" :cart-item-num="cartItemNum" :isEdit="true"/>
      </div>
    </template>
  </div>
</template>
