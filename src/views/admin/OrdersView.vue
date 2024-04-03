<script>
import { mapActions } from 'pinia';
import CheckAccount from '@/mixins/admin/CheckAccount.vue';
import DeleteAlertWindow from '@/mixins/admin/DeleteAlertWindow.vue';
import adminAccountStore from '@/stores/adminAccountStore';
import OrderModal from '@/components/admin/OrderModal.vue';

export default {
  data() {
    return {
      orderList: [],
      tempOrder: {},
      isInitLoading: true,
      isLoading: false,
    };
  },
  inject: ['alertWindow'],
  mixins: [CheckAccount, DeleteAlertWindow],
  components: {
    OrderModal,
  },
  methods: {
    init() {
      this.initLoading = true;
      this.getOrder();
    },
    async getOrder() {
      this.isLoading = true;
      const res = await this.$adminRequest.getOrders();
      if (res.success) {
        this.orderList = res.data.message;
        this.orderList.reverse();
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
    editOrder(order) {
      this.tempOrder = order;
      this.$refs.orderModal.show();
    },
    async updateOrder(order) {
      this.isLoading = true;
      const data = { ...order };
      data.isFinish = !data.isFinish;
      const res = await this.$adminRequest.updateOrder(data);
      if (res.success) {
        this.$refs.orderModal.hide();
        this.tempOrder = res.data.message;
        await this.getOrder();
        this.isLoading = false;
        this.alertWindow.show({ type: 'Success', title: '已更新訂單狀態' });
      } else {
        this.isLoading = false;
        this.alertWindow.show({ type: 'Error', title: this.$errorMessage });
      }
    },
    async deleteOrder(id) {
      this.isLoading = true;
      const res = await this.$adminRequest.deleteOrder(id);
      if (res.success) {
        this.alertWindow.show({ type: 'Success', title: '已刪除訂單' });
        this.getOrder();
      } else {
        this.isLoading = false;
        this.alertWindow.show({ type: 'Error', title: this.$errorMessage });
      }
    },
    ...mapActions(adminAccountStore, ['checkAccountState']),
  },
};
</script>

<template>
  <loading-view :active="isLoading && !isInitLoading"/>
  <order-modal
    :temp-order="tempOrder"
    @update-order="updateOrder"
    ref="orderModal"
  />
  <div class="container-fluid px-5 pb-3 position-relative d-flex flex-column h-100">
    <loading-view :active="isInitLoading" :is-full-page="false"/>
    <div class="pt-4 pb-2 sticky-top w-100 bg-white z-4">
      <h2 class="mb-0 me-2 opacity-75">訂單管理</h2>
    </div>
    <div class="text-nowrap overflow-x-auto mt-2 border border-primary-subtle"
      style="min-height: 200px;">
      <table class="table table-hover align-middle text-nowrap mb-0" v-if="orderList.length">
        <thead class="shadow-sm sticky-top z-3">
          <tr class="align-middle">
            <th class="py-3 ps-3">訂購日期</th>
            <th>訂購人姓名</th>
            <th>取貨方式</th>
            <th>付款方式</th>
            <th>訂單狀態</th>
            <th width="70"></th>
            <th width="70"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="position-relative" v-for="order in orderList" :key="order.id">
            <td class="ps-3">{{ $filters.unixToDateTime(order.createTime) }}</td>
            <td>{{ order.contact.name }}</td>
            <td>{{ order.contact.delivery }}</td>
            <td>{{ order.contact.payment }}</td>
            <td>
              <p class="mb-0" v-if="order.isFinish">已完成</p>
              <p class="mb-0 text-danger" v-else>未完成</p>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-outline-primary stretched-link"
                @click="editOrder(order)"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </td>
            <td class="text-end">
              <button
                type="button"
                class="btn btn-outline-gray-dark me-2 position-relative z-2"
                @click="deleteConfirm('Order', '訂單', {...order, title: order.id})">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="m-3 text-muted" v-if="!orderList.length && !isInitLoading">尚無訂單</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
tbody tr:nth-last-child(1){
  border-color: transparent;
}
</style>
