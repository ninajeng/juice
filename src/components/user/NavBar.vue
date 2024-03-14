<script>
import 'bootstrap/dist/js/bootstrap';
import { mapState, mapActions } from 'pinia';
import LoginOffcanvas from '@/components/user/LoginOffcanvas.vue';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import ToastMessage from '@/mixins/ToastMessage.vue';
import logoHTML from '../logoHTML.vue';

export default {
  data() {
    return {
      dropdown: null,
    };
  },
  mixins: [ToastMessage],
  components: {
    LoginOffcanvas,
    logoHTML,
  },
  watch: {
    hasLogin(isValid) {
      if (isValid) {
        this.getData();
      }
    },
  },
  computed: {
    ...mapState(cartStore, ['cartItemNum']),
    ...mapState(userAccountStore, ['hasLogin', 'userData']),
  },
  methods: {
    async getData() {
      if (this.hasLogin) {
        const resError = await this.getCartInfo(this.userData.id);
        if (resError) {
          this.toastShow('error', resError, 4000);
        }
      }
    },
    logout() {
      this.$userRequest.logout();
      this.setUserData({});
      this.toastShow('success', '會員已登出');
      this.$router.replace({ name: 'home' });
    },
    ...mapActions(cartStore, ['getCartInfo']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal', 'setUserData']),
  },
  mounted() {
    this.getData();
  },
};
</script>

<template>
  <LoginOffcanvas/>
  <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
    <div class="container">
      <logoHTML/>
      <button class="navbar-toggler p-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent">
        <span class=""><i class="bi bi-list"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link class="nav-link link-primary px-3" to="/products">
              <i class="bi bi-list me-1"></i>查看菜單
            </router-link>
          </li>
          <li class="nav-item" v-if="!hasLogin">
            <a href="#" class="nav-link link-primary ps-3 pe-0"
              @click.prevent="setLoginWindowSignal(true)">
              <i class="bi bi-person-fill"></i>會員登入
            </a>
          </li>
          <template v-else>
            <li class="nav-item dropdown" data-bs-toggle="dropdown">
              <a href="#" class="nav-link dropdown-toggle link-primary px-3" @click.prevent="">
                <i class="bi bi-person-fill"></i>
              </a>
              <ul class="dropdown-menu border-primary-subtle">
                <li>
                  <a class="dropdown-item link-primary" href="#">
                    <i class="bi bi-person-lines-fill me-2"></i>個人資料
                  </a>
                </li>
                <li>
                  <a class="dropdown-item link-primary" href="#">
                    <i class="bi bi-list-ul me-2"></i>訂單查詢
                  </a>
                </li>
                <li><hr class="dropdown-divider border-primary-subtle"></li>
                <li>
                  <a class="dropdown-item link-primary" href="#" @click.prevent="logout">
                    <i class="bi bi-box-arrow-right me-2"></i>會員登出
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item mt-1">
              <router-link class="nav-link link-primary ps-3 pe-0 mb-1" to="/user/cart">
                <i class="bi bi-cart-fill me-1"></i>購物車
                <span class="badge rounded-pill bg-danger align-middle"
                  style="transform: translateY(-2px);">{{ cartItemNum }}</span>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-toggler{
  border: 1px solid var(--bs-primary);
  span{
    color: var(--bs-primary);
  }
}
.navbar-toggler:hover{
  background-color: var(--bs-primary);
  span{
    color: var(--bs-white);
  }
}
.navbar-toggler:focus{
  box-shadow: 0 0 0 0;
}
</style>
