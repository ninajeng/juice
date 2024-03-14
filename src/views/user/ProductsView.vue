<script>
// import 'bootstrap/js/dist/scrollspy';
import ScrollSpy from 'bootstrap/js/dist/scrollspy';
import { mapActions, mapState } from 'pinia';
import ProductCard from '@/components/user/ProductCard.vue';
import ProductModal from '@/components/user/ProductModal.vue';
import productStore from '@/stores/productStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  data() {
    return {
      products: [],
      categories: [],
      scrollSpy: null,
      isLoading: false,
    };
  },
  mixins: [CheckLogin, ToastMessage],
  components: {
    ProductCard,
    ProductModal,
  },
  computed: {
    ...mapState(productStore, ['productList']),
  },
  methods: {
    init() {
      this.getData();
    },
    async getData() {
      this.isLoading = true;
      const resError = await this.getProducts();
      this.isLoading = false;
      if (resError) {
        this.toastShow('error', this.$errorMessage);
        return;
      }
      this.categories.forEach((category) => {
        this.products[category] = [];
      });
      this.productList.forEach((product) => {
        this.products[product.category].push(product);
      });
      this.scrollSpy = new ScrollSpy(document.body, {
        target: '#categories-list',
      });
      const dataSpyList = document.querySelector('[data-bs-spy="scroll"]');
      console.log(dataSpyList);
      console.log(ScrollSpy);
      console.log(ScrollSpy.getInstance(dataSpyList).refresh());
      // ScrollSpy.getInstance(dataSpyList).refresh();
    },
    ...mapActions(productStore, ['getProducts']),
  },
  created() {
    this.categories = this.$productTemplate.categories.map((item) => item.name);
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <ProductModal/>
  <div class="position-relative">
    <img src="https://images.unsplash.com/photo-1622597467821-df79dcb4f94d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="菜單頁背景圖"
      style="height: 300px; width: 100%; object-fit: cover; object-position: center -350px;">
  </div>

  <div class="container" data-bs-spy="scroll" data-bs-target="#categories-list"
        data-bs-offset="0" data-bs-smooth-scroll="true">
    <nav style="--bs-breadcrumb-divider: '>'; margin-bottom: -1rem;" class="mt-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item link-offset-2">
          <router-link :to="{name: 'home'}">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">菜單</li>
      </ol>
    </nav>

    <div>
      <div id="categories-list" class="sticky-top bg-white pt-3 pb-2"
        style="top: 60px; z-index: 1000">
        <ul class="nav nav-pills">
          <li class="nav-item" v-for="(category, key) in categories" :key="'btn' + key">
            <a class="nav-link" :href="`#${category}`" @click.prevent="">{{ category }}</a>
          </li>
        </ul>
      </div>

      <div class="py-3 position-relative">
        <template v-for="(category, key) in categories" :key="'category' + key">
          <p :id="category" class="mb-0">{{ category }}</p>
          <div v-for="productInfo in products[category]" :key="productInfo.id" class="mb-3">
            <ProductCard :product-info="productInfo" />
          </div>
        </template>
      </div>

    </div>

    <!-- <div id="categories-list" class="sticky-top bg-white pt-3 pb-2"
      style="top: 60px; z-index: 1000">
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="(category, key) in categories" :key="'btn' + key">
          <a class="nav-link" :href="`#${category}`" @click.prevent="">{{ category }}</a>
        </li>
      </ul>
    </div>

    <div data-bs-spy="scroll" data-bs-target="#categories-list"
      data-bs-offset="0" data-bs-smooth-scroll="true"
      class="py-3 position-relative">
      <template v-for="(category, key) in categories" :key="'category' + key">
        <p :id="category" class="mb-0">{{ category }}</p>
        <div v-for="productInfo in products[category]" :key="productInfo.id" class="mb-3">
          <ProductCard :product-info="productInfo" />
        </div>
      </template>
    </div> -->
  </div>
</template>
