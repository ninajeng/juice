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
    login() {
      this.setLoginWindowSignal(true);
      this.closeNav();
    },
    logout() {
      this.$userRequest.logout();
      this.setUserData({});
      this.toastShow('success', '會員已登出');
      this.$router.replace({ name: 'home' });
      this.closeNav();
    },
    closeNav() {
      this.$refs.navCollapse.classList.remove('show');
    },
    setZIndex() {
      const collapseClassList = this.$refs.navCollapse.classList;
      if ([...collapseClassList].indexOf('show') > -1) {
        collapseClassList.remove('show');
        this.$refs.navbar.style['z-index'] = '1020';
      } else {
        collapseClassList.add('show');
        this.$refs.navbar.style['z-index'] = '1050';
      }
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
  <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm" ref="navbar">
    <div class="container">
      <logoHTML @click="closeNav"/>
      <button class="navbar-toggler p-2"
        type="button"
        @click="setZIndex">
        <span class=""><i class="bi bi-list"></i></span>
      </button>

      <!-- data-bs-toggle="collapse"
        data-bs-target="#navbarContent" -->
      <div class="collapse navbar-collapse" id="navbarContent" ref="navCollapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link class="nav-link link-primary px-3"
              to="/products"
              @click="closeNav">
              <i class="bi bi-list me-1"></i>查看菜單
            </router-link>
          </li>
          <li class="nav-item" v-if="!hasLogin">
            <a href="#" class="nav-link link-primary px-3 pe-lg-0"
              @click.prevent="login">
              <i class="bi bi-person-fill me-1"></i>會員登入
            </a>
          </li>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link link-primary px-3" href="#" @click.prevent="logout">
                <i class="bi bi-box-arrow-right me-1"></i>會員登出
              </a>
            </li>
            <li class="nav-item mt-1">
              <router-link class="nav-link link-primary px-3 pe-lg-0 mb-1"
                to="/user/cart" @click="closeNav">
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
