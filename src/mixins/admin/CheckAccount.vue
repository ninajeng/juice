<script>
export default {
  async mounted() {
    this.isLoading = true;
    const result = await this.checkAccountState(this);
    if (result) {
      this.init();
    }
  },
};
</script>
