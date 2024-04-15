<script>
import { mapActions } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  props: ['product'],
  methods: {
    ...mapActions(productStore, ['setProductData']),
  },
};
</script>

<template>
  <div class="card border-0 shadow-sm">
    <img :src="product.imageUrl" :alt="product.title">
    <a href="#" class="stretched-link"
      @click.prevent="setProductData(product)">
    </a>
    <p class="position-absolute bottom-0 m-2 px-3 py-1
      bg-black bg-opacity-50 text-white">{{ product.title }}</p>
    <div class="position-absolute top-0 left-0 w-100 h-100
      bg-dark bg-opacity-50 text-white
      d-flex justify-content-center align-items-center imageMask">
      <div class="text-center">
        <p><i class="bi bi-search display-4"></i></p>
        <p class="mb-0">瀏覽產品</p>
      </div>
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
