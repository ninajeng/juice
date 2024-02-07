<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div style="min-height: 100vh;" class="d-flex flex-column">
    <nav class="navbar bg-secondary bg-opacity-25">
      <div class="container">
        <span class="navbar-brand mb-0 h1 text-primary fw-bold">Vegetable Shop</span>
      </div>
    </nav>
    <div class="flex-fill d-flex flex-column">
      <RouterView />
    </div>
    <div class="bg-secondary bg-opacity-25">
      <div class="container py-4">
        <p class="m-0 text-center text-primary">© 2024~∞ - VegetableShop</p>
      </div>
    </div>
  </div>
</template>

<style>
@import '@/assets/style/main.scss';
</style>
