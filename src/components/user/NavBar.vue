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
      this.$refs.navContainer.classList.remove('sm-style');
      this.$refs.navContainer.classList.remove('bgWhite');
    },
    setZIndex() {
      let method = 'add';
      if ([...this.$refs.navCollapse.classList].indexOf('show') > -1) {
        method = 'remove';
      }
      this.$refs.navCollapse.classList[method]('show');
      this.$refs.navContainer.classList[method]('sm-style');
      this.$refs.navContainer.classList[method]('bgWhite');
    },
    setNavColor() {
      if ([...this.$refs.navCollapse.classList].indexOf('show') > -1) {
        return;
      }
      let method = 'add';
      if (window.scrollY === 0) {
        method = 'remove';
      }
      this.$refs.navContainer.classList[method]('bgWhite');
      this.$refs.navContainer.classList[method]('shadow-sm');
    },
    ...mapActions(cartStore, ['getCartInfo']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal', 'setUserData']),
  },
  mounted() {
    this.getData();
    window.addEventListener('scroll', this.setNavColor);
  },
};
</script>

<template>
  <LoginOffcanvas/>
  <div class="fixed-top navContainer" ref="navContainer">
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <logoHTML @click="closeNav"/>
        <button class="navbar-toggler p-2 mb-2"
          type="button"
          @click="setZIndex">
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse h-100" ref="navCollapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center h-75">
            <li class="nav-item py-2 py-lg-0 mx-2">
              <router-link class="nav-link link-primary p-1"
                to="/products"
                @click="closeNav">
                <i class="bi bi-list me-1"></i>查看菜單
              </router-link>
            </li>
            <li class="nav-item py-2 py-lg-0 mx-2" v-if="!hasLogin">
              <a href="#" class="nav-link link-primary p-1"
                @click.prevent="login">
                <i class="bi bi-person-fill me-1"></i>會員登入
              </a>
            </li>
            <template v-else>
              <li class="nav-item py-2 py-lg-0 mx-2">
                <a class="nav-link link-primary p-1" href="#" @click.prevent="logout">
                  <i class="bi bi-box-arrow-right me-1"></i>會員登出
                </a>
              </li>
              <li class="nav-item py-2 py-lg-0 ms-2 me-2 me-md-0 mt-auto">
                <router-link class="nav-link link-primary p-1"
                  to="/user/cart" @click="closeNav">
                  <i class="bi bi-cart-fill me-1"></i>購物車
                  <span class="badge rounded-pill bg-danger align-middle"
                    style="transform: translateY(-2px);">{{ cartItemNum }}</span>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-toggler{
  border: 1px solid var(--bs-primary);
  color: var(--bs-primary);
}
.navbar-toggler:hover{
  background-color: var(--bs-primary);
  color: var(--bs-white);
}
.navbar-toggler:focus{
  box-shadow: 0 0 0 0;
}
.nav-item{
  border: transparent 1px solid;
}
.nav-item .activeLink{
  border-bottom: #c2d8e0 1px solid;
}
.navContainer {
  z-index: 1020;
}
.navContainer.sm-style {
  z-index: 1050;
}
.navContainer{
  transition: background-color 0.5s;
}
.navContainer.bgWhite{
  background-color: #FFFFFF;
}
.sm-style {
  .navbar{
    height: 100vh;
  }
  .collapse{
    padding-top: 3rem;
    border-top: 1px solid var(--bs-border-color);
  }
}
@media (min-width: 992px) {
  .sm-style {
    .navbar{
      height: auto;
    }
    .collapse{
      padding-top: 0rem;
      border: 0px;
    }
  }
}
</style>
