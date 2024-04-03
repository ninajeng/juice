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
  <div class="h-100 d-flex" style="background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),url(https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712023858426.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QRRDqmbfBk4Admuoyv%2FZxd0b7y3VSiEtQrqq5Mk0lhCrqVgbwXPY55tS%2B5XBqCF9%2F0gb9%2BnGUnqYB0IenxvEsq1MiEstJOely6FhiVZDl4D%2Bpn3jwnjsz9XcaSzuA0E6BBW%2B2o8OSu%2F3AaFLTylVh18x2lE8mL9Bah5s6ZHsXkkxCg6RZtXqGdaYir3E4s3gJ1gy9Lxocqh8oC05Z%2B2dMy55J8i00j3jR1fTiF%2BAHG7xzXNXm8FjCMI9s1vdJJWiaEwgNpDrkTSKKoZwsLUhXeY5S3cMtaNA2k7KFeUhdVmFVmN%2FPFX%2BqOV2cXf3Kj%2BZphjVy16%2FpnqQpZBQzCHQmQ%3D%3D); background-size: cover; background-position: center left">
    <div class="container my-auto">
      <div class="row justify-content-center align-items-center">
        <div class="col-sm-8 col-md-6 col-lg-4">
          <div class="my-5">
            <div class="alert alert-danger" role="alert" v-if="errorMessageForLogin">
              <i class="bi bi-exclamation-diamond-fill me-2"></i>{{ errorMessageForLogin }}
            </div>
            <div class="text-center p-3 bg-gray bg-opacity-25">
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
              <p class="text-muted mt-3 mb-0">© 2024 Juice oasis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
