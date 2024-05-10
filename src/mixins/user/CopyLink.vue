<script>
export default {
  methods: {
    async copyProductLink(productId) {
      const href = `${window.location.origin}${window.location.pathname}#/products`;
      const link = `${href}/${productId}`;
      const resError = await this.navigatorCopy(link);
      if (resError) {
        this.toastShow('error', this.$errorMessage);
      } else {
        this.toastShow('success', '已複製連結');
      }
    },
    async copyLink() {
      const link = window.location.href;
      const resError = await this.navigatorCopy(link);
      if (resError) {
        this.toastShow('error', this.$errorMessage);
      } else {
        this.toastShow('success', '已複製連結');
      }
    },
    async navigatorCopy(link) {
      let resError = null;
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(link);
          resError = false;
        } catch (err) {
          resError = true;
        }
      } else {
        resError = true;
      }
      return resError;
    },
  },
};
</script>
