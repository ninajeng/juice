<script>
import { mapActions, mapState } from 'pinia';
import ProductModal from '@/components/user/ProductModal.vue';
import SectionTitle from '@/components/user/SectionTitle.vue';
import collectStore from '@/stores/collectStore';
import productStore from '@/stores/productStore';
import AddItemToCart from '@/mixins/user/AddItemToCart.vue';
import SetCollection from '@/mixins/user/SetCollection.vue';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      productData: {},
      userCustom: {},
      isEditCollection: true,
      isLoading: false,
    };
  },
  mixins: [CheckLogin, SetCollection, AddItemToCart],
  components: {
    ProductModal,
    SectionTitle,
  },
  computed: {
    ...mapState(collectStore, ['collectInfo']),
  },
  methods: {
    setTarget({ product, userCustom }) {
      this.productData = { ...product };
      this.userCustom = { ...userCustom };
      this.qty = 1;
    },
    setAddItemToCart(data) {
      const product = { ...data };
      this.setTarget(product);
      this.addItemToCart();
    },
    setRemoveItem(data) {
      this.setTarget(data);
      this.removeItemToCollection(data.collectionId);
    },
    editCollection(data) {
      this.setTarget(data);
      this.setProductData(data);
    },
    ...mapActions(productStore, ['setProductData']),
  },
};
</script>

<template>
  <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
  <ProductModal :isEditCollection="true"/>
  <div class="container">
    <SectionTitle :title="'我的收藏'">
      <template #button>
        <button type="button" class="btn btn-primary" title="移除所有收藏"
          @click="removeAllCollection" v-if="collectInfo.list?.length">
          <i class="bi bi-trash3"></i>
        </button>
      </template>
    </SectionTitle>
    <div class="row g-3" v-if="collectInfo.list?.length">
      <div class="col-6 col-md-4 col-lg-3"
        v-for="item in collectInfo.list" :key="item.collectionId">
        <div class="border h-100 d-flex flex-column">
          <img :src="item.product.imageUrl" :alt="item.product.title"
            class="img-fluid border-bottom">
          <div class="p-3 flex-fill d-flex flex-column">

            <p class="mb-2">
              <span class="productBadge secondaryOutlineBadge">
                {{ item.product.category }}
              </span>
            </p>
            <template v-if="item.product.type === 'drink'">
              <h5 class="lh-base">{{ `${item.product.title} (${item.userCustom.size})` }}</h5>
              <p class="mb-2 position-relative">
                <span class="productBadge grayBadge
                  d-inline-block me-2 mb-1 fw-normal fs-6">
                  {{ item.userCustom.sugar || '甜度固定' }}
                </span>
                <span class="productBadge grayBadge
                  d-inline-block me-2 mb-1 fw-normal fs-6">
                  {{ item.userCustom.ice || '冷熱固定' }}
                </span>
                <span class="productBadge grayBadge
                  d-inline-block me-2 mb-1 fw-normal fs-6"
                  v-for="(extra, key) in item.userCustom.extras" :key="'extras' + key">
                  {{ extra }}
                </span>
                <a href="#" class="link-gray-dark stretched-link" title="編輯品項"
                  @click.prevent="editCollection(item)">
                  <i class="bi bi-pencil"></i>
                </a>
              </p>
            </template>
            <template v-else-if="item.product.type === 'fruit'">
              <h5 class="lh-base mb-2">
                {{ item.product.title }}
              </h5>
            </template>
            <p class="mt-auto mb-0">
              <span v-if="item.originPrice === item.price">
                {{ `${$filters.currency(item.price)} 元` }}
              </span>
              <span class="text-danger" v-else>
                {{ `${$filters.currency(item.price)} 元` }}
                <del class="ms-1 text-muted">
                  {{ `${$filters.currency(item.originPrice)}` }}
                </del>
              </span>
              <span class="text-muted fs-7 d-inline-block">{{ ` / ${item.product.unit}` }}</span>
            </p>
          </div>
          <div class="d-flex">
            <button type="button"
              class="btn btn-outline-gray-dark border-0 border-top border-end w-auto"
              title="移除收藏"
              @click="setRemoveItem(item)">
              <i class="bi bi-trash3"></i>
            </button>
            <button type="button"
              class="btn btn-outline-primary border-0 border-top flex-fill"
              title="加入購物車"
              @click="setAddItemToCart(item)">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <template v-if="!isLoading">
        <p>尚無收藏</p>
        <router-link to="/products" class="btn btn-primary">
          瀏覽菜單<i class="bi bi-caret-right-fill"></i>
        </router-link>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stretched-link:hover{
  .bi-pencil::before {
    content: "\f4c9";
  }
}
</style>
