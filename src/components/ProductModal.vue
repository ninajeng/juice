<script>
import Modal from 'bootstrap/js/dist/modal';
import Popover from 'bootstrap/js/dist/popover';

export default {
  data() {
    return {
      productData: {
        imagesUrl: [],
      },
      productModal: null,
      popover: null,
      requiredData: [
        'title',
        'category',
        'unit',
        'origin_price',
        'price',
      ],
      formInvalidate: [],
    };
  },
  props: ['tempProduct'],
  watch: {
    tempProduct(data) {
      this.productData = JSON.parse(JSON.stringify(data));
    },
  },
  methods: {
    show() {
      this.productModal.show();
    },
    hide() {
      this.productModal.hide();
    },
    validate(data) {
      return this.formInvalidate.indexOf(data) > -1;
    },
    removeError(data) {
      const index = this.formInvalidate.indexOf(data);
      if (index > -1) {
        this.formInvalidate.splice(index, 1);
      }
    },
    updateProduct() {
      this.formInvalidate = [];
      this.requiredData.forEach((item) => {
        if (!this.productData[item]) this.formInvalidate.push(item);
      });
      if (!this.formInvalidate.length) {
        this.$emit('updateProduct', this.productData);
      }
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.modal, {
      backdrop: 'static',
    });
    this.popover = new Popover(this.$refs.popover, {
      container: '.modal-body',
    });
  },
};
</script>

<template>
  <div class="modal fade" ref="modal">
      <div class="modal-dialog modal-xl">
          <div class="modal-content">
              <div class="modal-header bg-dark text-white">
                  <h1 class="modal-title fs-5">{{ `${productData.id ? '編輯' : '新增'}產品` }}</h1>
                  <button type="button" class="btn-close" @click="hide"></button>
              </div>
              <div class="modal-body px-4">
                  <div class="row flex-column-reverse flex-lg-row">
                      <div class="col-lg-4">
                          <div class="mb-3">
                              <label for="imageUrl" class="form-label">主圖片網址</label>
                              <input type="text"
                                id="imageUrl"
                                class="form-control"
                                placeholder="請輸入主圖片網址"
                                v-model="productData.imageUrl">
                              <img :src="productData.imageUrl"
                                :alt="productData.title"
                                class="img-fluid mt-3"
                                v-if="productData.imageUrl">
                          </div>
                          <div v-if="!productData.imagesUrl.length">
                              <p class="mb-2">次要圖片</p>
                          </div>
                          <div class="mb-3"
                            v-for="(url, key) in productData.imagesUrl"
                            :key="'url' + key">
                              <label :for="`imageUrl${key}`" class="form-label">
                                {{ `次要圖片${key + 1}` }}
                              </label>
                              <div class="input-group mb-3">
                                  <input type="text"
                                    :id="`imageUrl${key}`"
                                    class="form-control"
                                    placeholder="請輸入次要圖片網址"
                                    v-model="productData.imagesUrl[key]">
                                  <button type="button" class="btn btn-outline-danger"
                                    :class="{'disabled': !productData.imagesUrl.length}"
                                    @click="productData.imagesUrl.splice(key, 1)">刪除圖片</button>
                              </div>
                              <img :src="url"
                                :alt="`產品圖片：${productData.title}-${key + 1}`"
                                class="img-fluid" v-if="url">
                          </div>
                          <button type="button"
                            class="btn btn-outline-primary w-100 mb-3"
                            @click="productData.imagesUrl.push('')"
                            v-if="this.productData.imagesUrl.length < 5 &&
                              (!this.productData.imagesUrl.length ||
                              this.productData.imagesUrl[this.productData.imagesUrl.length - 1])">
                                新增圖片欄位
                              </button>
                          <span class="d-block" ref="popover"
                            data-bs-trigger="hover"
                            data-bs-content="圖片數量已達上限"
                            data-bs-placement="bottom"
                            data-bs-custom-class="custom-popover">
                              <button type="button"
                                class="btn btn-outline-primary w-100 mb-1 disabled"
                                v-show="this.productData.imagesUrl.length >= 5">
                                新增圖片欄位
                            </button>
                          </span>
                      </div>
                      <div class="col-lg-8">
                          <div class="mb-3">
                              <label for="title" class="form-label">主圖片標題*</label>
                              <input type="text"
                                id="title"
                                class="form-control"
                                :class="{'is-invalid': productData.title === '' ||
                                validate('title')}"
                                placeholder="請輸入標題"
                                v-model="productData.title"
                                @input="removeError('title')">
                              <div class="invalid-feedback">
                                  標題欄位為必填
                              </div>
                          </div>
                          <div class="row mb-2">
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="category" class="form-label">分類*</label>
                                      <input type="text"
                                        id="category"
                                        class="form-control"
                                        :class="{'is-invalid': productData.category === '' ||
                                          validate('category')}"
                                        placeholder="請輸入分類"
                                        v-model="productData.category"
                                        @input="removeError('category')">
                                      <div class="invalid-feedback">
                                          分類欄位為必填
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="unit" class="form-label">單位*</label>
                                      <input type="text"
                                        id="unit"
                                        class="form-control"
                                        :class="{'is-invalid': productData.unit === '' ||
                                        validate('unit')}"
                                        placeholder="請輸入單位"
                                        v-model="productData.unit"
                                        @input="removeError('unit')">
                                      <div class="invalid-feedback">
                                          單位欄位為必填
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="originPrice" class="form-label">原價*</label>
                                      <input type="number"
                                      id="originPrice"
                                      min="1"
                                      class="form-control"
                                      :class="{'is-invalid': productData.origin_price === ''  ||
                                        validate('origin_price')}"
                                      placeholder="請輸入原價"
                                      v-model.number="productData.origin_price"
                                      @input="removeError('origin_price')">
                                      <div class="invalid-feedback">
                                          原價欄位為必填
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="price" class="form-label">售價*</label>
                                      <input type="number"
                                      id="price"
                                      min="1"
                                      class="form-control"
                                      :class="{'is-invalid': productData.price === '' ||
                                        validate('price')}"
                                      placeholder="請輸入售價"
                                      v-model.number="productData.price"
                                      @input="removeError('price')">
                                      <div class="invalid-feedback">
                                          售價欄位為必填
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <hr class="mb-4 mt-3">
                          <div class="mb-3">
                              <label for="description" class="form-label">產品描述</label>
                              <textarea id="description" class="form-control"
                                placeholder="請輸入產品描述" v-model="productData.description"></textarea>
                          </div>
                          <div class="mb-3">
                              <label for="content" class="form-label">說明內容</label>
                              <textarea id="content" class="form-control"
                                placeholder="請輸入說明內容" v-model="productData.content"></textarea>
                          </div>
                          <div class="mb-3">
                              <div class="form-check">
                                  <input type="checkbox" id="enable" class="form-check-input"
                                    :true-value="1" :false-value="0"
                                    v-model="productData.is_enabled">
                                  <label for="enable" class="form-check-label">
                                    {{ `是否啟用：${productData.is_enabled ? '啟用' : '未啟用'}` }}
                                  </label>
                                </div>
                          </div>
                          <hr class="my-4 d-lg-none">
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn text-muted" @click="hide">取消</button>
                  <button type="button" class="btn btn-primary" @click="updateProduct">
                    {{ productData.id ? '更新' : '新增' }}
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>
