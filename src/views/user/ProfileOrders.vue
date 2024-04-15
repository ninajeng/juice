<script>
import { mapActions } from 'pinia';
import SectionTitle from '@/components/user/SectionTitle.vue';
import userAccountStore from '@/stores/userAccountStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      orderList: [],
      isLoading: false,
    };
  },
  mixins: [CheckLogin],
  components: {
    SectionTitle,
  },
  methods: {
    async init() {
      const res = await this.getOrderList();
      if (res.success) {
        this.orderList = res.data.message;
        this.orderList.reverse();
      } else {
        this.toastShow('error', this.$errorMessage);
      }
      this.isLoading = false;
    },
    ...mapActions(userAccountStore, ['getOrderList']),
  },
};
</script>

<template>
  <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
  <div class="container">
    <SectionTitle :title="'訂單紀錄'">
      <template #text>
        <p class="text-muted mb-1">每筆訂單紀錄保留 6 個月，如有疑問歡迎來電詢問！</p>
      </template>
    </SectionTitle>
    <div class="mt-4">
      <div v-if="!orderList.length">
        <template v-if="!isLoading">
          <p>尚無訂單紀錄</p>
          <router-link to="/products" class="btn btn-primary">
            瀏覽菜單<i class="bi bi-caret-right-fill"></i>
          </router-link>
        </template>
      </div>
      <div class="accordion" id="accordion" v-else>
        <div class="accordion-item" v-for="(order, key) in orderList" :key="order.id">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse" :data-bs-target="`#order${key}`">
              <span class="text-white fs-7 me-2">
                <span class="bg-gray py-1 px-2 text-nowrap" v-if="order.isFinish">已完成</span>
                <span class="bg-success py-1 px-2 text-nowrap" v-else>處理中</span>
              </span>
              <span>{{ $filters.unixToDateTime(order.createTime) }}</span>
            </button>
          </h2>
          <div :id="`order${key}`" class="accordion-collapse collapse" data-bs-parent="#accordion">
            <div class="accordion-body pb-0 text-break">
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">訂單狀態</p>
                </div>
                <div class="col-sm">
                  <p>
                    {{ order.isFinish ? '已完成' : '處理中' }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">訂購日期</p>
                </div>
                <div class="col-sm">
                  <p>{{ $filters.unixToDateTime(order.createTime) }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">訂購人姓名</p>
                </div>
                <div class="col-sm">
                  <p>{{ order.contact.name }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">訂購人電話</p>
                </div>
                <div class="col-sm">
                  <p>{{ order.contact.phone }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">取貨方式</p>
                </div>
                <div class="col-sm">
                  <p>{{ order.contact.delivery }}</p>
                </div>
              </div>
              <div class="row" v-if="order.contact.address">
                <div class="col-auto text-muted">
                  <p class="mb-0">外送地址</p>
                </div>
                <div class="col-sm">
                  <p>{{ order.contact.address }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">付款方式</p>
                </div>
                <div class="col-sm">
                  <p>{{ order.contact.payment }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">訂單備註</p>
                </div>
                <div class="col-sm">
                  <p class="mb-0">{{ order.contact.message || '無' }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">商品件數</p>
                </div>
                <div class="col-sm">
                  <p>{{ `共 ${order.cartInfo.list.length} 件` }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">使用優惠券</p>
                </div>
                <div class="col-sm">
                  <p v-if="order.cartInfo.coupon">
                    {{ `${order.cartInfo.coupon.name} ${
                        order.cartInfo.coupon.discount % 10 === 0 ?
                        order.cartInfo.coupon.discount / 10 :
                        order.cartInfo.coupon.discount}折` }}
                  </p>
                  <p v-else>
                    無
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">原價</p>
                </div>
                <div class="col-sm">
                  <p>
                    <span class="text-muted fs-7">NT$</span>
                    {{ $filters.currency(order.cartInfo.price) }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">折扣</p>
                </div>
                <div class="col-sm">
                  <p>
                    <span class="text-muted fs-7">NT$</span>
                    {{ $filters.currency(order.cartInfo.totalPrice -
                    order.cartInfo.price) }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-auto text-muted">
                  <p class="mb-0">總金額</p>
                </div>
                <div class="col-sm">
                  <p class="mb-0">
                    <span class="text-muted fs-7">NT$</span>
                    {{ $filters.currency(order.cartInfo.totalPrice) }}
                  </p>
                </div>
              </div>
              <hr>
              <p class="text-muted mb-2">明細</p>
              <ol class="ps-lg-3">
                <li v-for="orderItem in order.cartInfo.list" :key="orderItem.cartId">
                  <p class="mb-1">{{ orderItem.product.title }}</p>
                  <p class="mb-1 text-muted" v-if="Object.keys(orderItem.userCustom).length">
                    {{ `${orderItem.userCustom.size}, ${orderItem.userCustom.sugar},
                      ${orderItem.userCustom.ice}` }}
                    <span v-if="orderItem.userCustom.extras.length">
                      {{ `, ${orderItem.userCustom.extras.join(', ')}` }}
                    </span>
                  </p>
                  <p class="text-muted">
                    {{ `數量 ${orderItem.qty} , NT$ ${orderItem.price} /${orderItem.product.unit}` }}
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion-button:not(.collapsed){
  background-color: var(--bs-tertiary-bg);
}
.accordion-button:focus{
  box-shadow: 0 0 0 0.15rem var(--bs-gray-200);
}
</style>
