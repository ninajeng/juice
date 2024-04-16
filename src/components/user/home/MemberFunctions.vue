<script>
import LoginOrRegisterFunction from '@/mixins/user/home/LoginOrRegisterFunction.vue';

export default {
  mixins: [LoginOrRegisterFunction],
};
</script>

<template>
  <section class="container py-3 py-lg-5">
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
              <p>訂單紀錄功能讓您輕鬆檢視訂單狀態與相關資料。</p>
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
        <img src="https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712668168884.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TaKC8Zs%2BxXk79wrgUEPtRNGhTlz2H4iIbeiGtwogBsP1EqBxyHz86QFfCCy%2BSQWiLmE9rxbeWDu5rVgFdeS5Fxf1TQoqmufpJJ7uoCOrlt7DTyyFsNWFQqQSCdGbWjYD5mvV2EuX%2FY3Q4t6tHRGqnUT7tcXe7onBvH4LBGIQO3LOoYB5F29D7R0UvZwkopyN4AZXpSd%2BikSdX42oHgMhNwmlemwRdUeg%2B2SHfSJ9GjtRWQAdwtff3oGErhmOFK%2F5Tv%2BBNU3s2s727rq8fDS0Z9jjnKQfv%2FKKg8HKhbyRnyX%2Ft08xSIxOd%2BaelMTp8hy1fTo0MGrCD6YSWp0IfB7iCg%3D%3D" alt="會員募集背景"
          class="img-fluid">
      </div>
    </div>
  </section>
</template>
