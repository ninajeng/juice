<script>
import { mapState, mapActions } from 'pinia';
import CartInfo from '@/components/user/CartInfo.vue';
import userAccountStore from '@/stores/userAccountStore';
import localStorageStore from '@/stores/localStorageStore';
import cartStore from '@/stores/cartStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      user: {
        delivery: '',
        payment: '',
      },
      useMemberData: false,
      hasSettingsData: true,
      isLoading: false,
    };
  },
  emits: ['stepNum'],
  mixins: [CheckLogin],
  components: {
    CartInfo,
  },
  watch: {
    useMemberData(use) {
      if (use) {
        Object.keys(this.userSettings).forEach((option) => {
          this.user[option] = this.userSettings[option];
        });
      }
    },
  },
  computed: {
    ...mapState(cartStore, ['cartInfo', 'cartItemNum']),
    ...mapState(userAccountStore, ['userSettings']),
    ...mapState(localStorageStore, ['orderContactData']),
  },
  methods: {
    async init() {
      this.isLoading = true;
      await this.getCartInfo();
      if (!this.cartInfo.list?.length) {
        this.$router.replace({ name: 'cart' });
      }
      const errorRes = await this.getUserSettings();
      if (errorRes) {
        this.toastShow('error', errorRes);
        this.hasSettingsData = false;
      }
      this.getStoreData();
      this.isLoading = false;
    },
    async setUserData() {
      this.isLoading = true;
      const id = new Date().getTime();
      const data = {
        contact: this.user,
        cartInfo: this.cartInfo,
        id,
      };
      const errorRes = await this.sentOrder(data);
      if (errorRes) {
        this.toastShow('error', errorRes);
        this.isLoading = false;
      } else {
        this.clearContactData();
        this.$router.push(`/user/cart/complete/${id}`);
      }
    },
    checkDefaultSettings(e) {
      const target = e.target.id;
      if (this.userSettings[target]) {
        this.useMemberData = false;
      }
      if (target === 'delivery') {
        this.user.payment = '';
      }
    },
    getStoreData() {
      this.getContactData();
      if (!this.orderContactData) {
        return;
      }
      Object.keys(this.orderContactData).forEach((key) => {
        this[key] = this.orderContactData[key];
      });
    },
    storeContactData() {
      const data = {
        user: this.user,
        useMemberData: this.useMemberData,
      };
      this.setContactData(data);
      this.$router.push({ name: 'cart' });
    },
    ...mapActions(cartStore, ['getCartInfo', 'sentOrder']),
    ...mapActions(userAccountStore, ['getUserSettings']),
    ...mapActions(localStorageStore, ['getContactData', 'setContactData', 'clearContactData']),
  },
  created() {
    this.$emit('stepNum', 2);
  },
};
</script>

<template>
  <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
  <div class="row g-4 flex-column-reverse flex-lg-row justify-content-between"
    v-if="cartInfo.list?.length">
    <div class="col-lg-5">
      <CartInfo :cart-info="cartInfo" :cart-item-num="cartItemNum" :isEdit="false"/>
      <button type="button"
        class="btn btn-primary mb-3"
        style="margin-top: -2rem;"
        @click="storeContactData">
        <i class="bi bi-caret-left-fill me-1"></i>回上一步
      </button>
    </div>
    <div class="col-lg-6">
      <div class="card border-primary p-3 px-4">
        <div class="d-flex align-items-center mb-3">
          <h3 class="mb-0 h5 me-4">訂購人資料</h3>
          <div class="form-check" v-if="hasSettingsData">
            <input class="form-check-input" type="checkbox"
              id="useMemberData" v-model="useMemberData">
            <label class="form-check-label" for="useMemberData">
              使用會員資料
            </label>
          </div>
        </div>
        <v-form v-slot="{ errors }" @submit="setUserData">
          <div class="form-floating mb-3">
            <v-field type="text" id="name" placeholder="姓名" name="姓名"
              class="form-control"
              :class="{'is-invalid': errors['姓名'],
                'bg-primary bg-opacity-10': user.name && !errors['姓名']}"
              rules="required" v-model="user.name"
              @input="checkDefaultSettings"></v-field>
            <label for="name" class="opacity-75">姓名*</label>
            <error-message name="姓名" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <v-field type="tel" id="phone" placeholder="手機" name="手機" class="form-control"
              :class="{'is-invalid': errors['手機'],
                'bg-primary bg-opacity-10': user.phone && !errors['手機']}"
              :rules="$filters.isPhone" v-model="user.phone"
              @input="checkDefaultSettings"></v-field>
            <label for="phone" class="opacity-75">手機*</label>
            <error-message name="手機" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <v-field class="form-select" :class="{'is-invalid': errors['取貨方式'],
              'bg-primary bg-opacity-10': user.delivery && !errors['取貨方式']}"
              id="delivery" name="取貨方式" rules="required" as="select"
              placeholder="請選擇取貨方式" v-model="user.delivery"
              @input="checkDefaultSettings">
              <option disabled value="">請選擇取貨方式</option>
              <option value="外送">外送</option>
              <option value="門市取貨">門市取貨</option>
            </v-field>
            <label for="delivery">取貨方式*</label>
            <error-message name="取貨方式" class="invalid-feedback"></error-message>
          </div>
          <div class="form-floating mb-3" v-if="user.delivery === '外送'">
            <v-field type="text" id="address" placeholder="外送地址" name="外送地址" class="form-control"
              :class="{'is-invalid': errors['外送地址'],
                'bg-primary bg-opacity-10': user.address && !errors['外送地址']}"
              rules="required" v-model="user.address" @input="checkDefaultSettings"></v-field>
            <label for="address" class="opacity-75">外送地址*</label>
            <error-message name="外送地址" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <v-field id="payment" name="付款方式" class="form-select"
              :class="{'is-invalid': errors['付款方式'],
                'bg-primary bg-opacity-10': user.payment && !errors['付款方式']}"
              rules="required" as="select"
              placeholder="請選擇付款方式" v-model="user.payment" @input="checkDefaultSettings">
              <option disabled value="">請選擇付款方式</option>
              <option value="線上刷卡">線上刷卡</option>
              <option value="ATM轉帳">ATM轉帳</option>
              <option value="門市付款" :disabled="user.delivery !== '門市取貨'">門市付款(限門市取貨)</option>
            </v-field>
            <label for="payment">付款方式*</label>
            <error-message name="付款方式" class="invalid-feedback"></error-message>
          </div>
          <div class="form-floating mb-3">
            <textarea id="message" placeholder="留言" name="message"
              class="form-control" :class="{'bg-primary bg-opacity-10': user.message}"
              v-model="user.message" style="height: 100px;"
              @input="checkDefaultSettings"></textarea>
            <label for="message" class="opacity-75">留言給我們</label>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">
              送出訂單<i class="bi bi-caret-right-fill ms-1"></i>
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
