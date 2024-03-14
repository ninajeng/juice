<script>
import AlertMixin from '@/mixins/AlertWindow.vue';
import NavBar from '@/components/admin/NavBar.vue';

export default {
  data() {
    return {
      isShowMenu: false,
    };
  },
  provide: {
    alertWindow: AlertMixin.methods,
  },
  components: {
    NavBar,
  },
  mounted() {
    AlertMixin.methods.init(this.$router);
  },
};
</script>

<template>
  <NavBar>
    <RouterView/>
  </NavBar>
</template>
