<script>
import { mapActions } from 'pinia';
import CheckAccount from '@/mixins/admin/CheckAccount.vue';
import DeleteAlertWindow from '@/mixins/admin/DeleteAlertWindow.vue';
import adminAccountStore from '@/stores/adminAccountStore';
import CouponModal from '@/components/admin/CouponModal.vue';

export default {
  data() {
    return {
      couponList: [],
      tempCoupon: {},
      couponStatus: {},
      isInitLoading: true,
      isLoading: false,
    };
  },
  inject: ['alertWindow'],
  mixins: [CheckAccount, DeleteAlertWindow],
  components: {
    CouponModal,
  },
  methods: {
    init() {
      this.getCoupon();
    },
    async getCoupon() {
      this.isLoading = true;
      const res = await this.$adminRequest.getCoupons();
      if (res.success) {
        this.couponList = res.data.message;
        this.isInitLoading = false;
        this.isLoading = false;
      } else {
        this.isInitLoading = false;
        this.isLoading = false;
        this.$cookie.delAdminCookie();
        this.alertWindow.show({
          type: 'Error',
          title: this.$errorMessage,
          router: {
            method: 'replace',
            path: 'adminLogin',
          },
        });
      }
    },
    editCoupon(coupon) {
      this.tempCoupon = coupon;
      this.$refs.couponModal.show();
    },
    async updateCoupon(coupon) {
      this.isLoading = true;
      const res = await this.$adminRequest.updateCoupon(coupon);
      if (res.success) {
        this.$refs.couponModal.hide();
        this.isLoading = false;
        this.alertWindow.show({ type: 'Success', title: `已${coupon.id ? '更新' : '新增'}優惠券` });
        this.getCoupon();
      } else {
        this.isLoading = false;
        this.alertWindow.show({ type: 'Error', title: this.$errorMessage });
      }
    },
    async deleteCoupon(id) {
      this.isLoading = true;
      const res = await this.$adminRequest.deleteCoupon(id);
      if (res.success) {
        this.alertWindow.show({ type: 'Success', title: '已更新優惠券' });
        this.getCoupon();
      } else {
        this.isLoading = false;
        this.alertWindow.show({ type: 'Error', title: this.$errorMessage });
      }
    },
    checkStatus(coupon) {
      return new Date(coupon.dueDate).getTime() >= Date.now() && coupon.isEnabled;
    },
    ...mapActions(adminAccountStore, ['checkAccountState']),
  },
};
</script>

<template>
  <loading-view :active="isLoading && !isInitLoading"/>
  <coupon-modal
    :temp-coupon="tempCoupon"
    @update-coupon="updateCoupon"
    ref="couponModal"
  />
  <div class="container-fluid px-5 position-relative d-flex flex-column h-100">
    <loading-view :active="isInitLoading" :is-full-page="false"/>
    <div class="d-flex pt-4 pb-2
        align-items-center flex-wrap
        sticky-top w-100 bg-white"
        style="z-index: 900;">
      <h2 class="mb-0 me-2 opacity-75">優惠券管理</h2>
      <a href="#" class="link-primary fs-4"
        @click.prevent="editCoupon({})" title="建立優惠券">
        <i class="bi bi-plus-square-fill"></i>
      </a>
    </div>
    <div class="align-self-start overflow-x-auto mt-2 border p-3 mb-3"
      :class="{'w-100': !couponList.length }" style="min-height: 150px">
      <div class="row g-3" v-if="couponList.length">
        <div class="col-auto" v-for="coupon in couponList" :key="coupon.id">
          <div class="card shadow-sm">
            <div class="text-center p-3"
              :class="checkStatus(coupon) ? '' : 'opacity-50'">
              <h5 class="mb-1">
                <span class="mark">
                  {{ `${coupon.name}
                  ${coupon.discount % 10 === 0 ? coupon.discount / 10 : coupon.discount} 折` }}
                </span>
              </h5>
              <p class="mb-0">
                {{ coupon.code }}
              </p>
            </div>
            <div class="p-3 border-top">
              <p class="mb-2">
                <span class="text-danger" v-if="!coupon.isEnabled">
                  <i class="bi bi-exclamation-triangle me-1"></i>未啟用</span>
                <span v-else>
                  <i class="bi bi-check-square me-1"></i>啟用
                </span>
              </p>
              <p class="mb-2">
                <span class="text-danger" v-if="new Date(coupon.dueDate).getTime() < Date.now()">
                  <i class="bi bi-exclamation-triangle me-1"></i>已過期</span>
                <span v-else>
                  <i class="bi bi-check-square me-1"></i>尚未過期
                </span>
              </p>
              <p class="mb-0">
                {{ `${$filters.unixToDateTime(coupon.dueDate)} 截止` }}
                <span class="fs-7"></span>
              </p>
            </div>
            <div class="d-flex border-top">
              <button
                type="button"
                class="btn btn-outline-gray-dark border-0 border-end w-100 z-2"
                @click="deleteConfirm('Coupon', '優惠券', coupon)">
                <i class="bi bi-trash3"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary border-0 w-100 stretched-link"
                @click="editCoupon(coupon)">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
            <div class="d-flex">
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted" v-if="!couponList.length && !isInitLoading">尚未建立優惠券</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mark{
  background-image: linear-gradient(white 60%, lighten(#86b2c2, 20%) 40%);
  padding: 0rem 0.25rem;
  color: inherit;
}
.card{
  transition: transform 0.5s;
}
.card:hover{
  transform: translateY(-3px);
}
</style>
