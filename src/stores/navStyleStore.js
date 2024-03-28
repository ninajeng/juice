import { defineStore } from 'pinia';

export default defineStore('navStyleStore', {
  state: () => ({
    disableShadow: false,
  }),
  actions: {
    setShadow(isDisabled) {
      this.disableShadow = isDisabled;
    },
  },
});
