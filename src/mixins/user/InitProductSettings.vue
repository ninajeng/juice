<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import userAccountStore from '@/stores/userAccountStore';

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
    ...mapState(userAccountStore, ['hasLogin', 'userData']),
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
    async setCustomItem(isUpdate) {
      if (!this.hasLogin) {
        this.setLoginWindowSignal(true);
        return '未登入';
      }
      const product = { ...this.productData };
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
      const cartId = product.cartId || new Date().getTime();
      const result = await this.addToCart(this.userData.id, {
        product, userCustom, originPrice, price, qty: this.qty, cartId,
      }, isUpdate);
      return result;
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(userAccountStore, ['setLoginWindowSignal']),
  },
};
</script>
