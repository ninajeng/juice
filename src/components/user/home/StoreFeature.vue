<script>
import LoginOrRegisterFunction from '@/mixins/user/home/LoginOrRegisterFunction.vue';

export default {
  data() {
    return {
      storeFeature: [{
        imgUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362149/01_bxivbu.jpg',
        tagA: '#產地直送',
        tagB: '#新鮮蔬果',
        col: 'col-12',
        smImageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362149/01_bxivbu.jpg',
        smRow: 1,
        smColumn: '2',
        aosSetting: 'zoom-in',
      },
      {
        imgUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362149/02-lg_gkh4hm.jpg',
        tagA: '#美味飲品',
        tagB: '#多種選擇',
        col: 'col-6',
        smImageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362149/02-sm_drahqr.jpg',
        smRow: 2,
        smColumn: '1',
        aosSetting: 'fade-up',
      },
      {
        imgUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362149/03-lg_tfntyf.jpg',
        tagA: '#健康營養',
        tagB: '#香甜可口',
        col: 'col-6',
        smImageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362150/03-sm_rpbnvn.jpg',
        smRow: 1,
        smColumn: '1',
        aosSetting: 'fade-right',
      },
      {
        imgUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362150/04-sm_q0ijos.jpg',
        tagA: '#不打烊',
        tagB: '#24小時服務',
        col: 'col-12',
        smImageUrl: 'https://res.cloudinary.com/derxrcfij/image/upload/v1742362149/04-lg_ybdujz.jpg',
        smRow: 1,
        smColumn: '1',
        aosSetting: 'fade-right',
      },
      ],
    };
  },
  mixins: [LoginOrRegisterFunction],
};
</script>

<template>
  <section class="container pt-5">
    <h3 class="text-primary text-center mb-lg-4 d-none d-md-block">
      擁抱健康，從一杯<span class="mark">果汁</span>開始
    </h3>
    <h3 class="text-primary text-center mb-3 lh-base d-md-none">
      擁抱健康<span class="d-block">從一杯<span class="mark">果汁</span>開始</span>
    </h3>
    <div class="row g-3 d-none d-lg-flex">
      <div :class="feature.col" v-for="(feature, key) in storeFeature" :key="'feature' + key">
        <div class="position-relative storeFeature"
          :style="{'background-image': `url(${feature.imgUrl})`}">
          <h4 class="position-absolute end-0 bottom-0 h3
            text-white bg-gray-dark bg-opacity-50 m-2 p-2">
            <span class="pe-3">{{ feature.tagA }}</span>{{ feature.tagB }}
          </h4>
        </div>
      </div>
    </div>
    <div class="d-lg-none mb-3 grid">
      <div :style="{'grid-row': `span ${feature.smRow}`, 'grid-column': `span ${feature.smColumn}`}"
        v-for="(feature, key) in storeFeature" :key="'feature-m' + key"
        class="position-relative" :data-aos="feature.aosSetting">
        <img :src="feature.smImageUrl" :alt="feature.title"
          class="w-100 h-100" style="object-fit: cover;">
        <div class="position-absolute bottom-0 end-0
          d-flex align-items-end flex-row-reverse p-2">
          <h4 class="h6 text-white bg-gray-dark bg-opacity-75 mb-0 p-2">
            {{ feature.tagA }}
          </h4>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary d-lg-none"
        @click="login" data-aos="fade-down" data-aos-offset="50">
        登入／加入會員<i class="bi bi-caret-right-fill ms-1"></i>
      </button>
      <button class="btn btn-primary d-none d-lg-inline-block"
        @click="login">
        登入／加入會員<i class="bi bi-caret-right-fill ms-1"></i>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.mark{
  background-image: linear-gradient(white 60%, lighten(#86b2c2, 20%) 40%);
  padding: 0rem 0.25rem;
  color: inherit;
}
.storeFeature{
  height: 300px;
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
.grid{
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(3 ,200px);
}
</style>
