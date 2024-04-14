<script>
import { mapState, mapActions } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import Swal from 'sweetalert2/dist/sweetalert2';
import CartInfo from '@/components/user/CartInfo.vue';
import OrderList from '@/components/user/OrderList.vue';
import SectionTitle from '@/components/user/SectionTitle.vue';
import cartStore from '@/stores/cartStore';
import productStore from '@/stores/productStore';
import localStorageStore from '@/stores/localStorageStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

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
  data() {
    return {
      couponCode: '',
      swiperModules: [Navigation],
      swiperBreakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      initFinish: false,
      isLoading: false,
    };
  },
  emits: ['stepNum'],
  mixins: [CheckLogin],
  components: {
    CartInfo,
    OrderList,
    SectionTitle,
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(cartStore, ['cartInfo', 'cartItemNum']),
    ...mapState(localStorageStore, ['record']),
  },
  methods: {
    async init() {
      this.isLoading = true;
      await this.getCartInfo();
      this.getRecord();
      this.initFinish = true;
      this.isLoading = false;
    },
    async confirmDeleteAll() {
      const userRes = await swalConfirmAlert.fire({
        title: '確定要清除瀏覽紀錄嗎?',
        text: '清除後將無法恢復',
      });
      if (!userRes.isConfirmed) {
        return;
      }
      this.clearRecord();
      if (!this.record.length) {
        this.toastShow('success', '已清除瀏覽紀錄！');
      } else {
        this.toastShow('error', this.$errorMessage);
      }
    },
    ...mapActions(cartStore, ['getCartInfo']),
    ...mapActions(localStorageStore, ['getRecord', 'clearRecord']),
    ...mapActions(productStore, ['setProductData']),
  },
  async created() {
    this.$emit('stepNum', 1);
  },
};
</script>

<template>
  <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
  <SectionTitle :title="'購物車'" v-if="!cartInfo.list?.length"/>
  <div class="row g-4 flex-column-reverse flex-lg-row justify-content-between">
    <template v-if="initFinish">
      <div class="col-lg-7 col-xl-6">
        <OrderList :cart-info="cartInfo" :isEdit="true"/>
      </div>
      <div class="col-lg-5" v-if="cartInfo.list?.length">
        <CartInfo :cart-info="cartInfo" :cart-item-num="cartItemNum" :isEdit="true"/>
      </div>
    </template>
    <div style="margin-top: 200px;" v-if="record.length">
      <div class="pb-3 mb-3 border-bottom d-flex justify-content-between">
        <h4 class="h5 mb-0">瀏覽紀錄</h4>
        <a href="#" @click.prevent="confirmDeleteAll"
          class="link-gray-dark link-offset-3 link-underline-gray link-underline-opacity-50">
          清除瀏覽紀錄
        </a>
      </div>

      <swiper
        :slidesPerView="1"
        :spaceBetween="30"
        :breakpoints="swiperBreakpoints"
        :navigation="true"
        :modules="swiperModules"
        v-if="record.length"
      >
        <swiper-slide v-for="data in record" :key="data.id">
          <div class="card border-0 shadow-sm">
            <img :src="data.imageUrl" :alt="data.title">
            <a href="#" class="stretched-link"
              @click.prevent="setProductData(data)">
            </a>
            <p class="position-absolute bottom-0 m-2 px-3 py-1
              bg-black bg-opacity-50 text-white">{{ data.title }}</p>
            <div class="position-absolute top-0 left-0 w-100 h-100
              bg-dark bg-opacity-50 text-white
              d-flex justify-content-center align-items-center imageMask">
              <div class="text-center">
                <p><i class="bi bi-search display-4"></i></p>
                <p>瀏覽產品</p>
              </div>
              </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.imageMask{
  opacity: 0;
  transition: all 0.5s;
}
.card:hover .imageMask{
  opacity: 1;
}
</style>
