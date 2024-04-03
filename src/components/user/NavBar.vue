<script>
import 'bootstrap/dist/js/bootstrap';
import { mapState, mapActions } from 'pinia';
import LoginOffcanvas from '@/components/user/LoginOffcanvas.vue';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';
import collectStore from '@/stores/collectStore';
import navStyleStore from '@/stores/navStyleStore';
import LogoutWindow from '@/mixins/LogoutWindow.vue';
import ToastMessage from '@/mixins/ToastMessage.vue';
import LogoHTML from '@/components/LogoHTML.vue';

export default {
  data() {
    return {
      dropdown: null,
      isLoading: false,
    };
  },
  mixins: [LogoutWindow, ToastMessage],
  components: {
    LoginOffcanvas,
    LogoHTML,
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
    async logout() {
      this.isLoading = true;
      this.$userRequest.logout();
      this.clearData({});
      this.clearCollectInfo();
      this.toastShow('success', '會員已登出');
      this.$router.replace({ name: 'home' });
      this.closeNav();
      this.isLoading = false;
    },
    closeNav() {
      this.$refs.navCollapse.classList.remove('show');
      this.$refs.navContainer.classList.remove('sm-style');
      this.$refs.toggler.classList.remove('active');
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
      this.$refs.toggler.classList[method]('active');
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
    ...mapActions(userAccountStore, ['setLoginWindowSignal', 'clearData']),
    ...mapActions(cartStore, ['getCartInfo']),
    ...mapActions(collectStore, ['clearCollectInfo']),
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
  <LoadingView :active="isLoading"/>
  <LoginOffcanvas/>
  <div class="fixed-top navContainer d-flex flex-column" ref="navContainer">
    <div class="container">
      <nav class="navbar justify-content-between" ref="navbar">
        <button class="d-block d-lg-none navbar-toggler p-2"
          type="button" ref="toggler"
          @click="toggleCollapse">
          <i class="bi bi-list"></i>
        </button>
        <h1 class="fs-2 mb-0 me-0">
          <LogoHTML @click="closeNav"/>
        </h1>
        <a href="#" class="link-primary d-lg-none py-1 text-decoration-none"
          @click.prevent="login" v-if="!hasLogin">
          <i class="bi bi-person-fill me-1"></i>登入
        </a>
        <p class="mb-0 nav-item d-lg-none" v-else>
          <router-link class="link-primary py-1"
            :to="{name: 'cart'}">
            <i class="bi bi-cart-fill me-1"></i>
            <span class="badge rounded-pill bg-danger align-middle"
              style="transform: translateY(-2px);">{{ cartItemNum }}</span>
          </router-link>
        </p>
        <div class="d-none d-lg-block">
          <ul class="navbar-nav d-flex flex-row">
            <li class="nav-item mx-2">
              <router-link class="nav-link link-primary px-1"
                :to="{name: 'products'}">
                <i class="bi bi-list me-1"></i>查看菜單
              </router-link>
            </li>
            <li class="nav-item mx-2" v-if="!hasLogin">
              <a href="#" class="nav-link link-primary px-1"
                @click.prevent="login">
                <i class="bi bi-person-fill me-1"></i>會員登入
              </a>
            </li>
            <template v-else>
              <li class="nav-item mx-2">
                <router-link class="nav-link link-primary px-1"
                  :to="{name: 'collection'}">
                  <i class="bi bi-suit-heart-fill me-1"></i>我的收藏
                </router-link>
              </li>
              <li class="dropdown mx-2">
                <a href="#" data-bs-toggle="dropdown"
                  class="nav-link dropdown-toggle link-primary px-1">
                  <i class="bi bi-person-fill me-1"></i>
                  <span class="me-1 d-lg-none">會員專區</span>
                </a>
                <ul class="dropdown-menu border-primary-subtle shadow">
                  <li class="dropdown-item">
                    <router-link class="link-primary text-decoration-none
                      d-block py-2 py-lg-1 px-3 mb-lg-1"
                      :to="{name: 'profile'}">
                      <i class="bi bi-person-lines-fill me-2"></i>個人資料
                    </router-link>
                  </li>
                  <li class="dropdown-item">
                    <router-link class="link-primary text-decoration-none d-block py-2 py-lg-1 px-3"
                      :to="{name: 'orders'}">
                      <i class="bi bi-list-ul me-2"></i>訂單查詢
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider border-primary-subtle"></li>
                  <li class="dropdown-item">
                    <a class="link-primary text-decoration-none d-block py-2 py-lg-0 px-3"
                      href="#" @click.prevent="showLogoutConfirm()">
                      <i class="bi bi-box-arrow-right me-2"></i>會員登出
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item ms-2 me-0">
                <router-link class="nav-link link-primary px-1"
                  :to="{name: 'cart'}">
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
    <div class="container collapse flex-fill px-4 py-3 overflow-y-auto"
     ref="navCollapse">
      <div class="row g-3 justify-content-center">
        <div class="col-6">
          <router-link class="sm-nav-item"
            :to="{name: 'products'}" @click="closeNav">
            <i class="bi bi-list me-1"></i>
            <span class="text-center">查看<span class="d-inline-block">菜單</span></span>
          </router-link>
        </div>
        <template v-if="!hasLogin">
          <div class="col-6">
            <a href="#" class="sm-nav-item" @click.prevent="login">
              <i class="bi bi-person-fill me-1"></i>
              <span class="text-center">會員<span class="d-inline-block">登入</span></span>
          </a>
          </div>
        </template>
        <template v-else>
          <div class="col-6">
            <router-link class="sm-nav-item"
              :to="{name: 'collection'}" @click="closeNav">
              <i class="bi bi-suit-heart-fill me-1"></i>
              <span class="text-center">我的<span class="d-inline-block">收藏</span></span>
            </router-link>
          </div>
          <div class="col-6">
            <router-link class="sm-nav-item"
              :to="{name: 'profile'}" @click="closeNav">
              <i class="bi bi-person-lines-fill me-1"></i>
              <span class="text-center">個人<span class="d-inline-block">資料</span></span>
            </router-link>
          </div>
          <div class="col-6">
            <router-link class="sm-nav-item"
              :to="{name: 'orders'}" @click="closeNav">
              <i class="bi bi-list-ul me-1"></i>
              <span class="text-center">訂單<span class="d-inline-block">查詢</span></span>
            </router-link>
          </div>
          <div class="col-12">
            <router-link class="sm-nav-item"
              :to="{name: 'cart'}" @click="closeNav">
              <i class="bi bi-cart-fill me-1"></i><span class="me-1">購物車</span>
              <span class="badge rounded-pill bg-danger mt-1"
                style="transform: translateY(-2px);">{{ cartItemNum }}</span>
            </router-link>
          </div>
        </template>
      </div>
      <div class="mt-auto" v-if="hasLogin">
        <button type="button" class="btn btn-outline-primary w-100 border-primary-subtle mt-3"
          @click="showLogoutConfirm()">
          <i class="bi bi-box-arrow-right me-1"></i>會員登出
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-toggler{
  border: 1px solid var(--bs-primary);
  color: var(--bs-primary);
  &:active{
    background-color: var(--bs-primary);
    color: var(--bs-white);
  }
  &:focus{
    box-shadow: 0 0 0 0;
  }
  &.active .bi-list::before{
    content: '\f659';
  }
}
.nav-item{
  border: transparent 1px solid;
  .activeLink{
    border-bottom: var(--bs-primary) 1px solid;
  }
}
.sm-nav-item {
  cursor: pointer;
  border: 1px solid var(--bs-primary);
  background-color: #FFFFFF;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0.5rem;
  text-decoration: none;
  aspect-ratio: 3;
  &.activeLink{
    background-color: var(--bs-primary-bg-subtle);
  }
}
@media (min-width: 676px) {
  .sm-nav-item {
    aspect-ratio: 6;
  }
}
.dropdown-menu{
  position: absolute;
  top: 80%;
}
.dropdown-item {
  padding: 0px;
  .activeLink{
    background-color: var(--bs-tertiary-bg);
  }
  &:active{
    background-color: var(--bs-tertiary-bg);
  }
}
.navContainer{
  transition: background-color 0.5s;
  &.sm-style{
    transition: background-color 0s;
  }
  &.bgWhite{
    background-color: #FFFFFF;
  }
}
.sm-style {
  height: 100vh;
}
.collapse{
  display: none;
  &.show{
    display: flex;
    flex-direction: column;
  }
}
@media (min-width: 992px) {
  .sm-style {
    height: auto;
  }
  .collapse.show{
    display: none;
  }
}
</style>
