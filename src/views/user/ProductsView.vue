<script>
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
      navTargets: [],
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
      if (resError) {
        this.isLoading = false;
        this.toastShow('error', this.$errorMessage);
        return;
      }
      this.categories.forEach((category) => {
        this.products[category] = [];
      });
      this.productList.forEach((product) => {
        this.products[product.category].push(product);
      });
      this.initProductModal();
      setTimeout(() => {
        this.setCategory();
      }, 0);
    },
    initProductModal() {
      const productId = this.$route.params.id;
      let index = -1;
      if (productId) {
        index = this.productList.findIndex((item) => item.id === productId);
      }
      if (index > -1) {
        this.setProductData(this.productList[index]);
      }
    },
    setCategory() {
      [...document.querySelectorAll('.section')].forEach((e) => {
        this.navTargets[e.id] = e.offsetTop;
      });

      window.addEventListener('scroll', this.setNavButton);
      this.isLoading = false;
    },
    setNavButton() {
      const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      const nav = document.querySelector('.navList');
      const navPositionY = nav.offsetTop;
      if (scrollPosition >= navPositionY - 60) {
        nav.style['box-shadow'] = '0 0.14rem 0.2rem rgba(0, 0, 0, 0.075)';
      } else {
        nav.style['box-shadow'] = 'none';
      }
      Object.keys(this.navTargets).forEach((key) => {
        if (this.navTargets[key] - 125 <= scrollPosition) {
          document.querySelector('.active').classList.remove('active');
          document.querySelector(`a[href*=${key}]`).classList.add('active');
        }
      });
    },
    scroll(e) {
      const target = e.target.href.split('#')[1];
      window.scroll({
        top: this.navTargets[target] - 120,
      });
    },
    ...mapActions(productStore, ['getProducts', 'setProductData']),
  },
  mounted() {
    this.categories = this.$productTemplate.categories.map((item) => item.name);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.setNavButton);
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <ProductModal/>
  <img src="https://images.unsplash.com/photo-1622597467821-df79dcb4f94d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="菜單頁背景圖"
    style="height: 300px; width: 100%; object-fit: cover; object-position: center center;">
  <nav class="container" style="--bs-breadcrumb-divider: '>'; margin-bottom: -0.5rem;">
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item link-offset-2">
        <router-link :to="{name: 'home'}">首頁</router-link>
      </li>
      <li class="breadcrumb-item active">菜單</li>
    </ol>
  </nav>
  <div class="sticky-top bg-white pt-3 navList" style="top: 50px;">
    <div class="container">
      <ul class="nav nav-pills text-nowrap">
        <li class="nav-item bg-light mb-2" v-for="(category, key) in categories" :key="'btn' + key">
          <a class="nav-link" :class="{'active': key === 0 }"
            :href="`#category${key}`" @click.prevent="scroll">{{ category }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="container py-3">
    <template v-for="(category, categoryIndex) in categories" :key="'category' + categoryIndex">
      <div v-for="(productInfo, key) in products[category]" :key="productInfo.id"
        :id="key === 0 ? `category${categoryIndex}` : `${category}${key}`"
        :class="{'section': key === 0}" class="mb-3">
        <ProductCard :product-info="productInfo" />
      </div>
    </template>
  </div>
</template>
