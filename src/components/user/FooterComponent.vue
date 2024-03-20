<template>
  <div class="bg-primary bg-opacity-25">
    <div class="container text-md-center py-4">
      <div class="mb-3 position-relative">
        <router-link
          class="link-primary text-decoration-none h3"
          to="/"
          >果時</router-link>
      </div>
      <div class="d-md-flex justify-content-center text-gray-dark">
        <p class="me-4">營業時間：全年無休、24小時營業</p>
        <p class="me-4">
          <a href="tel:+" class="text-gray-dark text-decoration-none">
            電話：03-33445566
          </a>
        </p>
        <p>地址：桃園市桃園區桃園路1號</p>
      </div>
      <ul
        class="d-none d-md-flex flex-wrap w-100 justify-content-center list-unstyled mb-3"
      >
        <li>
          <router-link
            class="link-gray text-decoration-none px-3 border-end border-2"
            to="/"
            >使用條款</router-link
          >
        </li>
        <li>
          <router-link
            class="link-gray text-decoration-none px-3 border-end border-2"
            to="/"
            >隱私權政策</router-link
          >
        </li>
        <li>
          <router-link
            class="link-gray text-decoration-none px-3"
            :to="{name: 'adminLogin'}"
            >後台登入</router-link
          >
        </li>
      </ul>
      <p class="text-primary">© 2024~∞ - JuiceOasis</p>
      <p class="text-gray border-top border-gray mb-0 pt-4 mt-1">
        本網站無商業用途，僅供練習使用
      </p>
    </div>
  </div>
</template>
