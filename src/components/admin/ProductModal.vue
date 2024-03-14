<script>
import Modal from 'bootstrap/js/dist/modal';
import Tab from 'bootstrap/js/dist/tab';

export default {
  data() {
    return {
      productData: {},
      productModal: null,
      requiredDataTab: null,
      isAliveForm: false,
    };
  },
  props: ['tempProduct'],
  watch: {
    tempProduct(data) {
      this.productData = JSON.parse(JSON.stringify(data));
      const { drinkOptions } = this.$productTemplate;
      if (!this.productData.custom) {
        this.productData.custom = JSON.parse(JSON.stringify(drinkOptions));
      }
    },
  },
  methods: {
    show() {
      this.isAliveForm = true;
      this.requiredDataTab.show();
      this.productModal.show();
    },
    hide() {
      this.productModal.hide();
      this.isAliveForm = false;
    },
    updateProduct() {
      this.$emit('updateProduct', this.productData);
    },
    setProductEnable() {
      if (this.productData.is_enabled) {
        this.productData.is_enabled = 0;
      } else {
        this.productData.is_enabled = 1;
      }
    },
    setCustom(type, isCustom) {
      if (!isCustom) {
        let defaultOptions = [];
        if (type === 'size') {
          defaultOptions = ['M'];
        }
        this.productData.custom[type].options = defaultOptions;
      } else {
        this.productData.custom[type].options = this.$productTemplate
          .drinkOptions[type].options;
      }
      this.productData.custom[type].isCustom = isCustom;
    },
    formatPrice(price, add = 0) {
      const result = this.$filters.currency(price + add);
      return result === 'NaN' ? '尚未設定價格' : result;
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.modal, {
      backdrop: 'static',
    });
    this.requiredDataTab = new Tab(this.$refs.requiredDataTab);
  },
};
</script>

