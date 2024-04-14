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
    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/juiceoasis/1712727615057.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JZb%2FyGX6nFYMtG7N547avGT4OWJo43zw5LVdFjlGf%2B2xRH9F1RVcwgH0H22%2Frrx%2BZuAa7G9ylV7YIv72j5flViYGGtgw5X7HUfWDKO3ird1f7zLwLYKcaW3JKpMfLoTXR54ED1qcA%2BkM%2FHdd46yiNa4eH3201GZmtFJ4TlAvZA8OlTiQBc0UGLoPPmqxe7h4XJscYh0VF1vOiiHmDInhaHsvQdC%2F%2FqsEETZyNs2nV%2B1xii0385KZj7Exd0wGLaoIKVebDVAxQoyRn7Ud1A1OsT0f6YU7mNQKD7ipnwHx5JMHvqKoXxyZZkioG8N0MXzflNe5UITmwEz45cs54%2B%2Bw7Q%3D%3D" alt="會員資料背景圖" class="bgImage"
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
