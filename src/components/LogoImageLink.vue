<template>
  <router-link class="text-primary link-primary fs-2 logo" :to="{name: 'home'}">
    Juice oasis
  </router-link>
</template>

<style lang="scss" scoped>
.logo{
  background-image: url('@/assets/image/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}
.logo:hover{
  opacity: 0.8;
}
@media (min-width: 992px){
  .logo{
    background-position: left;
  }
}
</style>
