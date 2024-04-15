<script>
import { mapActions, mapState } from 'pinia';
import SectionTitle from '@/components/user/SectionTitle.vue';
import userAccountStore from '@/stores/userAccountStore';
import CheckLogin from '@/mixins/user/CheckLogin.vue';

export default {
  data() {
    return {
      tempProfile: {},
      tempPassword: {},
      tempSettings: {},
      passwordDoubleCheck: '',
      enabledOptions: {
        delivery: false,
        address: false,
        payment: false,
        message: false,
      },
      isEditProfile: false,
      isEditPassword: false,
      isEditSettings: false,
      isLoading: false,
    };
  },
  mixins: [CheckLogin],
  components: {
    SectionTitle,
  },
  watch: {
    isEditProfile(isEdit) {
      if (!isEdit) {
        this.initUserData();
      }
    },
    isEditPassword(isEdit) {
      if (!isEdit) {
        this.tempPassword = {};
        this.passwordDoubleCheck = '';
      }
    },
  },
  computed: {
    ...mapState(userAccountStore, ['userData', 'userSettings']),
  },
  methods: {
    async init() {
      this.initUserData();
      await this.initUserSettings();
      this.isLoading = false;
    },
    initUserData() {
      this.tempProfile = {
        name: this.userData.name,
        phone: this.userData.phone,
      };
    },
    async initUserSettings() {
      const errorRes = await this.getUserSettings();
      if (errorRes) {
        this.showErrorMessage(errorRes);
        return;
      }
      this.tempSettings = { ...this.userSettings };
      Object.keys(this.enabledOptions).forEach((option) => {
        if (this.tempSettings[option]) {
          this.enabledOptions[option] = true;
        }
      });
    },
    async updateProfile() {
      this.isLoading = true;
      const errorRes = await this.updateUserData(this.tempProfile);
      if (errorRes) {
        this.showErrorMessage(errorRes);
        return;
      }
      this.isEditProfile = false;
      this.toastShow('success', '已更新基本資料');
      this.initUserData();
      this.isLoading = false;
    },
    async updatePassword() {
      this.isLoading = true;
      const errorRes = await this.updateUserPassword(this.tempPassword);
      if (errorRes) {
        this.toastShow('error', errorRes);
        this.tempPassword.oldPassword = '';
        this.isLoading = false;
        return;
      }
      this.isEditPassword = false;
      this.tempPassword = {};
      this.passwordDoubleCheck = '';
      this.toastShow('success', '已修改密碼');
      this.isLoading = false;
    },
    async setUserSettings() {
      this.isLoading = true;
      const errorRes = await this.updateUserSettings(this.tempSettings);
      if (errorRes) {
        this.showErrorMessage(errorRes);
        return;
      }
      this.isEditSettings = false;
      this.toastShow('success', '已更新常用設定');
      await this.initUserSettings();
      this.isLoading = false;
    },
    showErrorMessage(errorRes) {
      this.toastShow('error', errorRes);
      this.$router.replace({ name: 'products' });
    },
    isValidInput(value, input) {
      return this.isValid(input.name, '請輸入此欄位，或是關閉啟用設定');
    },
    isValidSelect(value, input) {
      return this.isValid(input.name, '請選擇此欄位，或是關閉啟用設定');
    },
    isValid(option, message) {
      if (!this.enabledOptions[option]) {
        return true;
      }
      return this.tempSettings[option] ? true : message;
    },
    ...mapActions(userAccountStore, ['getUserSettings', 'updateUserData', 'updateUserPassword', 'updateUserSettings']),
  },
};
</script>

