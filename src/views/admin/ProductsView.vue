<script>
import ProductModal from '@/components/admin/ProductModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
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
      isLoading: false,
    };
  },
  inject: ['alertWindow'],
  mixins: [DeleteAlertWindow],
  components: {
    ProductModal,
    PaginationComponent,
  },
  methods: {
    async getData() {
      this.isLoading = true;
      const res = await this.$adminRequest.getProducts();
      if (res.success) {
        this.pagination = res.data.pagination;
        this.products = res.data.products;
        this.isLoading = false;
      } else {
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
    editProduct(data = {}) {
      this.tempProduct = { ...data };
      if (!Array.isArray(this.tempProduct.imagesUrl)) {
        this.tempProduct.imagesUrl = [];
      }
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
  async mounted() {
    this.isLoading = true;
    const result = await this.checkAccountState(this);
    if (result) {
      this.getData();
    }
  },
};
</script>

<template>
  <loading-view :active="isLoading" />
  <product-modal :temp-product="tempProduct" ref="ProductModal" @update-product="updateProduct" />
  <div class="container p-5 pt-0 position-relative">
    <div class="d-flex pt-5 pb-2
        align-items-center flex-wrap
        position-fixed w-100 bg-white"
        style="z-index: 2;">
      <h2 class="mb-0 me-2 opacity-75">我的產品</h2>
      <a href="#" class="link-primary fs-4"
        @click.prevent="editProduct" title="建立新產品">
        <i class="bi bi-plus-square-fill"></i>
      </a>
    </div>
    <div class="text-nowrap overflow-x-auto" style="margin-top: 100px;">
      <table class="table table-hover align-middle">
        <tbody class="border-top">
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="d-flex align-items-center position-relative">
                <button type="button" class="btn mx-3 stretched-link border-0"
                  @click="editProduct(product)">
                  <div class="bg-light text-start" style="width: 150px; height: 150px;">
                    <img :src="product.imageUrl" :alt="product.title" class="w-100 h-100"
                    style="object-fit: cover;">
                  </div>
                  <div class="bg-success bg-opacity-50 text-white" v-if="product.is_enabled">
                    啟用
                  </div>
                  <div class="bg-gray text-white" v-else>未啟用</div>
                </button>
                <div>
                  <h4 class="mb-2">{{ product.title }}
                    <span class="productBadge secondaryOutlineBadge">{{ product.category }}</span>
                  </h4>
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
                </div>
              </div>
            </td>
            <td width="50">
              <button type="button" class="btn btn-sm btn-outline-gray-dark"
                @click="deleteConfirm('Product', '產品', product)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3">
      <pagination-component :pagination="pagination" @set-page="setPage"></pagination-component>
    </div>
  </div>
</template>
