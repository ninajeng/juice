<script>
import { mapActions, mapState } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import userAccountStore from '@/stores/userAccountStore';
import productStore from '@/stores/productStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';
import FeedbackCard from '@/components/user/FeedbackCard.vue';

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
        },
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711620630111.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Xga7HNr006UL5hDUv3%2F0GLupYDpzkPh8pLhiCAo%2F5hCt%2Fyz1CudPGFQTlBv7BHBsCFrNWVaCHhaOWmtPo%2FesiNhfuz8yILOpcxVa%2FmPWH2QiOXe5e4MU99fyX1lkHyC2IN6hLiOwe83yu6e3YAVEH1qmVGzz%2BI%2BNX4VlHX5A90EZagN%2BLguwKxdp4JLtxHie8v5GYuoQXcvydRYiPxpd%2Brmlr0j5smAkQpI1iDRJUrDuN7%2BvRmvVo0WfX9b43SgjtML9dDmTIHLaC6y12QFd53%2FetlOZ6ZAn3F7W3zwTT7MJhaukLOrr5OvJkjuzhdDCsHAbh4arutdjR%2F51AQLzFg%3D%3D',
          tagA: '#美味飲品',
          tagB: '#多種選擇',
          col: 'col-6',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711634738218.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=j07%2B37FE4DiDpf1Iyv3veczojZ7DTYBx6PJVjLezdjYGvl9ifg4CuZAY4%2BrJsKo1J5yhT9qVHtHUpEgzwMLsuqJOcmGBE2LomIS%2F5YyhQb9Ous%2BjapG8bE%2BWoK%2FdOGQq0syXbC8nuep%2FOG5v9E2yXF2%2B%2Bcq6ITcU8JLDnxhKtkuWfSwINe1e7gYnYrppzr5HysFYwtkDDRHDMiclSJSolEeSyi4KNOBAI62%2BzGFYAjJWaIISG0KZLZXejp7UCclECRYTdvHDgLYariUR4xTHWcvJjVCfZL8SZpH2G7yVqoxo0RgUa3ol6q07kEMPSQ%2BqSf9B%2Ft1aFdd22F0duZPGIw%3D%3D',
          smRow: 2,
          smColumn: '1',
        },
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711613627743.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aTRGCioFKHaxtsaNXCsUxZoeBcetnv5YphdS2aFVqBUxMjrOIVLrQvB49h85vKgyN%2BHCfXlGBEqqyXiMQOs2Evd5CNWiy16bqsA4WSIfhTTnYJMGDXXxcmaPPveAdI68%2BuEsUB6vYLMG8wmduUOn365fuTSKjVsXfqRoA3EhxXxhSzHbGHw2reLmXKfdKfdZxOCGyRQ41FalFziPRVdhQG0QPLw5xoNtxn0aqH2xbSe%2F7jnfXuyZrlEXho33OLExY412ruAUSn875oJZ8qmyxS2BwtoMVRq7nXqHBU0UjzDLrpNMj3FSdORL4rkOI0VRnE6RL%2B6InWcW9t11hfL3Ew%3D%3D',
          tagA: '#健康營養',
          tagB: '#香甜可口',
          col: 'col-6',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711634874343.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DFov4k8zf4fLQd1%2FLHBT3S6U6EJAA%2FTcNZpQReV65Ow2JR2FWaC7UBN0Qj6EI4GZwBFF0Uix9SalfkdKQRo%2FWgXuHceA5xbd5cSXiqzwiBxRANt%2FmvJM2z0LYgI2nhclb%2FSeJP6M1ueXTD9rUiKFUDmTZ7IHNmRND3l4v9gp8PaO%2B2WdjzfbP6NT6cgPFWLTJJZR1HfD%2FbS%2FANGoiZedi7o%2FqLZQjoIyHf7luLgQ%2B3V0jZoAj4BDjjUTqYkn4t2qgmW7LV8%2BAENg7cqD3jL3sC49mHxY9dgjvNU%2BMI2N0befB7AyDSVIt0f20psBkvEuPGlB%2BGbhnv8%2BWlsx13Fxkw%3D%3D',
          smRow: 1,
          smColumn: '1',
        },
        {
          imgUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002217128.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qe2gVn8JqRGlmO7mXHhCl6XKS91JVOZOW1DQPFUkqrc81GHHn%2BJfK5ytFDIqVnypHSFZt%2FNfTQs%2BT2nJP5NebFZ1HpRmd1xLqO0Hon%2FTchtfyu8T6%2BGHlTMoOTv5YEW2bJkhhVOHNQxlxO1oojcsZZXBkqtEcc58CVDYLHEtG3UYT4Jxf0NBbcg7%2FZUDRxJHnRRAqX2gIX0f7BofAr8kVbKP4M7qL9Cnq7MyhFsyEtDmmnoXg7fFUjGRzT%2BXzDWHUZecjojAj1t08UT8Q%2F1dWG6gHIDI6vRYm8Jk4OPPK9sS33IKmp1MDjpDQi0AXIVlv4aWaudn85yVKpwbjlaZvw%3D%3D',
          tagA: '#不打烊',
          tagB: '#24小時服務',
          col: 'col-12',
          smImageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711002217128.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qe2gVn8JqRGlmO7mXHhCl6XKS91JVOZOW1DQPFUkqrc81GHHn%2BJfK5ytFDIqVnypHSFZt%2FNfTQs%2BT2nJP5NebFZ1HpRmd1xLqO0Hon%2FTchtfyu8T6%2BGHlTMoOTv5YEW2bJkhhVOHNQxlxO1oojcsZZXBkqtEcc58CVDYLHEtG3UYT4Jxf0NBbcg7%2FZUDRxJHnRRAqX2gIX0f7BofAr8kVbKP4M7qL9Cnq7MyhFsyEtDmmnoXg7fFUjGRzT%2BXzDWHUZecjojAj1t08UT8Q%2F1dWG6gHIDI6vRYm8Jk4OPPK9sS33IKmp1MDjpDQi0AXIVlv4aWaudn85yVKpwbjlaZvw%3D%3D',
          smRow: 1,
          smColumn: '1',
        },
      ],
      fruitIntroduce: [
        {
          title: '柳橙',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711869767538.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=U%2BzQkV4G8bbW7A7wv9WXoXq7RxaZctVt6BJJ6AFFuXYJdZW1FJa%2B%2BizlkA%2FCVLMYRjnT4ASOW5Ns31ME%2BikdqpNQKeFhC2GTHP9WCF%2FeJSFffPFSxc2WCDV18DwuvhMSR9GAIknq%2Bpjt7DeF5Fs85D%2Bx7FiGfvWzlJuVqxvEn2OdUpEp4CU5UTUIeaamoynNsoHpKfCy9HE59aI%2B0kNwX4fSuN9PRgyQFokDOr1fjaqNm7eTJxhHF1mUdEtXSqfz8%2B%2FegoHVLylS41udfyQzpZKVSecQB68EOfUKq%2FmNpMdfKI%2BwNGCTYcU%2BL4DdOL%2Fl%2FJIMXLF9zlpE3nvasZcrXQ%3D%3D',
          description: '柳橙富含維生素A、維生素C、抗氧化物質與膳食纖維，不僅營養豐富，也有助於改善腸道健康！',
        },
        {
          title: '莓果',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711869792756.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Oiae9h9%2BWtMdPb6yUejonP1FZcNTuAjOAdnsxoo5J9alAGA%2FOzKaJaGw6vC%2FaHXE8Fw6FTCZpZrpAll9vGFDx%2FLbKGg2w5iCb44XU%2B82KZjgRtWs9HHxs2fP3IDyU86Cc8D1y6ZyK3ucqz38dl7EHntz1wDeNSjcjR6Flazc%2B%2BtiKZnG9GjE09rqqjnUjvTGegpHtKLhqXzPIln0OothAF34btGEYk0FykBtKa4AIpOjlbEArj6IpgKJFGPq3XC4L1jx6rCr%2BBvwiA5tHwKMBFdhk%2BU2nR5jWUyR0bE0sbbp0bttPnA07q8U3ZgBJwX1g18388DemHBnSesOTg8vSg%3D%3D',
          description: '莓果含有豐富的抗氧化物質與維生素C，有助於維持身體健康，提高免疫力！',
        },
        {
          title: '西瓜',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711869946339.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IBIQB%2B4FGAFWW4FjGBFt9KgFwZ49OqGlCH9YLMCgYW0lCtqDjc0iwA%2FRWYmdAAMR83GhkETcv92zEQIjCNRw%2BCA6hP5HKmV9v8A3m6RvIfm7P6uTCzXkNBz8E6jxQfzMrZvWrfXrEkQ%2BfWtmyjtWPmzjTHGFdnqOJ7hUhZa0nS0ASmWXBWVIg0B1ROY4Jdrd58IW%2FW7x1CwmeU1ErDn04hihKqPHrKvWmwhjweCfCHgbP2GArkjX640NcZAa85PHAktB36vPAhQfblFDlX3OPZn1KX2ys53hwnzSG7nxSf0QOIyiT06GAqgMwDsAr5NPpogEFjPrPAlY0Ui9oUly1g%3D%3D',
          description: '西瓜含有維生素A、維生素C與豐富的水分，補充營養的同時也為身體補足水分！',
        },
        {
          title: '鳳梨',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711869928600.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jiANzUm7Y4zemnoU4F0Mf95vKj2BIFBUcIPUWGTUrJW0ARuKwD3j95IBDheeE0YseeSwEverfiiCUXS8nd9fVjdSNFeyStWzdKLUFuYcigTmv5GrnI%2B81tLV%2BPPDgwlGcDYOVLY6UYfdm4fycN%2B5QeUCbt4WWBWHw19Ts2zrVe0IAWJV8OP%2BQRIi803sfeGYdEOx%2FDOl2tEtgiMQLWh1gS0p0723LVSvkGJPiZwQ5z5%2FQwC8dSKJH%2Box2XlHkinlogPCQd%2Bswe1taNyOUkXKMdNOx5i7VlfnF%2F6etLj1pcSwnrPM5%2BFaJ5BjUDfEM3MR54uEqNMr5sCI4nViJRaawA%3D%3D',
          description: '鳳梨含有維生素A、維生素C、類胡蘿蔔素與消化酶，有助於促進腸道健康！',
        },
        {
          title: '奇異果',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711869980478.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=o2lCQkxtxVGkjVIFTPlmIoFumoPCme67u591xLPEjW9%2BuEsqqqzon8rfadbwTSUA3PCscpUklYrVFD%2FNkDJKA76UZpuN9v4mvEY4HBWmJxxYTraBioPLd1VNP%2BUhfA3hC8UoiwaJOzSoSvPwl1EpzHUhCCUsQUC7xHbDD8TnSdsac87xOTgVYmEEwvmPTG%2FMHN7ANqyjFiy8fTfa0rpKgNmmFEjERL%2BGqACMiV9biW2oE2j5vKZ5YWwo16SMcr1BTONdpkA9r9gxSJSdmcAtZtXaZoWtEX9bxXg8Bycv640xUAs8r7JDCeG3sPt5OpY6StBwSrzMWH%2FQhaEYKQrrOA%3D%3D',
          description: '奇異果含有維生素C、維生素E、維生素K與膳食纖維，有助於增強免疫系統！',
        },
        {
          title: '綜合水果',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711869994433.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bLTJnUUcaa28zclBfrvuGGJyaFkWSIGuEJCr%2BipllQlzGL3E%2BmGRwLWI%2FPQhrFMJQMA5k3R1YOPGwEgY7pBA9UOkEDkfbKDsvGJVtaQ0GO6TRZPrIQm0Wh1lxKBqssRexy1wVKDDm9p7Kl008aIZw6W4wq1ZPJvhaRSy3BVrzNGgmfGCymHwu%2FDwg8Ni6NmcWHTvxnNz0AnWPO6bqsSKZyv94z4QrWJc3ZkdYZzUhq0JQLpMWS4EJ292ebDG1D88Ws3D7CvGaCkRjghFQGqurmoWtj%2Bee%2F9BwjqXNpEyK%2FRvQ4HnoBX7%2BKxym79qzzF9ZD%2F9eAo7EcenmxO45%2FMfJg%3D%3D',
          description: '每種水果含有不同的營養素，綜合水果讓您一次補足多種營養！',
        },
      ],
      fruitIntroduceTop: [],
      fruitIntroduceBottom: [],
      introduceIndex: 0,
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
      isFeedbackLoading: true,
      isLoading: false,
    };
  },
  mixins: [CheckLogin],
  components: {
    FeedbackCard,
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(productStore, ['productList']),
    ...mapState(userAccountStore, ['hasLogin']),
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
      this.isLoading = false;
    },
    copyCode(code, e) {
      const successDOM = '<i class="bi bi-check me-1"></i>已複製';
      const errorDOM = '<i class="bi bi-x"></i>複製失敗';
      e.target.classList.add('disabled');
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(code)
          .then(() => {
            this.toastShow('success', '已複製優惠碼！');
            e.target.innerHTML = successDOM;
            e.target.classList.add('btn-success');
            e.target.classList.add('btn-outline-success');
            const delay = 3;
            for (let sec = 0; sec <= delay; sec += 1) {
              setTimeout(() => {
                if (sec !== delay) {
                  e.target.innerHTML = `${successDOM} (${delay - sec})`;
                } else {
                  this.resetBtn(e.target);
                }
              }, 1000 * sec);
            }
          })
          .catch(() => {
            this.copyError(e.target, errorDOM);
          });
      } else {
        this.copyError(e.target, errorDOM);
      }
    },
    resetBtn(btn) {
      const target = btn;
      target.innerHTML = '複製優惠碼';
      target.classList.remove('disabled');
      target.classList.remove('btn-success');
      target.classList.remove('btn-outline-success');
    },
    copyError(btn, errorDOM) {
      const target = btn;
      this.toastShow('success', '複製失敗，請稍後再嘗試');
      target.innerHTML = errorDOM;
      target.classList.add('btn-danger');
      target.classList.add('btn-outline-danger');
    },
    login() {
      if (!this.hasLogin) {
        this.setLoginWindowSignal(true);
      } else {
        this.toastShow('success', '您已登入會員！');
      }
    },
    ...mapActions(productStore, ['getProducts', 'setProductData']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal', 'clearData']),
  },
  async mounted() {
    this.isFeedbackLoading = true;
    this.fruitIntroduce.forEach((item, key) => {
      this.fruitIntroduce[key].index = key;
    });
    this.fruitIntroduceTop = this.fruitIntroduce.slice(0, this.fruitIntroduce.length / 2);
    this.fruitIntroduceBottom = this.fruitIntroduce.slice(this.fruitIntroduce.length / 2);
    const res = await this.$userRequest.getFeedback();
    if (!res.success) {
      this.toastShow('error', this.$errorMessage);
      return;
    }
    this.feedbacks = res.data.message;
    setTimeout(() => {
      const height = document.querySelector('.swiper').offsetHeight;
      document.querySelector('.swiper').style.height = `${height}px`;
      this.isFeedbackLoading = false;
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

  <section class="container mt-lg-5 mb-5 pt-5">
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
        class="bg-warning position-relative">
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
  </section>

  <section class="py-4 py-lg-5 mt-lg-5 bg-light">
    <h3 class="text-primary text-center mb-md-5 d-none d-lg-block">
      每一口水果都是對健康的呵護
    </h3>
    <h3 class="text-primary text-center mb-3 lh-base d-lg-none">
      每一口水果<span class="d-block">都是對健康的呵護</span>
    </h3>
    <div class="container d-none d-lg-block">
      <div class="row flex-nowrap align-items-center">
        <div class="col"
          v-for="(fruit, key) in fruitIntroduce" :key="'introduce-image' + key">
          <div class="position-relative"
            :class="{'border border-3 border-primary': introduceIndex === key}"
            style="transition: transform 0.5s;"
            :style="{'transform': introduceIndex === key ? 'scale(1.1)' : ''}">
            <img :src="fruit.imageUrl" :alt="fruit.title"
              class="img-fluid shadow" style="object-fit: cover;">
            <div class="position-absolute w-100 h-100 bg-dark top-0 introduceMask"
              :class="{'active': introduceIndex === key}"
              style="cursor: pointer;" @click="introduceIndex = key"></div>
          </div>
        </div>
      </div>
      <div class="position-relative d-flex" style="padding-top: 30px;">
        <template v-for="(fruit, key) in fruitIntroduce" :key="'introduce-description' + key">
          <div class="position-absolute arrow-up z-1"
            :class="{'active': introduceIndex === key}"
            :style="{'left': `${key * 100 / fruitIntroduce.length}%`,
            'margin-left': `calc(${50 / fruitIntroduce.length}% - 20px)`}"></div>
          <div class="introduce-card text-center p-2 z-0"
            :class="{'active': introduceIndex === key,
              'me-auto': key < fruitIntroduce.length * 2 / 3,
              'ms-auto': key >= fruitIntroduce.length / 3,}"
            style="transition: all 0.5s;">
            <div class="bg-white position-relative" style="padding: 2rem; max-width: 350px;">
              <p class="text-center" style="text-align: justify;">{{ fruit.description }}</p>
              <router-link :to="`products/search=${fruit.title.substr(0, 1)}`"
                class="btn btn-primary text-decoration-none stretched-link">
                {{ `${fruit.title}相關產品` }}<i class="bi bi-caret-right-fill ms-1"></i>
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="container d-lg-none mb-5">
      <div class="row flex-nowrap align-items-center">
        <div class="col"
          v-for="(fruit, key) in fruitIntroduceTop" :key="'introduce-image-smTop' + key">
          <div class="position-relative"
            :class="{'border border-3 border-primary': introduceIndex === key}"
            style="transition: transform 0.5s;"
            :style="{'transform': introduceIndex === key ? 'scale(1.1)' : ''}">
            <img :src="fruit.imageUrl" :alt="fruit.title"
              class="img-fluid shadow" style="object-fit: cover;">
            <div class="position-absolute w-100 h-100 bg-dark top-0 introduceMask"
              :class="{'active': introduceIndex === key}"
              style="cursor: pointer;" @click="introduceIndex = key"></div>
          </div>
        </div>
      </div>
      <div class="position-relative" style="padding-top: 30px; padding-bottom: 30px;">
        <template v-for="(fruit, key) in fruitIntroduceTop"
          :key="'introduce-description-smTop' + key">
          <div class="position-absolute arrow-up z-1"
            :class="{'active': introduceIndex === key}"
            :style="{'left': `${key * 100 / fruitIntroduceTop.length}%`,
            'margin-left': `calc(${50 / fruitIntroduceTop.length}% - 20px)`}"></div>
          <div class="introduce-card text-center p-2 z-0"
            :class="{'active': introduceIndex === key}"
            style="transition: all 0.5s;">
            <div class="bg-white" style="padding: 2rem;">
              <p class="text-center" style="text-align: justify;">{{ fruit.description }}</p>
              <router-link :to="`products/search=${fruit.title.substr(0, 1)}`"
                class="btn btn-primary text-decoration-none stretched-link">
                {{ `${fruit.title}相關產品` }}<i class="bi bi-caret-right-fill ms-1"></i>
              </router-link>
            </div>
          </div>
        </template>
        <template v-for="(fruit, key) in fruitIntroduceBottom"
          :key="'introduce-description-smBottom' + key">
          <div class="position-absolute arrow-down z-1"
            :class="{'active': introduceIndex === fruit.index}"
            :style="{'left': `${key * 100 / fruitIntroduceBottom.length}%`,
            'margin-left': `calc(${50 / fruitIntroduceBottom.length}% - 20px)`}"></div>
          <div class="introduce-card downToUp text-center p-2 z-0"
            :class="{'active': introduceIndex === fruit.index}"
            style="transition: all 0.5s;">
            <div class="bg-white" style="padding: 2rem;">
              <p class="text-center" style="text-align: justify;">{{ fruit.description }}</p>
              <router-link :to="`products/search=${fruit.title.substr(0, 1)}`"
                class="btn btn-primary text-decoration-none stretched-link">
                {{ `${fruit.title}相關產品` }}<i class="bi bi-caret-right-fill ms-1"></i>
              </router-link>
            </div>
          </div>
        </template>
      </div>
      <div class="row flex-nowrap align-items-center">
        <div class="col"
          v-for="(fruit, key) in fruitIntroduceBottom" :key="'introduce-image-smBottom' + key">
          <div class="position-relative"
            :class="{'border border-3 border-primary': introduceIndex === fruit.index}"
            style="transition: transform 0.5s;"
            :style="{'transform': introduceIndex === fruit.index ? 'scale(1.1)' : ''}">
            <img :src="fruit.imageUrl" :alt="fruit.title"
              class="img-fluid shadow" style="object-fit: cover;">
            <div class="position-absolute w-100 h-100 bg-dark top-0 introduceMask"
              :class="{'active': introduceIndex === fruit.index}"
              style="cursor: pointer;"
              @click="introduceIndex = fruit.index"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5 mt-lg-3">
    <h3 class="text-primary text-center" style="margin-bottom: 2.5rem;">週年慶好禮</h3>
    <div class="border p-3 pt-4 text-center position-relative mb-5">
      <h4 class="position-absolute top-0 start-50 translate-middle bg-white px-3">
        <span class="productBadge secondaryOutlineBadge d-inline-block me-2 my-1">
          好禮一
        </span>
        <span class="d-inline-block my-1">折扣碼優惠</span>
      </h4>
      <p class="mt-4">結帳使用週年慶折扣碼，享九五折優惠。</p>
      <div class="d-flex justify-content-center mb-3 flex-wrap">
        <p class="display-6 me-2 my-1 text-secondary">
          <i class="bi bi-ticket-perforated-fill fs-3"></i>
          {{ couponCode }}
        </p>
        <button
          type="button"
          class="btn btn-primary my-1 align-self-center"
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
        </span>
        <span class="d-inline-block my-1">官網限定優惠</span>
      </h4>
      <div class="position-relative" style="min-height: 300px;">
        <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
        <div class="mt-3 row justify-content-center align-items-center mb-md-3 text-start"
          :class="{'flex-row-reverse': key % 2 === 0}"
          v-for="(product, key) in onSaleData" :key="product.id">
          <div class="col-md-5 mb-4 mb-md-0"
            :class=" key % 2 === 0 ? 'text-end': 'text-start'">
            <div class="position-relative onSaleImage">
              <img :src="product.imageUrl" :alt="product.title"
                class="w-100" style="height: 250px; object-fit: cover;">
              <div class="position-absolute top-0 left-0 w-100 h-100
                bg-dark bg-opacity-50 text-white
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
    </div>
  </section>

  <section class="bg-light my-5 py-5">
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
          <FeedbackCard :feedback="feedback" />
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

  <section class="container mb-5 py-3 py-lg-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6 col-lg-5">
        <div class="pe-lg-3">
          <h3 class="text-primary mb-3">會員募集中</h3>
          <ul class="list-unstyled mb-0" style="text-align: justify;">
            <li class="d-flex">
              <i class="bi bi-stars me-2 text-primary"></i>
              <p>只要成為會員，不論是門市取貨或外送需求，都可以使用線上訂餐服務！</p>
            </li>
            <li class="d-flex">
              <i class="bi bi-stars me-2 text-primary"></i>
              <p>於會員專區設定常用訂購人資料後，結帳時可快速代入資料，簡單、快速、不麻煩！</p>
            </li>
            <li class="d-flex">
              <i class="bi bi-stars me-2 text-primary"></i>
              <p>將喜歡的產品加入收藏吧！訂購快速又方便。</p>
            </li>
            <li class="d-flex">
              <i class="bi bi-stars me-2 text-primary"></i>
              <p>訂單查詢功能讓您輕鬆檢視訂單狀態與訂單紀錄。</p>
            </li>
            <li class="d-flex">
              <i class="bi bi-stars me-2 text-primary"></i>
              <p>線上點餐還享有不定期優惠活動！</p>
            </li>
          </ul>
          <button class="btn btn-primary" @click="login">
            登入／加入會員<i class="bi bi-caret-right-fill ms-1"></i>
          </button>
        </div>
      </div>
      <div class="col-6 col-lg-4 d-none d-md-block align-self-stretch">
        <img src="https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711982308788.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=P4bAfhM%2FbbXQ2%2Fn7JvQfbNa6Yi8v6Bq1mgBB87UFNLOVedFQhkIPqAvDc2iEjyq%2F1JXRb7BwuEGJ3x2gjvtfKBL0XqPg9Fdm6yXlFt2NMCM0ijXNWaWEUrWaaWAk939NyNdyof52XLqACwWyWcQSdob9tIdbb%2BSsM3n5FAh8pxRO5abw7uMXLImz7JQ7wCVGZIf999x2wu%2F3UY02AR%2F0ZXWVsQV0aTDYwsDi7X1nDDI5a8xsTgfQRI4bl5uKpfhqTJEQCzr2S%2B%2Bjgw0XUGMndFOdk9G8%2B6kXAh4vI6x1IFl1O9cPs3%2FqoEDV%2BCtgUFzrMsZ3VJFyjIp5GWwvjxBlSg%3D%3D" alt="會員募集背景"
          class="img-fluid">
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner{
  height: calc(100vh - 30px);
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
.introduceMask{
  opacity: 0.5;
  &:hover{
    opacity: 0;
  }
  &.active{
    opacity: 0;
  }
}
.introduce-card{
  background-color: #e4ebef;
  display: none;
}
.introduce-card.active{
  display: block;
  opacity: 0;
  overflow: hidden;
  animation: cardUpToDown 0.5s forwards;
}
.introduce-card.downToUp.active{
  animation: cardDownToUp 0.5s forwards;
}
.arrow-up{
  top: 16px;
  border-style: solid;
  border-width: 0 15px 15px 15px;
  border-color: transparent transparent #e4ebef transparent;
  opacity: 0;
  &::after{
    content: '';
    position: absolute;
    top: 12px;
    left: -12px;
    border-style: solid;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #FFFFFF transparent;
  }
}
.arrow-up.active{
  animation: cardUpToDown 0.3s 0.2s forwards;
}
.arrow-down{
  bottom: 16px;
  border-style: solid;
  border-width: 15px 15px 0 15px;
  border-color: #e4ebef transparent transparent transparent;
  opacity: 0;
  &::after{
    content: '';
    position: absolute;
    bottom: 12px;
    left: -12px;
    border-style: solid;
    border-width: 12px 12px 0 12px;
    border-color: #FFFFFF transparent transparent transparent;
  }
}
.arrow-down.active{
  animation: cardDownToUp 0.3s 0.2s forwards;
}
@keyframes cardUpToDown{
  0%{
    opacity: 0;
    transform: translateY(-20%);
  }
  100%{
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes cardDownToUp{
  0%{
    opacity: 0;
    transform: translateY(20%);
  }
  100%{
    opacity: 1;
    transform: translateY(0%);
  }
}
.grid{
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(3 ,200px);
}
.onSaleImage .imageMask {
  opacity: 0;
  transition: all 0.5s;
}
.onSaleImage:hover .imageMask{
  opacity: 1;
}
</style>
