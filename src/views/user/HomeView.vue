<script>
import { mapActions, mapState } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import productStore from '@/stores/productStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';
import FeedbackCard from '@/components/user/FeedbackCard.vue';

export default {
  data() {
    return {
      storeFeature: [
        {
          title: '產地直送、新鮮蔬果',
          imgUrl: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          title: '健康營養、香甜美味',
          imgUrl: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          title: '獨特飲品、多種選擇',
          imgUrl: 'https://images.unsplash.com/photo-1574571791847-06514225b338?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          title: '24小時服務',
          imgUrl: 'https://images.unsplash.com/photo-1599595344070-c456bea6ee98?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
      couponCode: 'anniversary',
      feedbacks: [],
      onSalesId: ['-NtFaeJPVgdEndI-na1r', '-NtFkFeioTL8c8XzgbCm'],
      onSalesData: [],
      swiperModules: [Navigation],
      swiperBreakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      FQAs: [
        {
          question: '您有提供哪些產品？',
          answer: '我們提供了新鮮現打果汁、蔬果茶飲等各式各樣的飲料外，還有新鮮的分裝、切片水果。',
        },
        {
          question: '您的果汁是天然的嗎？',
          answer: '是的，我們的果汁均以新鮮水果為原料製成，絕不添加人工色素、香料或防腐劑。我們堅持使用天然成分，讓您喝到的每一口果汁都能感受到水果的原始風味，享受純天然的美味。',
        },
        {
          question: '我可以在網站上訂購水果嗎？',
          answer: '是的，您可以在我們的網站上方便快捷地訂購新鮮水果。',
        },
        {
          question: '半夜可以訂購果汁嗎？',
          answer: '是的，我們提供24小時不打烊的服務，您可以隨時品嚐新鮮飲品與水果。',
        },
        {
          question: '您的水果從哪裡來？',
          answer: '我們的水果來自於認證合格的農場，且堅持每日由農場直送，確保新鮮品質。',
        },
      ],
    };
  },
  components: {
    FeedbackCard,
    Swiper,
    SwiperSlide,
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
      this.onSalesId.forEach((id) => {
        const index = this.productList.findIndex((item) => item.id === id);
        if (index > -1) {
          this.onSalesData.push(this.productList[index]);
        }
      });
    },
    copyCode(code, e) {
      e.target.classList.add('disabled');
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(code)
          .then(() => {
            e.target.innerHTML = '<i class="bi bi-check me-1"></i>已複製';
            e.target.classList.add('btn-success');
            e.target.classList.add('btn-outline-success');
          })
          .catch(() => {
            e.target.innerHTML = '<i class="bi bi-x"></i>複製失敗';
            e.target.classList.add('btn-danger');
            e.target.classList.add('btn-outline-danger');
          });
      } else {
        e.target.innerHTML = '<i class="bi bi-x"></i>複製失敗';
        e.target.classList.add('btn-danger');
        e.target.classList.add('btn-outline-danger');
      }
    },
    ...mapActions(productStore, ['getProducts', 'setProductData']),
  },
  mixins: [CheckLogin],
  async mounted() {
    const res = await this.$userRequest.getFeedback();
    if (!res.success) {
      this.toastShow('error', this.$errorMessage);
      return;
    }
    this.feedbacks = res.data.message;
    setTimeout(() => {
      const height = document.querySelector('.swiper').offsetHeight;
      document.querySelector('.swiper').style.height = `${height}px`;
    }, 0);
  },
};
</script>

