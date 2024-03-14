<script>
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  mixins: [CheckLogin],
};
</script>

<template>
  <div class="flex-fill d-flex justify-content-center align-items-center">
    <button type="button"
      class="btn btn-primary"
      @click="$router.push({name: 'adminLogin'})">
      前往後台登入
    </button>
  </div>
</template>
