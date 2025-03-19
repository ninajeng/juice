<script>
import { mapState } from 'pinia';
import userAccountStore from '@/stores/userAccountStore';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(userAccountStore, ['userData']),
  },
};
</script>

<template>
  <div class="bg-primary-subtle">
    <img src="https://res.cloudinary.com/derxrcfij/image/upload/v1742289764/%E6%94%B6%E8%97%8F_is71sa.jpg" alt="會員資料背景圖" class="bgImage"
      style="width: 100%; object-fit: cover; object-position: center center; opacity: 0.95;">
  </div>
  <div class="position-relative py-5" style="min-height: 600px;">
    <RouterView/>
  </div>
</template>

<style lang="scss" scoped>
.stepLabel{
  position: relative;
  margin-right: 1.5rem;
  background-color: var(--bs-secondary-bg-subtle);
}
.stepLabel::after{
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(100%, 0%);
  border: 1.25rem solid;
  border-color: transparent transparent transparent var(--bs-secondary-bg-subtle);
  aspect-ratio: 1;
  height: 100%;
}
.stepActive{
  &.stepLabel{
    background-color: var(--bs-secondary);
    color: white;
  }
  &.stepLabel::after{
    border-color: transparent transparent transparent var(--bs-secondary);
  }
}
@media(max-width: 310px){
  .stepLabel {
    width: 100%;
  }
}
.bgImage{
  height: 250px;
}
@media(min-width: 992px){
  .bgImage{
    height: 350px;
  }
}
</style>
