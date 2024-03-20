<script>
import NavBar from '@/components/user/NavBar.vue';
import FooterComponent from '@/components/user/FooterComponent.vue';

export default {
  components: {
    NavBar,
    FooterComponent,
  },
};
</script>

<template>
  <div style="min-height: 100vh;" class="d-flex flex-column">
    <NavBar/>
    <div class="flex-fill d-flex flex-column">
      <RouterView/>
    </div>
    <FooterComponent/>
  </div>
</template>
