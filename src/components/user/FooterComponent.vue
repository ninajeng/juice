<script>
import LogoImageLink from '@/components/LogoImageLink.vue';

export default {
  components: {
    LogoImageLink,
  },
};
</script>
<template>
  <div class="bg-primary bg-opacity-25">
    <div class="container text-md-center py-4">
      <h5 class="mb-2 text-md-center">
        <LogoImageLink class="footer-logo"/>
      </h5>
      <p class="text-primary">© 2024 Juice oasis</p>
      <div class="d-md-flex justify-content-center text-gray-dark">
        <p class="me-4">營業時間：全年24小時營業</p>
        <p class="me-4">
          <a href="tel:+" class="text-gray-dark text-decoration-none">
            電話：03-33445566
          </a>
        </p>
        <p>地址：桃園市桃園區桃園路1號</p>
      </div>
      <p class="text-gray border-top border-gray mb-0 pt-4 mt-1">
        本網站無商業用途，僅供練習使用
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-logo{
  background-position: left;
}
@media (min-width: 768px){
  .footer-logo{
    background-position: center;
  }
}
</style>
