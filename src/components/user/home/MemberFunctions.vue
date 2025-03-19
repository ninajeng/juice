<script>
import LoginOrRegisterFunction from '@/mixins/user/home/LoginOrRegisterFunction.vue';

export default {
  data() {
    return {
      info: [
        '只要成為會員，不論是門市取貨或外送需求，都可以使用線上訂餐服務！',
        '於會員專區設定常用訂購人資料後，結帳時可快速代入資料，簡單、快速、不麻煩！',
        '將喜歡的產品加入收藏吧！訂購快速又方便。',
        '訂單紀錄功能讓您輕鬆檢視訂單狀態與相關資料。',
        '線上點餐還享有不定期優惠活動！',
      ],
    };
  },
  mixins: [LoginOrRegisterFunction],
};
</script>

<template>
  <section class="container py-3 py-lg-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6 col-lg-5">
        <div class="pe-lg-3">
          <h3 class="text-primary mb-3">會員募集中</h3>
          <ul class="list-unstyled mb-0 overflow-hidden" style="text-align: justify;">
            <li class="d-flex" v-for="(text, key) in info" :key="'memberInfo' + key"
              data-aos="fade-left" :data-aos-duration="300 + key * 100" data-aos-offset="20">
              <i class="bi bi-stars me-2 text-primary"></i>
              <p>{{ text }}</p>
            </li>
          </ul>
          <button class="btn btn-primary" @click="login">
            登入／加入會員<i class="bi bi-caret-right-fill ms-1"></i>
          </button>
        </div>
      </div>
      <div class="col-6 col-lg-4 d-none d-md-block align-self-stretch">
        <img src="https://res.cloudinary.com/derxrcfij/image/upload/v1742290193/member_pfcx9e.jpg" alt="會員募集背景"
          class="img-fluid">
      </div>
    </div>
  </section>
</template>
