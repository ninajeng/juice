<script>
export default {
  props: ['feedback'],
  mounted() {
    this.$emit('cardFinished');
  },
};
</script>

<template>
  <div class="feedbackCard w-100 h-100">
    <div class="card h-100">
      <div class="profile position-absolute me-3"
        :class="feedback.userName.indexOf('先生') > -1 ? 'profile-male': 'profile-female'"></div>
      <div class="card-body">
        <p class="mb-1">
          {{ feedback.userName }}
        </p>
        <p class="mb-1 text-warning">
          <i class="bi bi-star-fill me-1"
            v-for="index in feedback.star" :key="'star' + index"></i>
        </p>
        <p>{{ feedback.comment }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$profile-image-size: 80px;
$profile-image-padding: 20px;
.feedbackCard{
  padding: calc($profile-image-size / 2);
  padding-top: calc($profile-image-size / 2 + 2rem);
  text-align: justify;
}
.profile{
  height: $profile-image-size;
  width: $profile-image-size;
  background-color: var(--bs-primary-bg-subtle);
  background-size: 110px;
  background-repeat: no-repeat;
  background-position: -15px -15px;
  top: calc($profile-image-size / -2);
  right: 0px;
}
.profile-male{
  background-image: url('@/assets/image/profile_male.svg');
}
.profile-female{
  background-image: url('@/assets/image/profile_female.svg');
}
.feedbackCard .card-body{
  padding-top: calc($profile-image-size / 2 - 1.25rem);
}
</style>
