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
        this.isLoading = false;
      } else {
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
  <loading-view :active="isLoading"/>
  <coupon-modal
    :temp-coupon="tempCoupon"
    @update-coupon="updateCoupon"
    ref="couponModal"
  />
  <div class="container p-5 pt-0 position-relative">
    <div class="d-flex pt-5 pb-2
        align-items-center flex-wrap
        position-fixed w-100 bg-white"
        style="z-index: 2;">
      <h2 class="mb-0 me-2 opacity-75">優惠券管理</h2>
      <a href="#" class="link-primary fs-4"
        @click.prevent="editCoupon({})" title="建立優惠券">
        <i class="bi bi-plus-square-fill"></i>
      </a>
    </div>
    <div class="text-nowrap overflow-x-auto" style="margin-top: 100px;">
      <table class="table table-hover align-middle text-nowrap">
        <thead class="border-dark">
          <tr>
            <th>優惠券代碼</th>
            <th>優惠券名稱</th>
            <th class="text-end pe-5">折扣內容</th>
            <th>優惠截止時間</th>
            <th>優惠券狀態</th>
            <th width="70"></th>
            <th width="70"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in couponList" :key="coupon.id">
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.name }}</td>
            <td class="text-end pe-5">
              {{ `${coupon.discount % 10 === 0 ? coupon.discount / 10 : coupon.discount} 折` }}
              </td>
            <td>{{ $filters.unixToDateTime(coupon.dueDate) }}</td>
            <td :class="checkStatus(coupon) ? 'text-success' : 'text-gray'">
              <i class="bi bi-check fw-bolder" v-if="checkStatus(coupon)"></i>
              <i class="bi bi-x" v-else></i>
              <span class="text-danger"
                v-if="new Date(coupon.dueDate).getTime() < Date.now()">已過期</span>
              <span v-else>尚未過期</span>,
              <span class="text-danger" v-if="!coupon.isEnabled">未啟用</span>
              <span v-else>啟用</span>
            </td>
            <td class="text-end">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="editCoupon(coupon)"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </td>
            <td class="text-end">
              <button
                  type="button"
                  class="btn btn-outline-gray-dark"
                  @click="deleteConfirm('Coupon', '優惠券', coupon)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
