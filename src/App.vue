<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  created() {
    AOS.init({
      offset: 200, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 800, // values from 0 to 3000, with step 50ms
    });
  },
};
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/style/main.scss';
</style>
