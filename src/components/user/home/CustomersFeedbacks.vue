<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import FeedbackCard from '@/components/user/FeedbackCard.vue';

export default {
  data() {
    return {
      feedbacks: [],
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
      isFeedbackLoading: true,
      feedbackCardNum: 0,
    };
  },
  components: {
    FeedbackCard,
    Swiper,
    SwiperSlide,
  },
  watch: {
    feedbackCardNum(value) {
      if (value && value === this.feedbacks.length) {
        this.setSwiperHeight();
      }
    },
  },
  methods: {
    setSwiperHeight() {
      const height = document.querySelector('.swiper').offsetHeight;
      document.querySelector('.swiper').style.height = `${height}px`;
      this.isFeedbackLoading = false;
    },
  },
  async created() {
    this.isFeedbackLoading = true;
    const res = await this.$userRequest.getFeedback();
    if (!res.success) {
      this.toastShow('error', this.$errorMessage);
      return;
    }
    this.feedbacks = res.data.message;
  },
};
</script>

<template>
  <section class="bg-light py-5">
    <h3 class="text-primary text-center mb-4">客戶好評回饋</h3>
    <div class="container position-relative" style="min-height: 250px;">
      <LoadingView :active="isFeedbackLoading" :is-full-page="false" style="z-index: 1000;"/>
      <swiper
        :slidesPerView="1"
        :spaceBetween="-50"
        :breakpoints="swiperBreakpoints"
        :navigation="true"
        :loop="true"
        :modules="swiperModules"
        ref="swiper"
        class="bg-white"
        v-if="feedbacks.length"
      >
        <swiper-slide v-for="feedback in feedbacks" :key="feedback.id">
          <FeedbackCard :feedback="feedback" @cardFinished="++feedbackCardNum"/>
        </swiper-slide>
      </swiper>
    </div>
    <div class="container text-end">
      <router-link :to="{name: 'products'}"
        class="btn btn-primary mt-4">
        查看菜單<i class="bi bi-caret-right-fill ms-1"></i>
      </router-link>
    </div>
  </section>
</template>
