<script>
import 'bootstrap/dist/js/bootstrap';
import { mapState, mapActions } from 'pinia';
import LoginOffcanvas from '@/components/user/LoginOffcanvas.vue';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import navStyleStore from '@/stores/navStyleStore';
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
    ...mapState(navStyleStore, ['disableShadow']),
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
      this.clearData({});
      this.toastShow('success', '會員已登出');
      this.$router.replace({ name: 'home' });
      this.closeNav();
    },
    closeNav() {
      this.$refs.navCollapse.classList.remove('show');
      this.$refs.navContainer.classList.remove('sm-style');
      if (window.scrollY === 0) {
        this.$refs.navContainer.classList.remove('bgWhite');
      }
    },
    toggleCollapse() {
      let method = 'add';
      if ([...this.$refs.navCollapse.classList].indexOf('show') > -1) {
        method = 'remove';
      }
      this.$refs.navCollapse.classList[method]('show');
      this.$refs.navContainer.classList[method]('sm-style');
      this.setNavColor();
    },
    setNavColor() {
      let method = 'add';
      if ([...this.$refs.navCollapse.classList].indexOf('show') > -1) {
        this.$refs.navContainer.classList[method]('bgWhite');
        return;
      }
      if (window.scrollY === 0) {
        method = 'remove';
      }
      this.$refs.navContainer.classList[method]('bgWhite');
      if (this.disableShadow) {
        method = 'remove';
      }
      this.$refs.navContainer.classList[method]('shadow-sm');
    },
    ...mapActions(cartStore, ['getCartInfo']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal', 'clearData']),
  },
  mounted() {
    this.getData();
    window.addEventListener('scroll', this.setNavColor);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.setNavColor);
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
          @click="toggleCollapse">
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse h-100" ref="navCollapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center h-75">
            <li class="nav-item py-2 py-lg-0 mx-2">
              <router-link class="nav-link link-primary px-3 px-lg-1"
                :to="{name: 'products'}" @click="closeNav">
                <i class="bi bi-list me-2 me-lg-1"></i>查看菜單
              </router-link>
            </li>
            <li class="nav-item mx-2" v-if="!hasLogin">
              <a href="#" class="nav-link link-primary px-3 px-lg-1"
                @click.prevent="login">
                <i class="bi bi-person-fill me-2 me-lg-1"></i>會員登入
              </a>
            </li>
            <template v-else>
              <li class="dropdown mx-2">
                <a href="#" data-bs-toggle="dropdown"
                  class="nav-link dropdown-toggle link-primary px-3 px-lg-1">
                  <i class="bi bi-person-fill me-2 me-lg-1"></i>
                  <span class="me-1 d-lg-none">會員專區</span>
                </a>
                <ul class="dropdown-menu border-primary-subtle shadow">
                  <li class="dropdown-item">
                    <router-link class="link-primary text-decoration-none
                      d-block py-2 py-lg-1 px-3 mb-lg-2"
                      :to="{name: 'profile'}" @click="closeNav">
                      <i class="bi bi-person-lines-fill me-2"></i>個人資料
                    </router-link>
                  </li>
                  <li class="dropdown-item">
                    <router-link class="link-primary text-decoration-none d-block py-2 py-lg-0 px-3"
                      :to="{name: 'orders'}" @click="closeNav">
                      <i class="bi bi-list-ul me-2"></i>訂單查詢
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider border-primary-subtle"></li>
                  <li class="dropdown-item">
                    <a class="link-primary text-decoration-none d-block py-2 py-lg-0 px-3"
                      href="#" @click.prevent="logout">
                      <i class="bi bi-box-arrow-right me-2"></i>會員登出
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item py-2 py-lg-0 ms-2 me-2 me-md-0 mt-auto">
                <router-link class="nav-link link-primary px-3 px-lg-1"
                  :to="{name: 'cart'}" @click="closeNav">
                  <i class="bi bi-cart-fill me-2 me-lg-1"></i>購物車
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
  background-color: var(--bs-tertiary-bg);
}
.dropdown-item .activeLink{
  background-color: var(--bs-tertiary-bg);
}
.navContainer{
  transition: background-color 0.5s;
}
.navContainer.sm-style{
  transition: background-color 0s;
}
.navContainer.bgWhite{
  background-color: #FFFFFF;
}
.sm-style {
  .navbar{
    height: 100vh;
  }
  .collapse{
    border-top: 1px solid var(--bs-primary);
  }
}
.nav-item, .dropdown {
  width: 100%;
}
.dropdown-item {
  padding: 0px;
}
.dropdown-item:active {
  background-color: var(--bs-tertiary-bg);
}
.dropdown-item:hover {
  background-color: inherit;
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
  .nav-item, .dropdown {
    width: auto;
  }
  .nav-item .activeLink{
    border-bottom: var(--bs-primary) 1px solid;
    background-color: inherit
  }
}
</style>
