<script>
import adminAccountStore from '@/stores/adminAccountStore';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errorMessageForLogin: '',
      isLoading: false,
    };
  },
  emits: ['showAlert'],
  methods: {
    async login() {
      this.isLoading = true;
      const res = await this.$adminRequest.login(this.user);
      if (res.success) {
        this.$cookie.setAdminCookie(res.data);
        this.$router.push({ name: 'adminProducts' });
      } else {
        this.isLoading = false;
        this.errorMessageForLogin = '登入失敗！請確認帳號與密碼是否正確。';
      }
    },
    ...mapActions(adminAccountStore, ['checkAccountState', 'setLogoutState']),
  },
  mounted() {
    this.setLogoutState();
    this.checkAccountState(this);
  },
};
</script>

<template>
  <loading-view :active="isLoading"/>
  <div class="flex-fill d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-sm-8 col-md-6 col-lg-4 h-100">
          <div class="h-100 my-5">
            <div class="alert alert-danger" role="alert" v-if="errorMessageForLogin">
              <i class="bi bi-exclamation-diamond-fill me-2"></i>{{ errorMessageForLogin }}
            </div>
            <div class="text-center p-3 border rounded">
              <h2 class="mb-3">登入</h2>
              <v-form v-slot="{ errors }" @submit="login">
                <div class="form-floating mb-3">
                  <v-field type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    id="floatingInput"
                    name="email"
                    placeholder="name@example.com"
                    rules="email|required"
                    v-model="user.username"
                    ></v-field>
                  <label for="floatingInput">Email address</label>
                  <error-message name="email" class="invalid-feedback text-start"/>
                </div>
                <div class="form-floating mb-3">
                  <v-field type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors['password'] }"
                    id="floatingPassword"
                    name="password"
                    placeholder="Password"
                    rules="required"
                    v-model="user.password"></v-field>
                  <label for="floatingPassword">Password</label>
                  <error-message name="password" class="invalid-feedback text-start"/>
                </div>
                <button type="submit" class="btn btn-primary w-100">登入</button>
              </v-form>
              <p class="text-muted mt-3 mb-0">© 2024 JuiceOasis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
