<script>
import LoginOrRegisterFunction from '@/mixins/user/home/LoginOrRegisterFunction.vue';

export default {
  data() {
    return {
      storeFeature: [
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711982245875.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LVOAVn3yseMLY%2FjwoXK9ljJzEbRkk2w9qbytVqe1PhLWfIPuRne40AFaDHnV%2F6Rdvo5eNoGM7uTEAUEU3FOoMN%2B1en01CgY6j%2B8eVQhnvYtIDEk1%2BCgF3gB79K2qOfg8Eo8CPClKJt0VucCWZVoW307Y3CTow0cOuKQkckwwVVcmQW7GY9SunFKuLwZCmdx%2BJDuCtR2uBhZE6IdiNjX5CthaStvKeF2xwCSHhA1Ysm2oGzPs7s93vAJiV12yFvaBoPlLLQTHuQ6yIqjGIlN%2B8kufo4c8gR7M1%2FPqqLsUkAnhUHkS61HZF7ITYjFDDlOBWwXZMWOC7InN8fAo9jEFzw%3D%3D',
          tagA: '#產地直送',
          tagB: '#新鮮蔬果',
          col: 'col-12',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711982245875.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LVOAVn3yseMLY%2FjwoXK9ljJzEbRkk2w9qbytVqe1PhLWfIPuRne40AFaDHnV%2F6Rdvo5eNoGM7uTEAUEU3FOoMN%2B1en01CgY6j%2B8eVQhnvYtIDEk1%2BCgF3gB79K2qOfg8Eo8CPClKJt0VucCWZVoW307Y3CTow0cOuKQkckwwVVcmQW7GY9SunFKuLwZCmdx%2BJDuCtR2uBhZE6IdiNjX5CthaStvKeF2xwCSHhA1Ysm2oGzPs7s93vAJiV12yFvaBoPlLLQTHuQ6yIqjGIlN%2B8kufo4c8gR7M1%2FPqqLsUkAnhUHkS61HZF7ITYjFDDlOBWwXZMWOC7InN8fAo9jEFzw%3D%3D',
          smRow: 1,
          smColumn: '2',
          aosSetting: 'zoom-in',
        },
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711620630111.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Xga7HNr006UL5hDUv3%2F0GLupYDpzkPh8pLhiCAo%2F5hCt%2Fyz1CudPGFQTlBv7BHBsCFrNWVaCHhaOWmtPo%2FesiNhfuz8yILOpcxVa%2FmPWH2QiOXe5e4MU99fyX1lkHyC2IN6hLiOwe83yu6e3YAVEH1qmVGzz%2BI%2BNX4VlHX5A90EZagN%2BLguwKxdp4JLtxHie8v5GYuoQXcvydRYiPxpd%2Brmlr0j5smAkQpI1iDRJUrDuN7%2BvRmvVo0WfX9b43SgjtML9dDmTIHLaC6y12QFd53%2FetlOZ6ZAn3F7W3zwTT7MJhaukLOrr5OvJkjuzhdDCsHAbh4arutdjR%2F51AQLzFg%3D%3D',
          tagA: '#美味飲品',
          tagB: '#多種選擇',
          col: 'col-6',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711634738218.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=j07%2B37FE4DiDpf1Iyv3veczojZ7DTYBx6PJVjLezdjYGvl9ifg4CuZAY4%2BrJsKo1J5yhT9qVHtHUpEgzwMLsuqJOcmGBE2LomIS%2F5YyhQb9Ous%2BjapG8bE%2BWoK%2FdOGQq0syXbC8nuep%2FOG5v9E2yXF2%2B%2Bcq6ITcU8JLDnxhKtkuWfSwINe1e7gYnYrppzr5HysFYwtkDDRHDMiclSJSolEeSyi4KNOBAI62%2BzGFYAjJWaIISG0KZLZXejp7UCclECRYTdvHDgLYariUR4xTHWcvJjVCfZL8SZpH2G7yVqoxo0RgUa3ol6q07kEMPSQ%2BqSf9B%2Ft1aFdd22F0duZPGIw%3D%3D',
          smRow: 2,
          smColumn: '1',
          aosSetting: 'fade-up',
        },
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711613627743.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aTRGCioFKHaxtsaNXCsUxZoeBcetnv5YphdS2aFVqBUxMjrOIVLrQvB49h85vKgyN%2BHCfXlGBEqqyXiMQOs2Evd5CNWiy16bqsA4WSIfhTTnYJMGDXXxcmaPPveAdI68%2BuEsUB6vYLMG8wmduUOn365fuTSKjVsXfqRoA3EhxXxhSzHbGHw2reLmXKfdKfdZxOCGyRQ41FalFziPRVdhQG0QPLw5xoNtxn0aqH2xbSe%2F7jnfXuyZrlEXho33OLExY412ruAUSn875oJZ8qmyxS2BwtoMVRq7nXqHBU0UjzDLrpNMj3FSdORL4rkOI0VRnE6RL%2B6InWcW9t11hfL3Ew%3D%3D',
          tagA: '#健康營養',
          tagB: '#香甜可口',
          col: 'col-6',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711634874343.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DFov4k8zf4fLQd1%2FLHBT3S6U6EJAA%2FTcNZpQReV65Ow2JR2FWaC7UBN0Qj6EI4GZwBFF0Uix9SalfkdKQRo%2FWgXuHceA5xbd5cSXiqzwiBxRANt%2FmvJM2z0LYgI2nhclb%2FSeJP6M1ueXTD9rUiKFUDmTZ7IHNmRND3l4v9gp8PaO%2B2WdjzfbP6NT6cgPFWLTJJZR1HfD%2FbS%2FANGoiZedi7o%2FqLZQjoIyHf7luLgQ%2B3V0jZoAj4BDjjUTqYkn4t2qgmW7LV8%2BAENg7cqD3jL3sC49mHxY9dgjvNU%2BMI2N0befB7AyDSVIt0f20psBkvEuPGlB%2BGbhnv8%2BWlsx13Fxkw%3D%3D',
          smRow: 1,
          smColumn: '1',
          aosSetting: 'fade-right',
        },
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002217128.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qe2gVn8JqRGlmO7mXHhCl6XKS91JVOZOW1DQPFUkqrc81GHHn%2BJfK5ytFDIqVnypHSFZt%2FNfTQs%2BT2nJP5NebFZ1HpRmd1xLqO0Hon%2FTchtfyu8T6%2BGHlTMoOTv5YEW2bJkhhVOHNQxlxO1oojcsZZXBkqtEcc58CVDYLHEtG3UYT4Jxf0NBbcg7%2FZUDRxJHnRRAqX2gIX0f7BofAr8kVbKP4M7qL9Cnq7MyhFsyEtDmmnoXg7fFUjGRzT%2BXzDWHUZecjojAj1t08UT8Q%2F1dWG6gHIDI6vRYm8Jk4OPPK9sS33IKmp1MDjpDQi0AXIVlv4aWaudn85yVKpwbjlaZvw%3D%3D',
          tagA: '#不打烊',
          tagB: '#24小時服務',
          col: 'col-12',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002217128.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qe2gVn8JqRGlmO7mXHhCl6XKS91JVOZOW1DQPFUkqrc81GHHn%2BJfK5ytFDIqVnypHSFZt%2FNfTQs%2BT2nJP5NebFZ1HpRmd1xLqO0Hon%2FTchtfyu8T6%2BGHlTMoOTv5YEW2bJkhhVOHNQxlxO1oojcsZZXBkqtEcc58CVDYLHEtG3UYT4Jxf0NBbcg7%2FZUDRxJHnRRAqX2gIX0f7BofAr8kVbKP4M7qL9Cnq7MyhFsyEtDmmnoXg7fFUjGRzT%2BXzDWHUZecjojAj1t08UT8Q%2F1dWG6gHIDI6vRYm8Jk4OPPK9sS33IKmp1MDjpDQi0AXIVlv4aWaudn85yVKpwbjlaZvw%3D%3D',
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
        class="bg-warning position-relative" :data-aos="feature.aosSetting">
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
