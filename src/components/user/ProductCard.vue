<script>
import productStore from '@/stores/productStore';
import { mapActions } from 'pinia';

export default {
  props: ['productInfo'],
  methods: {
    ...mapActions(productStore, ['setProductData']),
  },
};
</script>

<template>
  <div class="card productCard h-100">
    <div class="row g-0 h-100">
      <div class="col-auto">
        <img :src="productInfo.imageUrl"
        class="img-fluid productImg"
        :alt="productInfo.title">
      </div>
      <div class="col">
        <div class="card-body d-flex flex-column h-100">
          <h5 class="card-title mb-0">{{ productInfo.title }}
            <span class="productBadge secondaryOutlineBadge d-inline-block my-2">
              {{ productInfo.category }}
            </span>
          </h5>
          <div class="mt-auto">
            <p class="card-text mt-2">
              <span v-if="productInfo.origin_price === productInfo.price">
                {{ `NT$ ${$filters.currency(productInfo.price)}` }}
                <span class="text-muted fs-7 d-inline-block">{{ ` / ${productInfo.unit}` }}</span>
              </span>
              <span class="text-danger me-1" v-else>
                {{ `NT$ ${$filters.currency(productInfo.price)}` }}
                <div class="d-inline-block">
                  <del class="text-muted">
                    {{ `NT$ ${$filters.currency(productInfo.origin_price)}` }}
                  </del>
                  <span class="text-muted fs-7">{{ ` / ${productInfo.unit}` }}</span>
                </div>
              </span>
            </p>
            <a href="#"
              class="btn btn-primary stretched-link"
              @click.prevent="setProductData(productInfo)">
              瀏覽<span class="d-md-none d-lg-inline">產品</span><i class="bi bi-caret-right-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.productImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media(min-width: 380px){
  .productImg{
    width: 200px;
    height: 100%;
  }
}
.productCard:hover{
  border: 1px solid var(--bs-primary);
  transform: translateY(-2px);
  transition: transform 0.3s;
}
</style>
