<script>

export default {
  computed: {
    totalPrice() {
      let { price } = this.productData;
      if (!price) {
        return '';
      }
      if (this.productData.type === 'fruit') {
        return price;
      }
      if (this.userCustom.size === 'L') {
        price += this.productData.custom.size.addPrice;
      }
      price += this.userCustom.extras.length * 10;
      return price;
    },
  },
  methods: {
    initProductSettings(data) {
      this.productData = { ...data };
      this.qty = 1;
      this.isUpdate = false;
      if (this.productData.type === 'drink') {
        if (this.productData.cartId) {
          this.userCustom = { ...this.productData.userCustom };
          this.qty = this.productData.cartQty || 1;
          this.isUpdate = true;
        } else if (this.productData.collectionId) {
          this.userCustom = { ...this.productData.userCustom };
          this.qty = 1;
          this.isUpdate = true;
        } else {
          Object.keys(this.productData.custom).forEach((option) => {
            const options = this.productData.custom[option]?.options;
            if (options !== 'extras' && Array.isArray(options)) {
              [this.userCustom[option]] = options;
            }
          });
          this.userCustom.extras = [];
        }
      } else {
        this.userCustom = {};
      }
    },
  },
};
</script>
