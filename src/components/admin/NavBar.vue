<script>
import { mapState, mapActions } from 'pinia';
import LogoHTML from '@/components/LogoHTML.vue';
import adminAccountStore from '@/stores/adminAccountStore';
import LogoutWindow from '@/mixins/LogoutWindow.vue';
import ToastMessage from '@/mixins/ToastMessage.vue';

export default {
  data() {
    return {
      isShowMenu: true,
      isLoading: false,
    };
  },
  components: {
    LogoHTML,
  },
  mixins: [LogoutWindow, ToastMessage],
  computed: {
    ...mapState(adminAccountStore, ['hasCheckedAuth']),
  },
  methods: {
    async logout() {
      this.isLoading = true;
      this.isShowMenu = false;
      const res = await this.$adminRequest.logout();
      this.setLogoutState();
      this.$cookie.delAdminCookie();
      if (res.success) {
        this.$router.push({ name: 'adminLogin' });
      } else {
        this.alertWindow.show({
          type: 'Error',
          title: res.errorMessage,
          router: {
            method: 'replace',
            path: 'adminLogin',
          },
        });
      }
      this.toastShow('success', '已登出後台');
      this.isLoading = false;
    },
    ...mapActions(adminAccountStore, ['setLogoutState']),
  },
  mounted() {
    const navbarHeight = this.$refs.navbar.offsetHeight;
    this.$refs.content.style.height = `calc(100vh - ${navbarHeight}px )`;
  },
};
</script>

<template>
  <loading-view :active="isLoading"/>
  <div class="d-flex flex-column" style="height: 100vh;">
    <nav class="navbar bg-body-tertiary sticky-top p-0" style="z-index: 1020;" ref="navbar">
      <div class="container-fluid justify-content-start">
        <button class="btn me-2" @click="isShowMenu = !isShowMenu" v-if="hasCheckedAuth">
          <i class="bi bi-list"></i>
        </button>
        <h1 class="navbar-brand mb-0">
          <LogoHTML class="dashboard-logo"/>
        </h1>
        <p class="mb-0 h5 text-primary">後台管理</p>
        <div class="ms-auto">
          <router-link class="btn btn-outline-primary btn-sm me-3" to="/">
            回到前台
          </router-link>
          <button class="btn btn-outline-primary btn-sm"
            @click="showLogoutConfirm()"
            v-if="hasCheckedAuth">
            登出
          </button>
        </div>
      </div>
    </nav>
    <div class="flex-fill d-flex" ref="content">
      <div class="d-flex flex-fill overflow-y-auto">
        <div class="bg-light" :class="{show: isShowMenu && hasCheckedAuth}">
          <div class="list-group">
            <div v-if="hasCheckedAuth">
              <RouterLink class="list-group-item list-group-item-action border-0"
                to="products">
                產品管理
              </RouterLink>
              <RouterLink class="list-group-item list-group-item-action border-0"
                to="coupons">
                優惠券管理
              </RouterLink>
              <RouterLink class="list-group-item list-group-item-action border-0"
                to="orders">
                訂單管理
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="w-100 overflow-y-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-group {
  width: 0px;
  text-wrap: nowrap;
  overflow-x: hidden;
  transition: width 0.5s;
}
.show .list-group {
  width: 250px;
}
.list-group-item{
  background-color: var(--bs-primary-bg-subtle);
}
.list-group-item:hover{
  background-color: var(--bs-primary);
  color: #FFFFFF;
}
.activeLink{
  background-color: var(--bs-primary);
  color: #FFFFFF;
}
.dashboard-logo{
  width: 70px;
  margin-bottom: 6px;
}
</style>
