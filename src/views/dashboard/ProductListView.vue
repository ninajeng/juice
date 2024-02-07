<script setup>
import { onMounted, ref, inject } from 'vue';
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SweetAlert from '@/components/SweetAlert.vue';

const axios = inject('axios');
// data
const products = ref({});
const tempProduct = ref({
  imagesUrl: [],
});
const pagination = ref({});
const nowPage = ref(1);
const isLoading = ref(false);
// DOM ref
const SweetAlertDOM = ref(null);
const ProductModalDOM = ref(null);
const DeleteModalDOM = ref(null);
const CHECK_PATH = `${import.meta.env.VITE_APP_API_URL}/v2/api/user/check`;
const PRODUCT_PATH = `${import.meta.env.VITE_APP_API_URL}/v2/api/vegetableshop/admin/product`;
// methods
function getData() {
  isLoading.value = true;
  axios.get(`${PRODUCT_PATH}s?page=${nowPage.value}`)
    .then((res) => {
      if (res.data.success) {
        pagination.value = res.data.pagination;
        products.value = res.data.products;
        isLoading.value = false;
      } else {
        SweetAlertDOM.value.showErrorAlert(res.data.message);
      }
    }).catch((e) => {
      SweetAlertDOM.value.showErrorAlert(e.response.data.message);
    });
}
function checkAuth() {
  isLoading.value = true;
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)VegetableShopToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
  axios.defaults.headers.common.Authorization = token;
  axios.post(CHECK_PATH).then((res) => {
    if (!res.data.success) {
      isLoading.value = false;
      SweetAlertDOM.value.showErrorAlert(res.data.message, 'replace', 'login');
    } else {
      getData();
    }
  }).catch((e) => {
    isLoading.value = false;
    SweetAlertDOM.value.showErrorAlert(e.response.data.message, 'replace', 'login');
  });
}
function editProduct(data = {}) {
  tempProduct.value = { ...data };
  if (!Array.isArray(tempProduct.value.imagesUrl)) {
    tempProduct.value.imagesUrl = [];
  }
  ProductModalDOM.value.show();
}
function updateProduct(data) {
  const product = { ...data };
  isLoading.value = true;
  if (product.imagesUrl?.length) {
    product.imagesUrl = product.imagesUrl.filter((url) => url !== '');
  }
  const HTTPMETHOD = product.id ? 'put' : 'post';
  const PATH = `${PRODUCT_PATH}${product.id ? `/${product.id}` : ''}`;
  axios[HTTPMETHOD](PATH, { data: product })
    .then((res) => {
      ProductModalDOM.value.hide();
      SweetAlertDOM.value.showSuccessAlert(res.data.message);
      getData();
    }).catch((e) => {
      isLoading.value = false;
      SweetAlertDOM.value.showErrorAlert(e.response.data.message);
    });
}
function deleteConfirm(data) {
  DeleteModalDOM.value.show(data);
}
function deleteProduct(id) {
  isLoading.value = true;
  axios.delete(`${PRODUCT_PATH}/${id}`)
    .then((res) => {
      SweetAlertDOM.value.showSuccessAlert(res.data.message);
      getData();
    }).catch((e) => {
      isLoading.value = false;
      SweetAlertDOM.value.showErrorAlert(e.response.data.message);
    });
}
function setPage(page) {
  nowPage.value = page;
  getData();
}
// Lifecycle
onMounted(() => {
  checkAuth();
});
</script>

<template>
  <loading-view :active="isLoading"/>
  <product-modal :temp-product="tempProduct"
    ref="ProductModalDOM"
    @update-product="updateProduct"/>
  <delete-modal ref="DeleteModalDOM" @delete-product="deleteProduct"/>
  <sweet-alert ref="SweetAlertDOM"/>
  <div class="container py-5">
      <div class="d-flex justify-content-between mb-4 align-items-center flex-wrap">
          <h2>產品列表</h2>
          <button type="button" class="btn btn-primary" @click="editProduct">建立新的產品</button>
      </div>
      <div class="text-nowrap overflow-x-auto">
          <table class="table table-hover align-middle" >
              <thead>
                  <tr>
                      <th width="120">分類</th>
                      <th>產品名稱</th>
                      <th width="120" class="text-end">原價</th>
                      <th width="120" class="text-end pe-4">售價</th>
                      <th width="120">是否啟用</th>
                      <th width="120">編輯</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="product in products" :key="product.id">
                      <td>{{ product.category }}</td>
                      <td>{{ product.title }}</td>
                      <td class="text-end">{{ product.origin_price }}</td>
                      <td class="text-end pe-4">{{ product.price }}</td>
                      <td :class="product.is_enabled ? 'text-success' : 'text-muted'">
                        {{ product.is_enabled ? '啟用' : '未啟用' }}
                      </td>
                      <td>
                          <div class="input-group flex-nowrap">
                              <button type="button"
                                class="btn btn-sm btn-outline-primary"
                                @click="editProduct(product)">
                                編輯
                              </button>
                              <button type="button"
                                class="btn btn-sm btn-outline-danger"
                                @click="deleteConfirm(product)">
                                刪除
                              </button>
                          </div>
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
