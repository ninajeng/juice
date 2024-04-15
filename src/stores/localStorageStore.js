import { defineStore } from 'pinia';

const RECORD_STORAGE_NAME = import.meta.env.VITE_USER_RECORD_STORAGE;
const CONTACT_STORAGE_NAME = import.meta.env.VITE_ORDERER_CONTACT_STORAGE;

export default defineStore('localStorageStore', {
  state: () => ({
    record: [],
    orderContactData: null,
  }),
  actions: {
    getRecord() {
      const record = JSON.parse(localStorage.getItem(RECORD_STORAGE_NAME));
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
      localStorage.setItem(RECORD_STORAGE_NAME, JSON.stringify(record));
      this.getRecord();
    },
    clearRecord() {
      localStorage.removeItem(RECORD_STORAGE_NAME);
      this.getRecord();
    },
    getContactData() {
      const data = JSON.parse(localStorage.getItem(CONTACT_STORAGE_NAME));
      if (!data) {
        this.orderContactData = null;
      } else {
        this.orderContactData = data;
      }
    },
    setContactData(data) {
      this.getContactData();
      localStorage.setItem(CONTACT_STORAGE_NAME, JSON.stringify(data));
      this.getContactData();
    },
    clearContactData() {
      localStorage.removeItem(CONTACT_STORAGE_NAME);
      this.getContactData();
    },
  },
});
