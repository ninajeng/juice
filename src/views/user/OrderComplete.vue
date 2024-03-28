<script>
import { mapState, mapActions } from 'pinia';
import CartInfo from '@/components/user/CartInfo.vue';
import OrderList from '@/components/user/OrderList.vue';
import userAccountStore from '@/stores/userAccountStore';
import cartStore from '@/stores/cartStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      orderInfo: {},
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
  },
  methods: {
    async init() {
      this.isLoading = true;
      const res = await this.getOrder(this.$route.params.id);
      if (!res.success) {
        this.toastShow('error', this.$errorMessage);
        this.$router.replace({ name: 'cart' });
      } else if (!res.data.message.length) {
        this.$router.replace({ name: 'cart' });
      } else {
        [this.orderInfo] = res.data.message;
      }
      this.isLoading = false;
    },
    ...mapActions(userAccountStore, ['getOrder']),
  },
  created() {
    this.$emit('stepNum', 3);
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <div class="row g-4 flex-lg-row justify-content-between pt-2"
    v-if="orderInfo.cartInfo">
    <div class="col-lg-5 mb-3">
      <div class="alert alert-success mb-3
        border-3 border-top-0 border-bottom-0 border-end-0 d-flex">
        <i class="bi bi-check-square-fill me-2"></i>
        <div>
          <p class="mb-0">我們已收到您的訂單！</p>
          <p class="mb-0">餐點準備需10~15分鐘，如有問題歡迎來電詢問！</p>
        </div>
      </div>
      <div class="mt-4 mb-3 px-3 border-start border-primary border-3 text-break">
        <h3 class="mb-3 h5 me-4">訂購人資料</h3>
        <div class="d-flex">
          <p class="text-muted dataTitle">姓名</p>
          <p>{{ orderInfo.contact.name }}</p>
        </div>
        <div class="d-flex">
          <p class="text-muted dataTitle">手機</p>
          <p>{{ orderInfo.contact.phone }}</p>
        </div>
        <div class="d-flex">
          <p class="text-muted dataTitle">取貨方式</p>
          <p>{{ orderInfo.contact.delivery }}</p>
        </div>
        <div class="d-flex" v-if="orderInfo.contact.address">
          <p class="text-muted dataTitle">外送地址</p>
          <p>{{ orderInfo.contact.address }}</p>
        </div>
        <div class="d-flex">
          <p class="text-muted dataTitle">付款方式</p>
          <p>{{ orderInfo.contact.payment }}</p>
        </div>
        <div class="d-flex" v-if="orderInfo.contact.message">
          <p class="text-muted dataTitle">留言</p>
          <p class="mb-0">{{ orderInfo.contact.message }}</p>
        </div>
      </div>
      <router-link :to="{name: 'products'}"
        class="btn btn-primary my-3">
        查看菜單<i class="bi bi-caret-right-fill ms-1"></i>
      </router-link>
    </div>
    <div class="col-lg-6">
      <CartInfo :cart-info="orderInfo.cartInfo"
        :cart-item-num="orderInfo.cartInfo.cartItemNum" :isEdit="false"/>
      <OrderList :cart-info="orderInfo.cartInfo"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dataTitle{
  min-width: auto;
  margin-right: 0.5rem;
}
@media (min-width: 200px){
  .dataTitle{
    min-width: 110px;
  margin-right: 0rem;
  }
}
</style>
