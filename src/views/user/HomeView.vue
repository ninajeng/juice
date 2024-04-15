<script>
import CheckLogin from '@/mixins/user/CheckLogin.vue';
import BannerComponent from '@/components/user/home/BannerComponent.vue';
import StoreFeature from '@/components/user/home/StoreFeature.vue';
import FruitIntroduce from '@/components/user/home/FruitIntroduce.vue';
import OnSaleProducts from '@/components/user/home/OnSaleProducts.vue';
import CustomersFeedbacks from '@/components/user/home/CustomersFeedbacks.vue';
import MemberFunctions from '@/components/user/home/MemberFunctions.vue';

export default {
  mixins: [CheckLogin],
  components: {
    BannerComponent,
    StoreFeature,
    FruitIntroduce,
    OnSaleProducts,
    CustomersFeedbacks,
    MemberFunctions,
  },
};
</script>

<template>
  <BannerComponent class="mb-5"/>
  <StoreFeature class="mt-lg-5 mb-5"/>
  <FruitIntroduce class="mt-lg-5"/>
  <OnSaleProducts class="mt-lg-3"/>
  <CustomersFeedbacks class="my-5"/>
  <MemberFunctions class="mb-5"/>
</template>
