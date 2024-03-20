<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      orderModal: null,
      order: {},
    };
  },
  props: ['tempOrder'],
  emits: ['updateOrder'],
  watch: {
    tempOrder(data) {
      this.order = { ...data };
    },
  },
  methods: {
    show() {
      this.orderModal.show();
    },
    hide() {
      this.orderModal.hide();
    },
    updateOrder() {
      this.$emit('updateOrder', this.order);
    },
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.modal, {
      backdrop: 'static',
    });
  },
};
</script>

<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-light p-2">
          <h2 class="modal-title flex-fill text-center fs-6 opacity-75">
            訂單資訊
          </h2>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>
        <div class="modal-body p-4" v-if="order.contact">
          <div class="border position-relative p-4 pb-0">
            <h5 class="position-absolute start-0 translate-middle-x mx-0 mb-0 bg-white py-2 fs-6"
            style="writing-mode: vertical-lr; letter-spacing: 0.3rem; margin-top: 0.3rem;">
              <span class="opacity-75">訂購人資訊</span>
            </h5>
            <div class="row">
              <div class="col-4">
                <p>訂單狀態</p>
              </div>
              <div class="col-8">
                <p class="mb-2">
                  {{ order.isFinish ? '已完成' : '未完成' }}
                  <span>
                    <button type="button"
                      class="btn btn-sm btn-outline-secondary ms-2"
                      @click="updateOrder">變更狀態</button>
                  </span>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <p>訂購日期</p>
              </div>
              <div class="col-8">
                <p>{{ $filters.unixToDateTime(order.createTime) }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <p>訂購人姓名</p>
              </div>
              <div class="col-8">
                <p>{{ order.contact.name }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <p>取貨方式</p>
              </div>
              <div class="col-8">
                <p>{{ order.contact.delivery }}</p>
              </div>
            </div>
            <div class="row" v-if="order.contact.address">
              <div class="col-4">
                <p>外送地址</p>
              </div>
              <div class="col-8">
                <p>{{ order.contact.address }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <p>付款方式</p>
              </div>
              <div class="col-8">
                <p>{{ order.contact.payment }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <p>訂單備註</p>
              </div>
              <div class="col-8">
                <p>{{ order.contact.message || '無' }}</p>
              </div>
            </div>
          </div>
          <div class="border border-top-0 position-relative p-4">
            <h5 class="position-absolute start-0 translate-middle-x mx-0 mb-0 bg-white py-2 fs-6"
            style="writing-mode: vertical-lr; letter-spacing: 0.3rem; margin-top: 0.3rem;">
              <span class="opacity-75">明細</span>
            </h5>
            <table class="table table-hover align-middle text-nowrap">
              <thead>
                <tr>
                  <th class="fw-normal text-muted">件數</th>
                  <th class="fw-normal text-muted">優惠券</th>
                  <th class="fw-normal text-muted text-end">原價</th>
                  <th class="fw-normal text-muted text-end">折扣</th>
                  <th class="fw-normal text-muted text-end">總金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ `共 ${order.cartInfo.list.length} 件` }}</td>
                  <td class="text">
                    <template v-if="order.cartInfo.coupon">
                      {{ `${order.cartInfo.coupon.name} ${
                          order.cartInfo.coupon.discount % 10 === 0 ?
                          order.cartInfo.coupon.discount / 10 :
                          order.cartInfo.coupon.discount}折` }}
                    </template>
                    <template v-else>
                      無
                    </template>
                  </td>
                  <td class="text-end">{{ $filters.currency(order.cartInfo.price) }}</td>
                  <td class="text-end">
                    <template v-if="order.cartInfo.coupon">
                      {{ `${$filters.currency(order.cartInfo.totalPrice - order.cartInfo.price)}` }}
                    </template>
                    <template v-else>
                      -0
                    </template>
                  </td>
                  <td class="text-end">
                    {{ `NT$ ${$filters.currency(order.cartInfo.totalPrice)}` }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="border border-top-0 position-relative p-4">
            <h5 class="position-absolute start-0 translate-middle-x mx-0 mb-0 bg-white py-2 fs-6"
            style="writing-mode: vertical-lr; letter-spacing: 0.3rem; margin-top: 0.3rem;">
              <span class="opacity-75">品項</span>
            </h5>
            <table class="table table-hover align-middle text-nowrap">
              <thead>
                <tr>
                  <th class="fw-normal text-muted">品項</th>
                  <th class="fw-normal text-muted text-end">數量</th>
                  <th class="fw-normal text-muted text-end pe-5">單價</th>
                  <th class="fw-normal text-muted">客製化選項</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="orderItem in order.cartInfo.list" :key="orderItem.cartId">
                  <td>{{ orderItem.product.title }}</td>
                  <td class="text-end">{{ orderItem.qty }}</td>
                  <td class="text-end pe-5">{{ orderItem.price }}</td>
                  <td>
                    <p class="mb-0" v-if="Object.keys(orderItem.userCustom).length">
                      {{ `${orderItem.userCustom.size},
                       ${orderItem.userCustom.sugar}, ${orderItem.userCustom.ice}` }}
                       <span v-if="orderItem.userCustom.extras.length">
                        {{ `, ${orderItem.userCustom.extras.join(', ')}` }}
                      </span>
                    </p>
                    <p class="mb-0" v-else>無</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-end mt-4">
            <button type="button" class="btn text-muted" @click="hide">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
