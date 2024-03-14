<script>
import { getProductItem } from '@/api/userRequest';
import CheckLogin from '@/mixins/user/CheckLogin.vue';
import InitProductSettings from '@/mixins/user/InitProductSettings.vue';

export default {
  data() {
    return {
      productData: {},
      userCustom: {},
      qty: 1,
      isLoading: false,
    };
  },
  mixins: [CheckLogin, InitProductSettings],
  methods: {
    init() {
      this.getData();
    },
    async getData() {
      this.isLoading = true;
      const res = await getProductItem(this.$route.params.id);
      if (res.success) {
        this.initProductSettings(res.data.product);
        this.isLoading = false;
      } else {
        alert(res.errorMessage);
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <div class="container py-5">
    <div class="d-flex flex-column flex-lg-row
      justify-content-center justify-content-lg-start align-items-center">
      <img :src="productData.imageUrl" :alt="productData.title"
        style="width: 500px; height: 500px;
        object-fit: cover; object-position: center;" v-if="productData.imageUrl">
      <div class="p-3 ms-0 ms-lg-5">
        <h4 class="mb-3">
          {{ productData.title }}
          <span class="productBadge secondaryOutlineBadge">
            {{ productData.category }}
          </span>
        </h4>
        <p class="text-muted">{{ productData.description }}</p>
        <p v-if="productData.type === 'drink'">{{ `成分：${productData.ingredients}` }}</p>
        <p v-if="productData.type === 'fruit'">{{ productData.unit }}</p>

        <p class="ms-auto">NT$ {{ totalPrice }}</p>
        <div class="input-group w-auto mb-3">
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
          style="min-width: 150px;" @click="setCustomItem">加入購物車</button>
      </div>
    </div>

    <div class="py-5">
      <p>注意事項</p>
      <ul>
        <li>飲品請於兩小時內飲用完畢</li>
      </ul>
      <ul>
        <li>完整水果請保存於冷藏、切片水果請於兩小時內食用完畢</li>
      </ul>
    </div>
  </div>
</template>
