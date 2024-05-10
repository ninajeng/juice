<script>
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  data() {
    return {
      couponCode: 'anniversary',
      onSaleIds: ['-NtFaeJPVgdEndI-na1r', '-NtFkFeioTL8c8XzgbCm'],
      onSaleData: [],
      isLoading: false,
    };
  },
  mixins: [ToastMessage],
  computed: {
    ...mapState(productStore, ['productList']),
  },
  methods: {
    async getData() {
      this.isLoading = true;
      const resError = await this.getProducts();
      if (resError) {
        this.isLoading = false;
        this.toastShow('error', this.$errorMessage);
        return;
      }
      this.onSaleIds.forEach((id) => {
        const index = this.productList.findIndex((item) => item.id === id);
        if (index > -1) {
          this.onSaleData.push(this.productList[index]);
        }
      });
      this.isLoading = false;
    },
    async copyCode(code, e) {
      const successDOM = '<i class="bi bi-check me-1"></i>已複製';
      const errorDOM = '<i class="bi bi-x"></i>複製失敗';
      e.target.classList.add('disabled');
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(code);
          this.toastShow('success', '已複製優惠碼！');
          e.target.innerHTML = successDOM;
          e.target.classList.add('btn-success');
          e.target.classList.add('btn-outline-success');
          const delay = 3;
          for (let sec = 0; sec <= delay; sec += 1) {
            setTimeout(() => {
              if (sec !== delay) {
                e.target.innerHTML = `${successDOM} (${delay - sec})`;
              } else {
                this.resetBtn(e.target);
              }
            }, 1000 * sec);
          }
        } catch (err) {
          this.copyError(e.target, errorDOM);
        }
      } else {
        this.copyError(e.target, errorDOM);
      }
    },
    resetBtn(btn) {
      const target = btn;
      target.innerHTML = '複製優惠碼';
      target.classList.remove('disabled');
      target.classList.remove('btn-success');
      target.classList.remove('btn-outline-success');
    },
    copyError(btn, errorDOM) {
      const target = btn;
      this.toastShow('success', '複製失敗，請稍後再嘗試');
      target.innerHTML = errorDOM;
      target.classList.add('btn-danger');
      target.classList.add('btn-outline-danger');
    },
    ...mapActions(productStore, ['getProducts', 'setProductData']),
  },
  created() {
    this.getData();
  },
};
</script>

<template>
  <section class="container py-5">
    <h3 class="text-primary text-center" style="margin-bottom: 2.5rem;">週年慶好禮</h3>
    <div class="border p-3 pt-4 text-center position-relative mb-5">
      <h4 class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge d-inline-block me-2 my-1">
          好禮一
        </span>
        <span class="d-inline-block my-1">折扣碼優惠</span>
      </h4>
      <p class="mt-4">結帳使用週年慶折扣碼，享九五折優惠。</p>
      <div class="d-flex justify-content-center mb-3 flex-wrap">
        <p class="display-6 me-2 my-1 text-secondary" data-aos="zoom-out">
          <i class="bi bi-ticket-perforated-fill fs-3"></i>
          {{ couponCode }}
        </p>
        <button
          type="button"
          class="btn btn-primary my-1 align-self-center"
          @click="copyCode(couponCode, $event)"
        >
          複製優惠碼
        </button>
      </div>
    </div>
    <div class="border pb-3 p-4 text-center position-relative">
      <h4 class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge me-2">
          好禮二
        </span>
        <span class="d-inline-block my-1">官網限定優惠</span>
      </h4>
      <div class="position-relative" style="min-height: 300px;">
        <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
        <div class="mt-3 row justify-content-center align-items-center mb-md-3 text-start"
          :class="{'flex-row-reverse': key % 2 === 0}"
          v-for="(product, key) in onSaleData" :key="product.id">
          <div class="col-md-5 mb-4 mb-md-0"
            :class=" key % 2 === 0 ? 'text-end': 'text-start'">
            <div class="position-relative onSaleImage" data-aos="fade-up">
              <img :src="product.imageUrl" :alt="product.title"
                class="w-100" style="height: 250px; object-fit: cover;">
              <div class="position-absolute top-0 left-0 w-100 h-100
                bg-dark bg-opacity-50 text-white
                d-flex justify-content-center align-items-center imageMask">
                <div class="text-center">
                  <p><i class="bi bi-search display-4"></i></p>
                  <router-link :to="`products/${product.id}`"
                    class="text-white text-decoration-none stretched-link">
                    瀏覽產品
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 mb-md-0" :class="key === onSaleData.length - 1 ? 'mb-3' : 'mb-5'">
            <h4 class="mb-3">{{ product.title }}</h4>
            <p>{{ product.description }}</p>
            <p>
              <span v-if="product.origin_price === product.price">
                {{ `NT$ ${$filters.currency(product.origin_price)}` }}
              </span>
              <span class="text-danger" v-else>
                {{ `NT$ ${$filters.currency(product.price)}` }}
                <del class="ms-1 text-muted">
                  {{ `NT$ ${$filters.currency(product.origin_price)}` }}
                </del>
              </span>
              <span class="text-muted fs-7">{{ ` / ${product.unit}` }}</span>
            </p>
            <router-link :to="`products/${product.id}`"
              class="btn btn-primary">
              瀏覽產品<i class="bi bi-caret-right-fill ms-1"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.onSaleImage .imageMask {
  opacity: 0;
  transition: all 0.5s;
}
.onSaleImage:hover .imageMask{
  opacity: 1;
}
</style>
