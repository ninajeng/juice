<script>
import ProductModal from '@/components/admin/ProductModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CheckAccount from '@/mixins/admin/CheckAccount.vue';
import DeleteAlertWindow from '@/mixins/admin/DeleteAlertWindow.vue';
import adminAccountStore from '@/stores/adminAccountStore';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      products: {},
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      nowPage: 1,
      isInitLoading: true,
      isLoading: false,
    };
  },
  inject: ['alertWindow'],
  mixins: [CheckAccount, DeleteAlertWindow],
  components: {
    ProductModal,
    PaginationComponent,
  },
  methods: {
    init() {
      this.initLoading = true;
      this.getData();
    },
    async getData() {
      this.isLoading = true;
      const res = await this.$adminRequest.getProducts(this.nowPage);
      if (res.success) {
        this.pagination = res.data.pagination;
        this.products = res.data.products;
        this.isInitLoading = false;
        this.isLoading = false;
      } else {
        this.isInitLoading = false;
        this.isLoading = false;
        this.$cookie.delAdminCookie();
        this.alertWindow.show({
          type: 'Error',
          title: res.errorMessage,
          router: {
            method: 'replace',
            path: 'adminLogin',
          },
        });
      }
    },
    editProduct(data) {
      this.tempProduct = { ...data };
      this.$refs.ProductModal.show();
    },
    async updateProduct(data) {
      this.isLoading = true;
      const product = { ...data };
      if (product.imagesUrl?.length) {
        this.product.imagesUrl = product.imagesUrl.filter((url) => url !== '');
      }
      const res = await this.$adminRequest.updateProduct(product);
      if (res.success) {
        this.$refs.ProductModal.hide();
        this.isLoading = false;
        this.alertWindow.show({ type: 'Success', title: res.data.message });
        this.getData();
      } else {
        this.isLoading = false;
        this.alertWindow.show({ type: 'Error', title: res.errorMessage });
      }
    },
    async deleteProduct(id) {
      this.isLoading = true;
      const res = await this.$adminRequest.deleteProduct(id);
      if (res.success) {
        this.alertWindow.show({ type: 'Success', title: res.data.message });
        this.getData();
      } else {
        this.isLoading = false;
        this.alertWindow.show({ type: 'Error', title: res.errorMessage });
      }
    },
    setPage(page) {
      this.nowPage = page;
      this.getData();
    },
    ...mapActions(adminAccountStore, ['checkAccountState']),
  },
};
</script>

<template>
  <loading-view :active="isLoading && !isInitLoading"/>
  <product-modal :temp-product="tempProduct" ref="ProductModal" @update-product="updateProduct" />
  <div class="container-fluid px-5 position-relative d-flex flex-column h-100">
    <loading-view :active="isInitLoading" :is-full-page="false"/>
    <div class="d-flex pt-4 pb-2
        align-items-center flex-wrap
        sticky-top w-100 bg-white"
        style="z-index: 900;">
      <h2 class="mb-0 me-2 opacity-75">產品管理</h2>
      <a href="#" class="link-primary fs-4"
        @click.prevent="editProduct({})" title="建立新產品">
        <i class="bi bi-plus-square-fill"></i>
      </a>
    </div>
    <div class="text-nowrap overflow-x-auto mt-2 border border-primary-subtle"
      style="min-height: 100px;">
      <table class="table table-hover align-middle mb-0" v-if="products.length">
        <tbody>
          <tr class="position-relative" v-for="product in products" :key="product.id">
            <td width="150" class="text-center p-3">
              <div class="bg-light text-start" style="width: 150px; height: 150px;">
                <img :src="product.imageUrl" :alt="product.title" class="w-100 h-100"
                style="object-fit: cover;">
              </div>
              <div class="bg-success bg-opacity-50 text-white" v-if="product.is_enabled">
                啟用
              </div>
              <div class="bg-gray text-white" v-else>未啟用</div>
            </td>
            <td class="ps-3">
              <h4 class="mb-2">{{ product.title }}
                <span class="productBadge secondaryOutlineBadge">{{ product.category }}</span>
              </h4>
              <p class="mb-2">{{ product.description }}</p>
              <p class="mb-1">
                <span v-if="product.origin_price === product.price">
                  {{ `NT$ ${$filters.currency(product.origin_price)}` }}
                </span>
                <span v-else>
                  <del class="me-2 text-muted">
                    {{ $filters.currency(product.origin_price) }}
                  </del>
                  {{ `NT$ ${$filters.currency(product.price)}` }}
                </span>
                <span class="fs-7 text-muted">{{ ` / ${product.unit}` }}</span>
              </p>
            </td>
            <td>
            </td>
            <td width="80" class="text-center">
              <button type="button" class="btn btn-outline-primary stretched-link"
                @click="editProduct(product)"><i class="bi bi-pencil"></i>
              </button>
            </td>
            <td width="80">
              <button type="button" class="btn btn-outline-gray-dark position-relative z-2"
                @click="deleteConfirm('Product', '產品', product)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="m-3 text-muted" v-if="!products.length && !isInitLoading">尚未建立產品</p>
    </div>
    <div class="mt-3">
      <pagination-component :pagination="pagination" @set-page="setPage"></pagination-component>
    </div>
  </div>
</template>
