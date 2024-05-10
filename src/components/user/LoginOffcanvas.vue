<script>
import { mapState, mapActions } from 'pinia';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { register, login } from '@/api/userRequest';
import collectStore from '@/stores/collectStore';
import userAccountStore from '@/stores/userAccountStore';
import ToastMessage from '@/mixins/ToastMessage.vue';
import LogoImageLink from '@/components/LogoImageLink.vue';

export default {
  data() {
    return {
      offcanvas: null,
      useDemoAccount: false,
      loginData: {
        email: '',
        password: '',
      },
      loginError: '',
      registerData: {
        name: '',
        email: '',
        password: '',
      },
      registerError: '',
      isRegister: false,
      isAliveForm: true,
      passwordDoubleCheck: '',
      isLoading: false,
    };
  },
  mixins: [ToastMessage],
  components: {
    LogoImageLink,
  },
  watch: {
    loginWindowSignal(show) {
      if (show) {
        this.offcanvas.show();
        this.setLoginWindowSignal(false);
      }
    },
    isRegister(value) {
      if (value) {
        this.clearLoginData();
      } else {
        this.clearRegisterData();
      }
    },
    useDemoAccount(use) {
      if (use) {
        this.loginData.email = import.meta.env.VITE_DEMO_EMAIL;
        this.loginData.password = import.meta.env.VITE_DEMO_PASSWORD;
      }
    },
  },
  computed: {
    ...mapState(userAccountStore, ['setUserData', 'loginWindowSignal']),
  },
  methods: {
    deactivateForm() {
      this.isAliveForm = false;
      this.clearLoginData();
      this.clearRegisterData();
    },
    activateForm() {
      this.isAliveForm = true;
      this.isRegister = false;
    },
    clearLoginData() {
      this.loginData = {
        email: '',
        password: '',
      };
      this.loginError = '';
      this.useDemoAccount = false;
    },
    clearRegisterData() {
      this.registerData = {
        name: '',
        email: '',
        password: '',
      };
      this.registerError = '';
      this.passwordDoubleCheck = '';
    },
    async login() {
      this.isLoading = true;
      const res = await login(this.loginData);
      if (res.success) {
        const { accessToken, user } = res.data;
        this.$cookie.setUserToken(accessToken);
        this.$cookie.setUserId(user.id);
        this.setUserData(user);
        await this.getCollection();
        this.offcanvas.hide();
      } else if (res.errorMessage.data === 'Cannot find user') {
        this.loginError = '此用戶不存在，請先註冊！';
      } else {
        this.loginError = '登入失敗！請確認帳號與密碼是否正確。';
      }
      this.isLoading = false;
    },
    async register() {
      this.isLoading = true;
      const res = await register(this.registerData);
      if (res.success) {
        this.isLoading = false;
        this.toastShow('success', '註冊成功，繼續登入吧！', 2500);
        this.registerData = {};
        this.passwordDoubleCheck = '';
        this.isRegister = false;
        return;
      }
      if (res.errorMessage.data === 'Email already exists') {
        this.registerError = '此用戶已註冊過，請直接登入。';
      } else {
        this.registerError = this.$errorMessage;
      }
      this.isLoading = false;
    },
    ...mapActions(collectStore, ['getCollection']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal']),
  },
  mounted() {
    const offcanvasDOM = this.$refs.offcanvas;
    this.offcanvas = new Offcanvas(offcanvasDOM);
    offcanvasDOM.addEventListener('hide.bs.offcanvas', this.deactivateForm);
    offcanvasDOM.addEventListener('hidden.bs.offcanvas', this.activateForm);
  },
  beforeUnmount() {
    const offcanvasDOM = this.$refs.offcanvas;
    offcanvasDOM.removeEventListener('hide.bs.offcanvas', this.deactivateForm);
    offcanvasDOM.removeEventListener('hidden.bs.offcanvas', this.activateForm);
  },
};
</script>

<template>
  <loading-view :active="isLoading" />
  <div class="offcanvas offcanvas-end" ref="offcanvas">
    <div class="offcanvas-header justify-content-between justify-content-lg-end pt-0 pt-lg-3">
      <LogoImageLink style="background-position: left" class="d-lg-none" @click="offcanvas.hide()"/>
      <button type="button" class="btn-close" @click="offcanvas.hide()"></button>
    </div>
    <div class="offcanvas-body pb-5" style=" background-image: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)), url(https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711982111486.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HnPdSBNaKmoZfxVZbXNDrrMvD8tqK%2FqEWI%2FOwjTzW5stOuO1V1ldSWGfxepLBBepqd9g%2F6T9zkhluqF%2FmEsdxojN4rtzVdlIjVM0hCDCtbdSL5eIkO3T1h1P7onbXtuzwhyJnqRmLxLIvVlGZQVEtBh37I%2FkvcjD%2FWjfTkcz6BMEAvQAM8tp9qY6sk6OZeOrAopWDv8jvvAA9u6Vn9a%2Fx%2BUQMf9UXUBL06hC70kmTMidKZ2j10JLEznUZ%2FO%2Fi1IJKnqkV1vOQudRXCeBELtuMR1xSaVqN3OHU4ZMrQ7pwQ3hj5G4pzz8zgbN2jZNVRXKQauhRjxeNZ9buMD8XiRTQA%3D%3D); background-size: cover; background-position: right center">
      <div class="h-100 position-relative overflow-y-hidden" v-if="isAliveForm">
        <div class="position-absolute w-100 h-100 px-2"
          :class="isRegister ? 'hideContent' : 'showContent'">
          <div class="d-flex h-100">
            <div class="my-auto w-100">
              <div class="content">
                <h3 class="mb-lg-0 text-center">會員登入</h3>
                <div class="d-flex justify-content-center justify-content-lg-end mb-2">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="useDemoAccount" v-model="useDemoAccount">
                    <label class="form-check-label" for="useDemoAccount">
                      使用 demo 帳號
                    </label>
                  </div>
                </div>
                <div class="alert alert-danger mb-3" v-if="loginError">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ loginError }}
                </div>
                <v-form v-slot="{ errors }" @submit="login" v-if="!isRegister">
                  <div class="form-floating mb-3">
                    <v-field type="email" class="form-control"
                      :class="{ 'is-invalid': errors['帳號'] }"
                      id="floatingInput"
                      name="帳號"
                      placeholder="name@example.com"
                      rules="email|required"
                      v-model="loginData.email"
                      @input="loginError = ''"
                      ></v-field>
                    <label for="floatingInput">帳號*</label>
                    <error-message name="帳號" class="invalid-feedback text-start"/>
                  </div>
                  <div class="form-floating mb-3">
                    <v-field type="password"
                      class="form-control"
                      :class="{ 'is-invalid': errors['密碼'] }"
                      id="floatingPassword"
                      name="密碼"
                      placeholder="Password"
                      rules="required|min:4"
                      v-model="loginData.password"
                      @input="loginError = ''"
                      ></v-field>
                    <label for="floatingPassword">密碼*</label>
                    <error-message name="密碼" class="invalid-feedback text-start"/>
                  </div>
                  <div class="d-flex">
                    <button type="button" class="btn btn-outline-primary btn-lg w-100 me-2"
                      @click="isRegister = true">
                      <span class="d-none d-md-inline">還不是會員，</span>前往註冊
                    </button>
                    <button type="submit" class="btn btn-primary btn-lg w-100 ms-2">登入</button>
                  </div>
                </v-form>
              </div>
            </div>
          </div>
        </div>
        <div class="position-absolute w-100 h-100 px-2"
          :class="!isRegister ? 'hideContent' : 'showContent'">
          <div class="d-flex h-100">
            <div class="my-auto w-100">
              <div class="content">
                <h3 class="mb-3 text-center">註冊會員</h3>
                <div class="alert alert-danger mb-3" v-if="registerError">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ registerError }}
                </div>
                <v-form v-slot="{ errors }" @submit="register" v-if="isRegister">
                  <div class="form-floating mb-4">
                    <v-field type="text" id="username" placeholder="請輸入姓名" name="姓名"
                      class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                      rules="required" v-model="registerData.name" />
                    <error-message name="姓名" class="invalid-feedback"/>
                    <label for="username">姓名*</label>
                  </div>
                  <div class="form-floating mb-4">
                    <v-field type="email" id="email" placeholder="請輸入電子信箱" name="信箱"
                      class="form-control" :class="{ 'is-invalid': errors['信箱'] }"
                      rules="email|required" v-model="registerData.email" />
                    <error-message name="信箱" class="invalid-feedback"/>
                    <label for="email">電子信箱*</label>
                  </div>
                  <div class="form-floating mb-4">
                    <v-field type="tel" id="phone" placeholder="請輸入手機" name="手機"
                      class="form-control" :class="{ 'is-invalid': errors['手機'] }"
                      :rules="$filters.isPhone" v-model="registerData.phone" />
                    <error-message name="手機" class="invalid-feedback"/>
                    <label for="phone">手機*</label>
                  </div>
                  <div class="form-floating mb-4">
                    <v-field type="password" id="password" placeholder="請輸入密碼" name="密碼"
                      class="form-control" :class="{ 'is-invalid': errors['密碼'] }"
                      rules="required|min:4" v-model="registerData.password" />
                    <error-message name="密碼" class="invalid-feedback"/>
                    <label for="password">密碼*</label>
                  </div>
                  <div class="form-floating mb-4">
                    <v-field type="password" id="passwordDoubleCheck"
                      placeholder="再次確認密碼" name="再次確認密碼"
                      class="form-control" :class="{ 'is-invalid': errors['再次確認密碼'] }"
                      rules="required|confirmed:@密碼" v-model="passwordDoubleCheck" />
                    <error-message name="再次確認密碼" class="invalid-feedback"/>
                    <label for="passwordDoubleCheck">再次確認密碼*</label>
                  </div>
                  <div class="d-flex">
                    <button type="button" class="btn btn-outline-primary btn-lg w-100 me-2"
                      @click="isRegister = false">
                      <span class="d-none d-md-inline">已有會員，</span>前往登入
                    </button>
                    <button type="submit" class="btn btn-primary btn-lg w-100 ms-2">註冊</button>
                  </div>
                </v-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.offcanvas{
  width: 100%;
}
@media (min-width: 992px){
  .offcanvas{
    width: 75%;
  }
}
.content{
  max-width: 500px;
  margin: 0 auto;
}
.showContent{
  animation: showContent 0.5s 0.4s 1 forwards;
  opacity: 0;
}
.hideContent{
  overflow: hidden;
  animation: hideContent 0.5s 1 forwards;
}

@keyframes hideContent {
  0%{
    display: block;
    opacity: 1;
    transform: translateY(0%);
    filter: blur(0);
  }
  100%{
    display: none;
    opacity: 0;
    transform: translateY(-100%);
    filter: blur(4px);
  }
}
@keyframes showContent {
  0%{
    display: none;
    opacity: 0;
    transform: translateY(30%);
    filter: blur(4px);
    overflow: hidden;
  }
  99%{
    overflow: hidden;
  }
  100%{
    display: block;
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
    overflow: auto;
  }
}
.divider{
  position: relative;
  z-index: 1;
}
.divider::before{
  position: absolute;
  z-index: -1;
  top: -50%;
  left: 10%;
  content: '';
  border-bottom: 1px solid var(--bs-gray);
  width: calc(40% - 20px);
  height: 100%;
}
.divider::after{
  position: absolute;
  z-index: -1;
  top: -50%;
  left: calc(50% + 20px);
  content: '';
  border-bottom: 1px solid var(--bs-gray);
  width: calc(40% - 20px);
  height: 100%;
}
</style>
