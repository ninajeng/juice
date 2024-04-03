<script>
export default {
  methods: {
    setCustomOption(data) {
      const product = { ...data };
      let userCustom = {};
      let originPrice = product.origin_price;
      let { price } = product;
      if (product.type === 'drink') {
        userCustom = { ...this.userCustom };
        if (userCustom.extras.length) {
          const addPrice = userCustom.extras.length * product.custom.extras.addPrice;
          userCustom.extras.sort();
          originPrice += addPrice;
          price += addPrice;
        }
        if (userCustom.size === 'L') {
          const { addPrice } = product.custom.size;
          originPrice += addPrice;
          price += addPrice;
        }
      }
      delete product.collectionId;
      delete product.userCustom;
      return {
        product,
        userCustom,
        originPrice,
        price,
      };
    },
  },
};
</script>