<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-light p-2">
          <h2 class="modal-title flex-fill text-center fs-6 opacity-75">
            {{ `${productData.id ? '編輯' : '新增'}產品` }}
          </h2>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>
        <div class="modal-body p-4">
          <v-form v-slot="{ errors }" @submit="updateProduct">
            <div class="border position-relative">
              <h5 class="position-absolute start-0 translate-middle-x mx-0 mt-4 bg-white py-2 fs-6"
              style="writing-mode: vertical-lr; letter-spacing: 0.3rem;">
                <span class="opacity-75">產品預覽</span>
              </h5>
              <div class="d-flex flex-column flex-lg-row
                justify-content-center justify-content-lg-start align-items-center p-4">
                <div class="bg-gray bg-opacity-50" style="min-width: 300px; height: 300px;">
                  <img :src="productData.imageUrl" :alt="productData.title"
                    style="width: 300px; height: 300px;
                    object-fit: cover; object-position: center;" v-if="productData.imageUrl">
                </div>
                <div class="p-3">
                  <h4 class="mb-3">
                    {{ productData.title || '尚未設定名稱' }}
                    <span class="productBadge secondaryOutlineBadge">
                      {{ productData.category || '尚未設定分類' }}
                    </span>
                  </h4>
                  <p class="text-muted">{{ productData.description }}</p>
                  <div v-if="productData.type === 'drink'">
                    <template
                      v-for="(option ,key) in $productTemplate.drinkOptions" :key="'custom' + key">
                      <div class="d-flex align-items-center mb-2"
                        v-if="productData.custom[key].name !== '配料' ||
                        productData.custom[key].options?.length">
                        <p class="productBadge secondaryBadge me-2 mb-1">
                          {{  productData.custom[key].name }}
                        </p>
                        <p class="mb-1" v-if="!productData.custom[key].isCustom">固定</p>
                        <p class="mb-1" v-else>
                          {{ productData.custom[key].options.join(', ') }}
                          <span class="fs-7"
                            v-if="key === 'size'">
                            {{ `(+${productData.custom[key].addPrice}元)` }}
                          </span>
                          <span class="fs-7"
                            v-if="key === 'extras'">
                            {{ `(+${productData.custom[key].addPrice}元/項)` }}
                          </span>
                        </p>
                      </div>
                    </template>
                  </div>
                  <p v-if="productData.type === 'fruit'">{{ productData.unit }}</p>
                  <p class="mt-3 fs-5">
                    <span v-if="productData.type === 'drink'" class="me-2">(M)</span>
                    <span v-if="productData.origin_price === productData.price">
                      {{ `NT$ ${formatPrice(productData.origin_price)}` }}
                    </span>
                    <span class="text-danger" v-else>
                      {{ `NT$ ${formatPrice(productData.price)}` }}
                      <del class="me-2 text-muted ms-2">
                        {{ formatPrice(productData.origin_price) }}
                      </del>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-4 border border-bottom-0 position-relative">
              <h5 class="position-absolute start-0 translate-middle-x mx-0 mb-0 bg-white py-2 fs-6"
              style="writing-mode: vertical-lr; letter-spacing: 0.3rem; margin-top: 0.3rem;">
                <span class="opacity-75">啟用</span>
              </h5>
              <p class="mb-0 px-4 py-3">
                <a href="#" class="text-decoration-none" @click.prevent="setProductEnable">
                  <i class="bi bi-toggle-on fs-4 align-middle" v-if="productData.is_enabled"></i>
                  <i class="bi bi-toggle-off fs-4 align-middle" v-else></i>
                  <span class="text-dark ms-2 align-middle">啟用產品</span>
                </a>
              </p>
            </div>
            <div class="border position-relative">
              <h5 class="position-absolute start-0 translate-middle-x mx-0 mt-3 bg-white py-2 fs-6"
              style="writing-mode: vertical-lr; letter-spacing: 0.3rem;">
                <span class="opacity-75">產品資料</span>
              </h5>
              <div class="p-4 pb-0 d-flex flex-column flex-lg-row align-items-start">
                <nav>
                  <div class="nav flex-lg-column nav-pills me-lg-4 mb-3 text-nowrap">
                    <button class="nav-link active"
                      id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-content"
                      type="button" ref="requiredDataTab">
                      產品內容*
                    </button>
                    <button class="nav-link"
                      id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-description"
                      type="button">
                      產品描述
                    </button>
                    <button class="nav-link"
                      id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-img"
                      type="button">
                      圖片
                    </button>
                    <button class="nav-link"
                      id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-select"
                      type="button" :disabled="productData.type !== 'drink'">
                      客製化選項
                    </button>
                  </div>
                </nav>
                <div class="tab-content w-100 py-2" style="min-height: 300px;" v-if="isAliveForm">
                  <div class="tab-pane fade show active" id="nav-content">
                    <div class="mb-3">
                      <label for="title" class="form-label">產品名稱*</label>
                      <v-field type="text"
                        id="title"
                        name="產品名稱"
                        class="form-control"
                        :class="{'is-invalid': errors['產品名稱']}"
                        placeholder="請輸入產品名稱"
                        rules="required"
                        v-model="productData.title"/>
                      <ErrorMessage
                        name="產品名稱"
                        class="invalid-feedback"
                      />
                    </div>
                    <div class="row mb-2">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <label for="type" class="form-label">類別*</label>
                          <v-field
                            id="type"
                            name="類別"
                            class="form-select"
                            :class="{'is-invalid': errors['類別']}"
                            rules="required"
                            as="select"
                            v-model="productData.type"
                            @change="productData.category = ''">
                            <option value="" disabled>請選擇類別</option>
                            <option :value="key"
                              v-for="(type, key) in $productTemplate.types" :key="'type' + key">
                              {{ type.name }}
                            </option>
                          </v-field>
                          <ErrorMessage
                            name="類別"
                            class="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <label for="category" class="form-label">分類*</label>
                          <v-field
                            id="category"
                            name="分類"
                            class="form-select"
                            :class="{'is-invalid': errors['分類']}"
                            rules="required"
                            as="select"
                            v-model="productData.category">
                            <option value="" disabled>請選擇分類</option>
                            <option :value="categories.name"
                              v-for="(categories, key) in $productTemplate.categories"
                              :key="'category' + key"
                              v-show="categories.type === productData.type">
                              {{ categories.name }}
                            </option>
                          </v-field>
                          <ErrorMessage
                            name="分類"
                            class="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <label for="unit" class="form-label">單位*
                            <span class="text-muted fs-7">(杯、袋 (300g) ...)</span>
                          </label>
                          <v-field type="text"
                            id="unit"
                            name="單位"
                            class="form-control"
                            :class="{'is-invalid': errors['單位']}"
                            rules="required"
                            placeholder="請輸入單位"
                            v-model="productData.unit"/>
                          <ErrorMessage
                            name="單位"
                            class="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="originPrice" class="form-label">原價*</label>
                          <v-field type="number"
                          id="originPrice"
                          name="原價"
                          class="form-control"
                          :class="{'is-invalid': errors['原價']}"
                          rules="required|min_value:1"
                          placeholder="請輸入原價"
                          v-model.number="productData.origin_price"/>
                          <ErrorMessage
                            name="原價"
                            class="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="price" class="form-label">售價*</label>
                          <v-field type="number"
                          id="price"
                          name="售價"
                          class="form-control"
                          :class="{'is-invalid': errors['售價']}"
                          rules="required|min_value:1"
                          placeholder="請輸入售價"
                          v-model.number="productData.price"/>
                          <ErrorMessage
                            name="售價"
                            class="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="nav-description">
                      <div class="mb-3">
                        <label for="description" class="form-label">簡介</label>
                        <textarea id="description" class="form-control" placeholder="請輸入產品簡介"
                          v-model="productData.description"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="ingredients" class="form-label">成分</label>
                        <textarea id="ingredients" class="form-control" placeholder="請輸入飲品成分"
                          v-model="productData.ingredients"
                          :disabled="productData.type !== 'drink'"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="calories" class="form-label">熱量
                          <span class="text-muted fs-7">(大卡/100ml)</span>
                        </label>
                        <textarea id="calories" class="form-control" placeholder="請輸入飲品卡路里"
                          v-model="productData.calories"
                          :disabled="productData.type !== 'drink'"></textarea>
                      </div>
                  </div>
                  <div class="tab-pane fade" id="nav-img">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">主圖片網址</label>
                      <input type="text" id="imageUrl" class="form-control" placeholder="請輸入主圖片網址"
                        v-model="productData.imageUrl">
                    </div>
                  </div>
                  <div class="tab-pane fade" id="nav-select">
                    <div v-if="productData.custom">
                      <div class="mb-3">
                        <p class="mb-0">
                          <a href="#" class="text-decoration-none link-gray"
                            @click.prevent="setCustom('sugar', !productData.custom.sugar.isCustom)">
                            <i class="bi bi-toggle-on fs-4 align-middle"
                              v-if="productData.custom.sugar.isCustom"></i>
                            <i class="bi bi-toggle-off fs-4 align-middle" v-else></i>
                            <span class="text-dark ms-2 align-middle">甜度選項</span>
                          </a>
                        </p>
                        <p class="mb-0 ms-4 ps-1">
                          <span class="me-2"
                            v-for="(option, key) in $productTemplate.drinkOptions.sugar.options"
                            :key="'option' + key">
                            <input type="checkbox" class="btn-check" :id="option"
                              name="sugar" :value="option"
                              v-model="productData.custom.sugar.options"
                              :disabled="!productData.custom.sugar.isCustom">
                            <label class="btn btn-outline-gray btn-sm" :for="option">
                              {{ option }}
                            </label>
                          </span>
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0">
                          <a href="#" class="text-decoration-none link-gray"
                            @click.prevent="setCustom('ice', !productData.custom.ice.isCustom)">
                            <i class="bi bi-toggle-on fs-4 align-middle"
                              v-if="productData.custom.ice.isCustom"></i>
                            <i class="bi bi-toggle-off fs-4 align-middle" v-else></i>
                            <span class="text-dark ms-2 align-middle">冰熱選項</span>
                          </a>
                        </p>
                        <p class="mb-0 ms-4 ps-1">
                          <span class="me-2"
                            v-for="(option, key) in $productTemplate.drinkOptions.ice.options"
                            :key="'option' + key">
                            <input type="checkbox" class="btn-check" :id="option"
                              name="ice" :value="option"
                              v-model="productData.custom.ice.options"
                              :disabled="!productData.custom.ice.isCustom">
                            <label class="btn btn-outline-gray btn-sm" :for="option">
                              {{ option }}
                            </label>
                          </span>
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0">
                          <a href="#" class="text-decoration-none link-gray"
                            @click.prevent="setCustom('extras',
                              !productData.custom.extras.isCustom)">
                            <i class="bi bi-toggle-on fs-4 align-middle"
                              v-if="productData.custom.extras.isCustom"></i>
                            <i class="bi bi-toggle-off fs-4 align-middle" v-else></i>
                            <span class="text-dark ms-2 align-middle">加料選項</span>
                          </a>
                        </p>
                        <p class="mb-0 ms-4 ps-1">
                          <span class="me-2"
                            v-for="(option, key) in $productTemplate.drinkOptions.extras.options"
                            :key="'option' + key">
                            <input type="checkbox" class="btn-check"  :id="option"
                              name="extras" :value="option"
                              v-model="productData.custom.extras.options"
                              :disabled="!productData.custom.extras.isCustom">
                            <label class="btn btn-outline-gray btn-sm" :for="option">
                              {{ option }}
                            </label>
                          </span>
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0">
                          <a href="#" class="text-decoration-none link-gray"
                            @click.prevent="setCustom('size', !productData.custom.size.isCustom)">
                            <i class="bi bi-toggle-on fs-4 align-middle"
                              v-if="productData.custom.size.isCustom"></i>
                            <i class="bi bi-toggle-off fs-4 align-middle" v-else></i>
                            <span class="text-dark ms-2 align-middle">尺寸加大 (L)</span>
                          </a>
                        </p>
                        <div class="mb-3 ms-4 ps-2 d-flex align-items-center">
                          <label for="largeAddPrice" class="me-2">加價</label>
                          <input type="number" class="form-control w-auto"
                            id="largeAddPrice" placeholder="請輸入加價價格"
                            v-model="productData.custom.size.addPrice"
                            :disabled="!productData.custom.size.isCustom">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-end mt-4">
              <button type="button" class="btn text-muted" @click="hide">取消</button>
              <button type="submit" class="btn btn-primary" @click="requiredDataTab.show()">
                {{ productData.id ? '更新' : '新增' }}
              </button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
