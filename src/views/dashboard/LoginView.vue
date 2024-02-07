<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios');
const router = useRouter();
// data
const SIGNIN_PATH = `${import.meta.env.VITE_APP_API_URL}/v2/admin/signin`;
const user = ref({
  username: '',
  password: '',
});
const errorMessageForLogin = ref('');
// methods
function login() {
  axios.post(SIGNIN_PATH, user.value)
    .then((res) => {
      if (res.data.success) {
        const { token, expired } = res.data;
        document.cookie = `${import.meta.env.VITE_APP_TokenName}=${token}; expires=${new Date(expired)};`;
        router.push('productList');
      } else {
        errorMessageForLogin.value = res.data.message;
      }
    }).catch((e) => {
      errorMessageForLogin.value = e.response.data.message;
      user.value.password = '';
    });
}
</script>

<template>
  <div class="flex-fill d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-sm-8 col-md-6 col-lg-4 h-100">
          <div class="h-100 my-5">
            <div class="alert alert-danger" role="alert" v-if="errorMessageForLogin">
              <i class="bi bi-exclamation-diamond-fill me-2"></i>{{ errorMessageForLogin }}
            </div>
            <div class="text-center p-3 border rounded">
              <h2>請先登入</h2>
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
              <p class="text-muted mt-3 mb-0">© 2021~∞ - VegetableShop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
