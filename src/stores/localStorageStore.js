import { defineStore } from 'pinia';

const STORAGE_NAME = import.meta.env.VITE_USER_STORAGENAME;

export default defineStore('localStorageStore', {
  state: () => ({
    record: [],
  }),
  actions: {
    getRecord() {
      const record = JSON.parse(localStorage.getItem(STORAGE_NAME));
      if (!record) {
        this.record = [];
      } else {
        this.record = record;
      }
    },
    setRecord(data) {
      this.getRecord();
      const productData = JSON.parse(JSON.stringify(data));
      const removeKeys = ['collectionId', 'cartId', 'userCustom'];
      removeKeys.forEach((key) => {
        delete productData[key];
      });
      const record = [...this.record];
      if (record.length) {
        const repeatIndex = record.findIndex((product) => product.id === productData.id);
        if (repeatIndex > -1) {
          record.splice(repeatIndex, 1);
        } else if (record.length > 10) {
          record.pop();
        }
      }
      record.unshift(productData);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(record));
      this.getRecord();
    },
    clearRecord() {
      localStorage.clear();
      this.getRecord();
    },
  },
});