<template>
  <LoadingView :active="isLoading" :is-full-page="false" style="z-index: 1000;"/>
  <div class="container">
    <section class="mb-5">
      <SectionTitle :title="'會員基本資料'">
        <template #button>
          <button type="button" class="btn btn-primary" title="修改資料"
            :disabled="isEditProfile" @click="isEditProfile = true">
            <i class="bi bi-pencil-fill"></i>
          </button>
        </template>
      </SectionTitle>
      <v-form class="px-3" v-slot="{ errors }" @submit="updateProfile">
        <div class="row align-items-center">
          <div class="col-auto col-sm-3">
            <label class="form-label mb-3 text-muted" for="userName">
              姓名*
            </label>
          </div>
          <div class="col mb-3" v-if="isEditProfile">
            <v-field type="text" placeholder="請輸入姓名" name="姓名" id="userName"
              class="form-control" :class="{'is-invalid': errors['姓名']}"
              rules="required" v-model="tempProfile.name"></v-field>
            <error-message name="姓名" class="invalid-feedback text-start"/>
          </div>
          <div class="col" v-else>
            <p class="text-break">{{ userData.name }}</p>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-auto col-sm-3">
            <label class="form-label mb-3 text-muted" for="userPhone">
              手機*
            </label>
          </div>
          <div class="col mb-3" v-if="isEditProfile">
            <v-field type="tel" placeholder="請輸入手機號碼" name="手機" id="userPhone"
              class="form-control" :class="{'is-invalid': errors['手機']}"
              :rules="$filters.isPhone" v-model="tempProfile.phone"></v-field>
            <error-message name="手機" class="invalid-feedback text-start"/>
          </div>
          <div class="col" v-else>
            <p>{{ userData.phone }}</p>
          </div>
        </div>
        <div class="text-end" v-if="isEditProfile">
          <button type="button" class="btn me-2" @click="isEditProfile = false">取消</button>
          <button type="submit" class="btn btn-primary">送出</button>
        </div>
      </v-form>
    </section>
    <section class="mb-5">
      <SectionTitle :title="'會員帳號'"/>
      <v-form class="px-3" v-slot="{ errors }" @submit="updatePassword">
        <div class="row mb-1">
          <div class="col-3">
            <p class="text-muted">帳號</p>
          </div>
          <div class="col">
            <p class="text-break">{{ userData.email }}</p>
          </div>
        </div>
        <button type="button" class="btn btn-primary"
          @click="isEditPassword = true" v-if="!isEditPassword" >
          密碼變更
        </button>
        <template v-else>
          <div class="row mt-3 mt-sm-0">
            <div class="col-sm-3">
              <label class="form-label mb-sm-3 mt-sm-1 text-muted" for="oldPassword">
                舊密碼*
              </label>
            </div>
            <div class="col mb-3">
              <v-field type="password" placeholder="請輸入舊密碼" name="舊密碼" id="oldPassword"
                class="form-control" :class="{ 'is-invalid': errors['舊密碼'] }"
                rules="required|min:4" v-model="tempPassword.oldPassword" />
              <error-message name="舊密碼" class="invalid-feedback"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <label class="form-label mb-sm-3 mt-sm-1 text-muted" for="newPassword">
                新密碼*
              </label>
            </div>
            <div class="col mb-3">
              <v-field type="password" placeholder="請輸入新密碼" name="新密碼" id="newPassword"
                class="form-control" :class="{ 'is-invalid': errors['新密碼'] }"
                rules="required|min:4|is_not:@舊密碼" v-model="tempPassword.newPassword" />
              <error-message name="新密碼" class="invalid-feedback"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <label class="form-label mb-sm-3 mt-sm-1 text-muted" for="passwordCheck">
                確認新密碼*
              </label>
            </div>
            <div class="col mb-3">
              <v-field type="password" placeholder="請再次輸入新密碼" name="再次確認新密碼" id="passwordCheck"
                class="form-control" :class="{ 'is-invalid': errors['再次確認新密碼'] }"
                rules="required|confirmed:@新密碼" v-model="passwordDoubleCheck" />
              <error-message name="再次確認新密碼" class="invalid-feedback"/>
            </div>
          </div>
          <div class="text-end">
            <button type="button" class="btn me-2" @click="isEditPassword = false">取消</button>
            <button type="submit" class="btn btn-primary">送出</button>
          </div>
        </template>
      </v-form>
    </section>
    <section class="pt-2">
      <SectionTitle :title="'常用訂購人資料'">
        <template #button>
          <button type="button" class="btn btn-primary" title="修改設定"
            @click="isEditSettings = true" :disabled="isEditSettings">
            <i class="bi bi-pencil-fill"></i>
          </button>
        </template>
        <template #text>
          <p class="text-muted my-1">此設定可於結帳流程中，將訂購人資料自動填入欄位。</p>
        </template>
      </SectionTitle>
      <v-form class="px-3 mt-4" v-slot="{ errors, validate }" @submit="setUserSettings">
        <div class="row align-items-center mb-2 mb-sm-0">
          <div class="col-sm-3">
            <label class="form-label mb-sm-3 text-muted" for="name">
              訂購人姓名*
            </label>
          </div>
          <div class="col mb-3" v-if="isEditSettings">
            <v-field type="text" placeholder="請輸入姓名" name="姓名"
              class="form-control" :class="{'is-invalid': errors['姓名']}" id="name"
              rules="required" v-model="tempSettings.name"></v-field>
            <error-message name="姓名" class="invalid-feedback text-start"/>
          </div>
          <div class="col" v-else>
            <p class="text-break">{{ tempSettings.name }}</p>
          </div>
        </div>
        <div class="row align-items-center mb-2 mb-sm-0">
          <div class="col-sm-3">
            <label class="form-label mb-sm-3 text-muted" for="phone">
              訂購人手機*
            </label>
          </div>
          <div class="col mb-3" v-if="isEditSettings">
            <v-field type="tel" placeholder="請輸入手機號碼" name="手機"
              class="form-control" :class="{'is-invalid': errors['手機']}" id="phone"
              :rules="$filters.isPhone" v-model="tempSettings.phone"></v-field>
            <error-message name="手機" class="invalid-feedback text-start"/>
          </div>
          <div class="col" v-else>
            <p class="text-break">{{ tempSettings.phone }}</p>
          </div>
        </div>
        <div class="row mb-2 mb-sm-0">
          <div class="col-sm-3">
            <label class="form-label mb-2 mb-sm-3 mt-sm-1 text-muted" for="delivery">
              取貨方式
            </label>
          </div>
          <template v-if="isEditSettings">
            <div class="col-auto">
              <div class="form-check form-switch mb-2 mb-sm-3 mt-sm-1">
                <input class="form-check-input" type="checkbox"
                  v-model="enabledOptions.delivery" id="setDelivery"
                  @change="tempSettings.delivery = ''; validate()">
                <label class="form-check-label" for="setDelivery">
                  啟用設定
                </label>
              </div>
            </div>
            <div class="col-12 col-sm mb-3">
              <v-field class="form-select"
                :class="{'is-invalid': errors['delivery'], 'text-muted': !enabledOptions.address}"
                id="delivery" name="delivery" as="select"
                placeholder="請選擇取貨方式" v-model="tempSettings.delivery" :rules="isValidSelect"
                @input="tempSettings.payment = ''" :disabled="!enabledOptions.delivery">
                <option disabled value="">請選擇取貨方式</option>
                <option value="外送">外送</option>
                <option value="門市取貨">門市取貨</option>
              </v-field>
              <error-message name="delivery" class="invalid-feedback"></error-message>
            </div>
          </template>
          <div class="col-12 col-sm" v-else>
            <p class="text-break">{{ tempSettings.delivery || '尚未設定' }}</p>
          </div>
        </div>
        <div class="row mb-2 mb-sm-0" v-if="tempSettings.delivery === '外送'">
          <div class="col-sm-3">
            <label class="form-label mb-2 mb-sm-3 mt-sm-1 text-muted" for="address">
              外送地址
            </label>
          </div>
          <template v-if="isEditSettings">
            <div class="col-auto">
              <div class="form-check form-switch mb-2 mb-sm-3 mt-sm-1">
                <input class="form-check-input" type="checkbox"
                  v-model="enabledOptions.address" id="setAddress"
                  @change="tempSettings.address = ''; validate()">
                <label class="form-check-label" for="setAddress">
                  啟用設定
                </label>
              </div>
            </div>
            <div class="col-12 col-sm mb-3">
              <v-field type="tel" placeholder="請輸入外送地址" name="address" id="address"
                class="form-control"
                :class="{'is-invalid': errors['address'], 'text-muted': !enabledOptions.address}"
                v-model="tempSettings.address" :disabled="!enabledOptions.address"
                :rules="isValidInput"></v-field>
              <error-message name="address" class="invalid-feedback text-start"/>
            </div>
          </template>
          <div class="col-12 col-sm" v-else>
            <p class="text-break">{{ tempSettings.address || '尚未設定' }}</p>
          </div>
        </div>
        <div class="row mb-2 mb-sm-0">
          <div class="col-sm-3">
            <label class="form-label mb-2 mb-sm-3 mt-sm-1 text-muted" for="payment">
              付款方式
            </label>
          </div>
          <template v-if="isEditSettings">
            <div class="col-auto">
              <div class="form-check form-switch mb-2 mb-sm-3 mt-sm-1">
                <input class="form-check-input" type="checkbox"
                  v-model="enabledOptions.payment" id="setPayment"
                  @change="tempSettings.payment = ''; validate()">
                <label class="form-check-label" for="setPayment">
                  啟用設定
                </label>
              </div>
            </div>
            <div class="col-12 col-sm mb-3">
              <v-field class="form-select"
                :class="{'is-invalid': errors['payment'], 'text-muted': !enabledOptions.payment}"
                id="payment" name="payment" as="select"
                placeholder="請選擇付款方式" v-model="tempSettings.payment"
                :disabled="!enabledOptions.payment" :rules="isValidSelect">
                <option disabled value="">請選擇付款方式</option>
                <option value="線上刷卡">線上刷卡</option>
                <option value="ATM轉帳">ATM轉帳</option>
                <option value="門市付款" :disabled="tempSettings.delivery !== '門市取貨'">
                  門市付款(限門市取貨)</option>
              </v-field>
              <error-message name="payment" class="invalid-feedback"></error-message>
            </div>
          </template>
          <div class="col-12 col-sm" v-else>
            <p class="text-break">{{ tempSettings.payment || '尚未設定' }}</p>
          </div>
        </div>
        <div class="row mb-2 mb-sm-0">
          <div class="col-sm-3">
            <label class="form-label mt-sm-1 mb-2 mb-sm-3 text-muted" for="message">
              留言
            </label>
          </div>
          <template v-if="isEditSettings">
            <div class="col-auto">
              <div class="form-check form-switch mt-sm-1 mb-2 mb-sm-3">
                <input class="form-check-input" type="checkbox"
                  v-model="enabledOptions.message" id="setMessage"
                  @change="tempSettings.message = ''; validate()">
                <label class="form-check-label" for="setMessage">
                  啟用設定
                </label>
              </div>
            </div>
            <div class="col-12 col-sm mb-3">
              <v-field class="form-control"  :class="{ 'is-invalid': errors['message'] }"
                id="message" name="message" as="textarea"
                placeholder="請輸入留言內容" v-model="tempSettings.message" style="height: 100px;"
                :disabled="!enabledOptions.message" :rules="isValidInput">
              </v-field>
              <error-message name="message" class="invalid-feedback"></error-message>
            </div>
          </template>
          <div class="col-12 col-sm" v-else>
            <p class="text-break">{{ tempSettings.message || '尚未設定' }}</p>
          </div>
        </div>
        <div class="text-end" v-if="isEditSettings">
          <button type="button" class="btn me-2" @click="isEditSettings = false">取消</button>
          <button type="submit" class="btn btn-primary">送出</button>
        </div>
      </v-form>
    </section>
  </div>
</template>