<template>
  <section class="banner mb-5">
    <div class="container h-100 d-flex align-items-center">
      <div class="text-gray-dark">
        <h2>享受無盡的果汁時光</h2>
        <p class="mb-2">新鮮、健康、24小時不打烊</p>
        <router-link :to="{name: 'products'}"
          class="btn btn-primary">
          查看菜單<i class="bi bi-caret-right-fill ms-1"></i>
        </router-link>
      </div>
    </div>
  </section>

  <section class="mt-5 container">
    <div class="position-relative mb-3 storeFeature d-none d-lg-block"
      :style="{'background-image': `url(${feature.imgUrl})`}"
                v-for="(feature, key) in storeFeature" :key="'feature' + key">
      <div class="h-100 d-flex align-items-center"
            :class="key % 2 === 0 ? 'storeFeature-toRight' : 'storeFeature-toLeft'">
        <div class="container text-center">
          <p class="h4 text-white title">{{ feature.title }}</p>
        </div>
      </div>
    </div>
    <div class="mb-4 border border-primary p-3 d-lg-none"
      v-for="(feature, key) in storeFeature" :key="'feature-m' + key">
      <h3 class="text-center">{{ feature.title }}</h3>
      <div>
        <img :src="feature.imgUrl" alt="" class="img-fluid">
      </div>
    </div>
  </section>

  <section class="container py-5">
    <h3 class="mb-5 text-center">週年慶活動開跑</h3>
    <div class="border p-3 pt-4 text-center position-relative mb-5">
      <p class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge fs-5 me-2 mb-1">
          活動一
        </span>
      </p>
      <h4 class="mt-4 fw-semibold">週年慶折扣碼優惠</h4>
      <p>結帳使用週年慶折扣碼，享九五折優惠。</p>
      <div class="d-flex justify-content-center mb-3">
        <p class="display-6 me-2 my-1 text-secondary">
          <i class="bi bi-ticket-perforated-fill fs-3"></i>
          {{ couponCode }}
        </p>
        <button
          type="button"
          class="btn btn btn-primary my-1 align-self-center"
          @click="copyCode(couponCode, $event)"
        >
          複製優惠碼
        </button>
      </div>
    </div>
    <div class="border pb-3 p-4 text-center position-relative">
      <p class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge fs-5 me-2 mb-1">
          活動二
        </span>
      </p>
      <h4 class="my-4 fw-semibold">官網限定優惠</h4>
      <div class="row justify-content-center align-items-center mb-lg-3 text-start"
        :class="{'flex-row-reverse': key % 2 !== 0}"
        v-for="(product, key) in onSalesData" :key="product.id">
        <div class="col-md-5 mb-4 mb-md-0" :class=" key % 2 === 0 ? 'text-end': 'text-start'">
          <img :src="product.imageUrl" :alt="product.title"
            class="w-100" style="width: 400px;height: 400px; object-fit: cover;">
        </div>
        <div class="col-md-5" :class="key === onSalesData.length - 1 ? 'mb-3' : 'mb-5'">
          <h4 class="mb-3">{{ product.title }}</h4>
          <p>{{ product.description }}</p>
          <p>
            <span v-if="product.origin_price === product.price">
              {{ `NT$ ${$filters.currency(product.origin_price)}` }}
            </span>
            <span class="text-danger" v-else>
              {{ `NT$ ${$filters.currency(product.price)}` }}
              <del class="ms-1 text-muted">
                {{ `NT$ ${$filters.currency(product.origin_price)}` }}
              </del>
            </span>
            <span class="text-muted fs-7">{{ ` / ${product.unit}` }}</span>
          </p>
          <router-link :to="`products/${product.id}`"
            class="btn btn-primary">
            加入購物車<i class="bi bi-caret-right-fill ms-1"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-light my-5 py-5" v-if="feedbacks.length">
    <div class="container">
      <h3 class="text-center mb-4">客戶好評回饋</h3>
      <swiper
        :slidesPerView="1"
        :spaceBetween="-50"
        :breakpoints="swiperBreakpoints"
        :navigation="true"
        :loop="true"
        :modules="swiperModules"
        ref="swiper"
        class="bg-white"
      >
        <swiper-slide v-for="feedback in feedbacks" :key="feedback.id">
          <FeedbackCard :feedback="feedback" />
        </swiper-slide>
      </swiper>
      <div class="text-end">
        <router-link :to="{name: 'products'}"
          class="btn btn-primary mt-4">
          查看菜單<i class="bi bi-caret-right-fill ms-1"></i>
        </router-link>
      </div>
    </div>
  </section>
  <section class="container mb-5 py-5">
    <h3 class="text-center mb-5">常見問題</h3>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item" v-for="(FQA, key) in FQAs" :key="'FQA' + key">
        <h2 class="accordion-header">
          <button class="accordion-button" :class="{'collapsed': key !== 0}" type="button"
            data-bs-toggle="collapse" :data-bs-target="`#FQA${key}`">
            {{ `Q${key + 1}：${FQA.question}` }}
          </button>
        </h2>
        <div :id="`FQA${key}`" class="accordion-collapse collapse"
          :class="{'show': key === 0}" data-bs-parent="#accordionExample">
          <div class="accordion-body text-secondary">
            {{ FQA.answer }}
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
$linear-color: rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0.5) 80%, rgba(255, 255, 255, 1) 90%;

.banner{
  height: calc(100vh - 60px);
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0)),
                    url('@/assets/image/banner.jpg');
  background-size: cover;
  background-position: center center;
}
.storeFeature{
  height: 400px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
}
.storeFeature .title{
  opacity: 0;
  display: inline-block;
  transition: all 0.5s;
}
.storeFeature-toRight .title{
  transform: translateX(-30px);
}
.storeFeature-toLeft .title{
  transform: translateX(30px);
}
.storeFeature:hover{
  .storeFeature-toLeft, .storeFeature-toRight{
    backdrop-filter: blur(4px);
    background-color: rgba(60, 60, 60, 0.25);
  }
  p{
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
