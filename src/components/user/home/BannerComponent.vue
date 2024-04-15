<template>
  <section class="banner">
    <div class="container h-100 d-flex align-items-center">
      <div class="text-gray-dark">
        <h2 class="mb-3">享受無盡的果汁時光</h2>
        <p class="fs-5">新鮮、健康、24小時不打烊</p>
        <router-link :to="{name: 'products'}"
          class="btn btn-primary btn-lg">
          查看菜單<i class="bi bi-caret-right-fill ms-1"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner{
  height: calc(100vh - 30px);
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0)),
                    url('@/assets/image/banner.jpg');
  background-size: cover;
  background-position: center center;
}
</style>
