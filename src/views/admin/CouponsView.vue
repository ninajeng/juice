<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<template>
  <loading-view :active="isLoading"/>
  Coupon
</template>
