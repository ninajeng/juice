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
    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1711282221646.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=B5sr%2F2wk80XxSgISyEC34Di9TWYqE9QXF7MiA%2BS4IeibulyrG2ZSWqKIjfn8CELbCwgG2VOPwqzOv9V9air%2BCa8N0AH%2FMnBJ%2Fsh4XL7vQx1bH%2BBmDppT%2BTJnhJPugpTrfMO91QgNwzYgqPa%2BiSJgzfhqbnfF2zMCay01SySSFl%2F8xDgN6GwNrmdcTmJC%2FH9b4D8X1EP0u47ngQEZA83e3YzSEu3QiqDPck9s%2Begze5QFErlWb60Grs3iiYKMvpTwAuzkIGhBoRZRQ0SQ%2Fp0K2CjmfVrXBI0apGXY4A7dgTn6eQai5D0XVkP5ROAk9mLJEpesOADtwPvJkGge6ZJK9A%3D%3D" alt="會員資料背景圖" class="bgImage"
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
