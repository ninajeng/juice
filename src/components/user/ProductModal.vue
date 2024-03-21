<script>
import Modal from 'bootstrap/js/dist/modal';
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import InitProductSettings from '@/mixins/user/InitProductSettings.vue';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  data() {
    return {
      productData: {},
      productModal: null,
      userCustom: {},
      qty: 1,
      isUpdate: false,
      isLoading: false,
    };
  },
  mixins: [InitProductSettings, ToastMessage],
  computed: {
    ...mapState(productStore, ['targetProduct']),
  },
  watch: {
    targetProduct(data) {
      if (data) {
        this.initProductSettings(data);
        this.show();
      } else {
        this.productData = {};
      }
    },
  },
  methods: {
    show() {
      this.productModal.show();
    },
    hide() {
      this.productModal.hide();
    },
    clearData() {
      this.setProductData(null);
    },
    async addItemToCart() {
      this.isLoading = true;
      const resError = await this.setCustomItem(this.isUpdate);
      if (!resError) {
        this.hide();
        this.toastShow('success', `已${this.isUpdate ? '更新' : '加入'}購物車！`);
      } else if (resError !== '未登入') {
        this.toastShow('error', this.$errorMessage);
      }
      this.isLoading = false;
    },
    ...mapActions(productStore, ['setProductData']),
  },
  mounted() {
    this.productModal = new Modal(this.$refs.modal);
    this.$refs.modal.addEventListener('hidden.bs.modal', this.clearData);
  },
  beforeUnmount() {
    this.$refs.modal.removeEventListener('hidden.bs.modal', this.clearData);
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="position-relative">
            <img :src="productData.imageUrl" :alt="productData.title"
              style="width: 100%; height: 300px;
              object-fit: cover; object-position: center;" v-if="productData.imageUrl">
            <button type="button"
              class="btn-close position-absolute top-0 end-0 me-2 mt-2 bg-light bg-opacity-50 p-2"
              @click="hide"></button>
            <router-link :to="`/product/${this.productData.id}`" @click="hide"
              class="btn btn-primary position-absolute bottom-0 start-0 ms-2 mb-2">
              查看更多<i class="bi bi-caret-right-fill"></i>
            </router-link>
          </div>
          <div class="p-3">
            <h4 class="mb-2">
              {{ productData.title }}
              <span class="productBadge secondaryOutlineBadge">
                {{ productData.category }}
              </span>
            </h4>
            <p class="mb-2 text-muted">{{ productData.description }}</p>
            <p class="mb-0 text-muted" v-if="productData.ingredients">
              {{ `成分：${productData.ingredients}` }}
            </p>
            <div class="mt-3" v-if="productData.custom && productData.type === 'drink'">
              <div class="border p-3 mb-3">
                <p class="mb-3 text-muted">請選擇甜度*</p>
                <p class="mb-0">
                  <span class="me-2"
                    v-for="(option, key) in productData.custom.sugar.options"
                    :key="'sugar' + key">
                    <input type="radio" class="btn-check" :id="option"
                      name="sugar" :value="option"
                      v-model="userCustom.sugar" >
                    <label class="btn btn-light" :for="option">
                      {{ option }}
                    </label>
                  </span>
                </p>
              </div>
              <div class="border p-3 mb-3">
                <p class="mb-3 text-muted">請選擇冷熱*</p>
                <p class="mb-0">
                  <span class="me-2"
                    v-for="(option, key) in productData.custom.ice.options"
                    :key="'ice' + key">
                    <input type="radio" class="btn-check" :id="option"
                      name="ice" :value="option"
                      v-model="userCustom.ice">
                    <label class="btn btn-light" :for="option">
                      {{ option }}
                    </label>
                  </span>
                </p>
              </div>
              <div class="border p-3 mb-3">
                <p class="mb-3 text-muted">請選擇尺寸*</p>
                <p class="mb-0">
                  <span class="me-2"
                    v-for="(option, key) in productData.custom.size.options"
                    :key="'size' + key">
                    <input type="radio" class="btn-check" :id="option"
                      name="size" :value="option"
                      v-model="userCustom.size">
                    <label class="btn btn-light" :for="option" v-if="!key">
                      {{ option }}
                      <span class="fs-7">{{ `(${productData.price}元)` }}</span>
                    </label>
                    <label class="btn btn-light" :for="option" v-else>
                      {{ option }}
                      <span class="fs-7">
                        {{ `(${productData.price + productData.custom.extras.addPrice}元)` }}
                      </span>
                    </label>
                  </span>
                </p>
              </div>
              <div class="border p-3 mb-3" v-if="productData.custom.extras.isCustom">
                <p class="mb-3 text-muted">請選擇配料
                  <span class="fs-7">{{ `(+${productData.custom.extras.addPrice}元/項)` }}</span>
                </p>
                <p class="mb-0">
                  <span class="me-2"
                    v-for="(option, key) in productData.custom.extras.options"
                    :key="'extras' + key">
                    <input type="checkbox" class="btn-check" :id="option"
                      :value="option"
                      v-model="userCustom.extras">
                    <label class="btn btn-light" :for="option">
                      {{ option }}
                    </label>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex bg-light">
          <p class="ms-auto">
            <span v-if="productData.origin_price === productData.price">
              {{ `NT$ ${$filters.currency(totalPrice)}` }}
            </span>
            <span class="text-danger" v-else>
              {{ `NT$ ${$filters.currency(totalPrice)}` }}
              <del class="ms-1 text-muted">
                {{ `NT$ ${$filters.currency(totalPrice +
                  productData.origin_price - productData.price)}` }}
              </del>
            </span>
            <span class="text-muted fs-7">{{ ` / ${productData.unit}` }}</span>
          </p>
          <div class="input-group w-auto mb-2">
            <button class="btn btn-primary" type="button" @click="qty -= 1" :disabled="qty === 1">
              <i class="bi bi-dash"></i>
            </button>
            <span class="input-group-text d-inline-block text-center mb-0"
              style="min-width: 70px;">{{ qty }}
            </span>
            <button class="btn btn-primary" type="button" @click="qty += 1" :disabled="qty === 20">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <button type="button" class="btn btn-primary mb-2"
            @click="addItemToCart">{{ `${isUpdate ? '更新' : '加入'}購物車` }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
