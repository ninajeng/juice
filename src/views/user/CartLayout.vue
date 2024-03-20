<script>
import { mapState } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  data() {
    return {
      steps: [
        {
          icon: 'bi-1-square',
          info: '確認訂單',
        },
        {
          icon: 'bi-2-square',
          info: '填寫資料',
        },
        {
          icon: 'bi-3-square',
          info: '完成訂購',
        },
      ],
      stepNum: 1,
    };
  },
  computed: {
    ...mapState(cartStore, ['cartInfo']),
  },
  methods: {
    setStep(step) {
      this.stepNum = step;
    },
  },
};
</script>

<template>
  <div>
    <img src="https://images.unsplash.com/photo-1524222717473-730000096953?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="購物車結帳背景圖"
      style="height: 300px; width: 100%; object-fit: cover; object-position: bottom center;">
  </div>
  <div class="container py-5">
    <template v-if="cartInfo.list?.length">
      <h2 class="h5">{{ `${stepNum === 3 ? '訂購完成' : '結帳'}` }}</h2>
      <div class="d-flex flex-wrap text-nowrap mb-5 overflow-hidden" v-if="stepNum < 3">
        <p class="p-2 mb-1 flex-fill text-center stepLabel" :class="{'stepActive': stepNum > key}"
          v-for="(step, key) in steps" :key="'step' + key">
          <i class="bi me-1" :class="step.icon"></i>{{ step.info }}
        </p>
      </div>
    </template>
    <div style="min-height: 400px;">
      <RouterView @step-num="setStep"/>
    </div>
  </div>
</template>

<style>
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
</style>
