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
  <div class="card productCard">
    <div class="row g-0">
      <div class="col-auto">
        <img :src="productInfo.imageUrl"
        class="img-fluid"
        :alt="productInfo.title"
        style="width: 200px; height: 200px; object-fit: cover;">
      </div>
      <div class="col">
        <div class="card-body d-flex flex-column h-100">
          <h5 class="card-title mb-0">{{ productInfo.title }}
            <span class="productBadge secondaryOutlineBadge">{{ productInfo.category }}</span>
          </h5>
          <div class="mt-auto">
            <p class="card-text">
              <span v-if="productInfo.origin_price === productInfo.price">
                {{ `NT$ ${$filters.currency(productInfo.price)}` }}
              </span>
              <span class="text-danger" v-else>
                {{ `NT$ ${$filters.currency(productInfo.price)}` }}
                <del class="ms-1 text-muted">
                  {{ `NT$ ${$filters.currency(productInfo.origin_price)}` }}
                </del>
              </span>
              <span class="text-muted fs-7">{{ ` / ${productInfo.unit}` }}</span>
            </p>
            <a href="#"
              class="btn btn-primary stretched-link"
              @click.prevent="setProductData(productInfo)">
              <i class="bi bi-search me-2"></i>瀏覽產品
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.productCard:hover{
  border: 1px solid var(--bs-primary);
  transform: translateY(-2px);
  transition: transform 0.3s;
}
</style>
