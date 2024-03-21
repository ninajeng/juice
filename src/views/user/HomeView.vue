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
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002366930.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=RYoPppqg60lmM2mC17rwdThL%2BWGQrPDS4QU%2FYMiBY5RE0dpRD0VmMgpVm8igHESz8YxJVIsPVqY31FlHPCPxp7JG66NQqaI4GS0G%2F5NWrhNa%2Bjch1us%2BRKvToeuvQ918MKXcOtjOdrTaBDcAeek2xtGXtEeK%2Ba9wDhcnroGh%2FNAJ9WPKHvnPSn%2BEKXsGcyOxKTzObdqmKBcsSSdk5soOiqq6x2tEvN0SMQtzL3tEPn9ZqajkAne81dlxbozs4jmSfLL9Z2t9Qynv%2FK6Qt7ujJM6KzvNdsm5t6W%2BeNIWejn0qRoINZ%2B0LjRxOykAnfzWkU88iigBDHo%2BPR3xrUjiXvA%3D%3D',
        },
        {
          title: '健康營養、香甜美味',
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002349575.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PIkbyeoktLeq6j%2BzemVLAkxnO%2B%2FnpbSM2PWbmiYhSmYFP2t%2FRyR8i78JucI0CjaxPOtrMdzxJ1dnp9ZJYyT3a6kpnsFiWPGLVgi3aBFiLVG8awq0Xr6tE6ic2AuB8%2FQLYEP3ImUe%2FDZzirR30I6CyaqD1zdvb0bs%2BS4691nW66b0BcyEpsdMj2nb5Sd8hqF5vbNGCeFMPxtQzSzYyxYAch79%2Bu2IA%2FIH7ywvUMsSifn0%2FBZpIBqjmCeW%2B8zvOPiUGlubyQ407WZc3kz6HvkAZsj3e%2BEF%2B4AxvRUQo4bDxP4GoC0UC7kbkJl%2FAAPlmsOnCgVcTlsu4U6cMklNGq3SyQ%3D%3D',
        },
        {
          title: '獨特飲品、多種選擇',
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002283149.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=blEk1Ra1mZ2QkBhIza70Drk0Yg%2FzZT30s%2BJBtgSyvAaJxvf4QfhUOd16q97OjW2irRCjswS0Be0nBkI4OXkDkrjfusWvkD%2BTLC9aO3pVZIK9X0QKzTq2y6MpQyvzsF2jFtifnO8catI35kkwO3IQaYD6QYHD9Fo7z5YA%2FRjYrerlYifDuXJ%2BAT9z1KR25hpllSCRQyyq5mHfjBgjDwgtm0jQ0P9xCYoKWCH8u2kwVH2VJj3T5KiR7G39sigZxnBX2V2g4jAyjHmxLs29HkIOaqu1zpSYijDTDERHyRS7U72FS9nVsBONfniSoMvWHba3b4C71u3UlHDHhr3xBePNzw%3D%3D',
        },
        {
          title: '24小時服務',
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002217128.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qe2gVn8JqRGlmO7mXHhCl6XKS91JVOZOW1DQPFUkqrc81GHHn%2BJfK5ytFDIqVnypHSFZt%2FNfTQs%2BT2nJP5NebFZ1HpRmd1xLqO0Hon%2FTchtfyu8T6%2BGHlTMoOTv5YEW2bJkhhVOHNQxlxO1oojcsZZXBkqtEcc58CVDYLHEtG3UYT4Jxf0NBbcg7%2FZUDRxJHnRRAqX2gIX0f7BofAr8kVbKP4M7qL9Cnq7MyhFsyEtDmmnoXg7fFUjGRzT%2BXzDWHUZecjojAj1t08UT8Q%2F1dWG6gHIDI6vRYm8Jk4OPPK9sS33IKmp1MDjpDQi0AXIVlv4aWaudn85yVKpwbjlaZvw%3D%3D',
        },
      ],
      couponCode: 'anniversary',
      feedbacks: [],
      onSaleIds: ['-NtFaeJPVgdEndI-na1r', '-NtFkFeioTL8c8XzgbCm'],
      onSaleData: [],
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
      this.onSaleIds.forEach((id) => {
        const index = this.productList.findIndex((item) => item.id === id);
        if (index > -1) {
          this.onSaleData.push(this.productList[index]);
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
        <h2 class="mb-3">享受無盡的果汁時光</h2>
        <p class="fs-5">新鮮、健康、24小時不打烊</p>
        <router-link :to="{name: 'products'}"
          class="btn btn-primary btn-lg">
          查看菜單<i class="bi bi-caret-right-fill ms-1"></i>
        </router-link>
      </div>
    </div>
  </section>

  <section class="mt-5 container">
    <h3 class="textTitle text-center mb-3 d-none d-md-block">
      擁抱健康，從一杯<span class="mark">果汁</span>開始
    </h3>
    <h3 class="textTitle text-center mb-3 lh-base d-md-none">
      擁抱健康<span class="d-block">從一杯<span class="mark">果汁</span>開始</span>
    </h3>
    <div class="position-relative mb-5 storeFeature d-none d-lg-block"
      :style="{'background-image': `url(${feature.imgUrl})`}"
                v-for="(feature, key) in storeFeature" :key="'feature' + key">
      <div class="h-100 d-flex align-items-center"
            :class="key % 2 === 0 ? 'storeFeature-toRight' : 'storeFeature-toLeft'">
        <div class="container text-center">
          <h4 class="text-white title">{{ feature.title }}</h4>
        </div>
      </div>
    </div>
    <div class="row gy-3 d-lg-none mb-5">
      <div class="col-12" v-for="(feature, key) in storeFeature" :key="'feature-m' + key">
        <div class="position-relative">
          <img :src="feature.imgUrl" :alt="feature.title" class="img-fluid">
          <div class="position-absolute top-0 left-0 h-100 w-100
            d-flex align-items-end justify-content-center">
            <h4 class="h6 text-white bg-dark bg-opacity-25 w-100 text-center mb-0 py-2">
              {{ feature.title }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5 mt-3">
    <h3 class="textTitle text-center" style="margin-bottom: 2.5rem;">週年慶好禮</h3>
    <div class="border p-3 pt-4 text-center position-relative mb-5">
      <h4 class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge me-2">
          好禮一
        </span>折扣碼優惠
      </h4>
      <p class="mt-4">結帳使用週年慶折扣碼，享九五折優惠。</p>
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
      <h4 class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge me-2">
          好禮二
        </span>官網限定優惠
      </h4>
      <div class="mt-3 row justify-content-center align-items-center mb-md-3 text-start"
        :class="{'flex-row-reverse': key % 2 === 0}"
        v-for="(product, key) in onSaleData" :key="product.id">
        <div class="col-md-5 mb-4 mb-md-0"
          :class=" key % 2 === 0 ? 'text-end': 'text-start'">
          <div class="position-relative onSaleImage">
            <img :src="product.imageUrl" :alt="product.title"
              class="w-100" style="height: 250px; object-fit: cover;">
            <div class="position-absolute top-0 left-0 w-100 h-100 bg-dark bg-opacity-50 text-white
              d-flex justify-content-center align-items-center imageMask">
              <div class="text-center">
                <p><i class="bi bi-search display-4"></i></p>
                <router-link :to="`products/${product.id}`"
                  class="text-white text-decoration-none stretched-link">
                  瀏覽產品
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 mb-md-0" :class="key === onSaleData.length - 1 ? 'mb-3' : 'mb-5'">
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
            瀏覽產品<i class="bi bi-caret-right-fill ms-1"></i>
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
    <h3 class="text-center mb-3">常見問題</h3>
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
.banner{
  height: calc(100vh - 60px);
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0)),
                    url('@/assets/image/banner.jpg');
  background-size: cover;
  background-position: center center;
}
.mark{
  background-image: linear-gradient(white 60%, lighten(#86b2c2, 20%) 40%);
  padding: 0rem 0.25rem;
  color: inherit;
}
.storeFeature{
  height: 500px;
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
  h4{
    opacity: 1;
    transform: translateX(0px);
  }
}
.onSaleImage .imageMask {
  opacity: 0;
  transition: all 0.5s;
}
.onSaleImage:hover .imageMask{
  opacity: 1;
}
</style>
