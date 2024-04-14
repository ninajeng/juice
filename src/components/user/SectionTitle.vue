<script>
export default {
  props: ['title'],
};
</script>

<template>
  <div class="border-start border-primary border-3 bg-primary-subtle p-2 ps-3 mb-3">
    <div class="d-flex align-items-center justify-content-between">
      <h3 class="h5 my-2 me-3">{{ title }}</h3>
      <slot name="button"></slot>
    </div>
    <slot name="text"></slot>
  </div>
</template>
