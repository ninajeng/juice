<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      couponModal: null,
      coupon: {},
      dueDateLocal: '',
      dueTimeHour: '23',
      dueTimeMinute: '59',
      dueTimeSec: '59',
      isAliveForm: false,
    };
  },
  props: ['tempCoupon'],
  watch: {
    tempCoupon(data) {
      this.coupon = { ...data };
    },
  },
  computed: {
    dueDate_unix() {
      if (
        !this.dueDateLocal
        || this.dueTimeHour === ''
        || this.dueTimeMinute === ''
        || this.dueTimeSec === ''
      ) {
        return '請輸入截止日期與時間！';
      }
      const dateTime = `${this.dueDateLocal} ${this.dueTimeHour}:${this.dueTimeMinute}:${this.dueTimeSec}`;
      return this.$filters.dateTimeToUnix(dateTime);
    },
  },
  methods: {
    show() {
      this.isAliveForm = true;
      this.couponModal.show();
    },
    hide() {
      this.couponModal.hide();
      this.isAliveForm = false;
    },
    updateCoupon() {
      this.coupon.dueDate = this.dueDate_unix;
      this.$emit('updateCoupon', this.coupon);
    },
    setCouponEnable() {
      if (this.coupon.isEnabled) {
        this.coupon.isEnabled = 0;
      } else {
        this.coupon.isEnabled = 1;
      }
    },
    checkDueTime(type) {
      switch (type) {
        case 'hour':
          this.dueTimeHour = this.checkValue(this.dueTimeHour, 23, 0);
          break;
        case 'min':
          this.dueTimeMinute = this.checkValue(this.dueTimeMinute, 59, 0);
          break;
        case 'sec':
          this.dueTimeSec = this.checkValue(this.dueTimeSec, 59, 0);
          break;
        default:
          break;
      }
    },
    checkDiscount() {
      this.coupon.discount = this.checkValue(this.coupon.discount, 99, 1);
    },
    checkValue(num, max, min) {
      if (num < min) return min;
      if (num > max) return max;
      return num;
    },
  },
  mounted() {
    this.couponModal = new Modal(this.$refs.modal, {
      backdrop: 'static',
    });
  },
};
</script>

<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-light p-2">
          <h2 class="modal-title flex-fill text-center fs-6 opacity-75">
            {{ `${coupon.id ? '編輯' : '新增'}優惠券` }}
          </h2>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>
        <div class="modal-body p-4">
          <v-form v-slot="{ errors }" @submit="updateCoupon">
            <template v-if="isAliveForm">
              <div class="border border-bottom-0 p-4 position-relative">
                <h5 class="position-absolute start-0 translate-middle-x
                  mx-0 bg-white py-2 fs-6"
                style="writing-mode: vertical-lr; letter-spacing: 0.3rem;">
                  <span class="opacity-75">優惠券資料</span>
                </h5>
                <div class="row">
                  <div class="col-lg-6 mb-3">
                    <label for="name" class="form-label">優惠券名稱*</label>
                    <v-field type="text"
                      id="name"
                      name="優惠券名稱"
                      class="form-control"
                      :class="{'is-invalid': errors['優惠券名稱']}"
                      placeholder="請輸入優惠券名稱"
                      rules="required"
                      v-model="coupon.name"/>
                    <ErrorMessage
                      name="優惠券名稱"
                      class="invalid-feedback"
                    />
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label for="code" class="form-label">優惠券代碼*</label>
                    <v-field type="text"
                      id="code"
                      name="優惠券代碼"
                      class="form-control"
                      :class="{'is-invalid': errors['優惠券代碼']}"
                      placeholder="請輸入優惠券代碼"
                      rules="required"
                      v-model="coupon.code"/>
                    <ErrorMessage
                      name="優惠券代碼"
                      class="invalid-feedback"
                    />
                  </div>
                  <div class="col-lg-12 mb-3">
                    <label for="discount" class="form-label"
                      >折扣內容* <span class="text-muted fs-7">(限制：1~99)</span>
                    </label>
                    <div>
                      <v-field
                        type="number"
                        name="優惠券折扣數"
                        class="form-control d-inline-block me-1"
                        :class="{ 'is-invalid': errors['優惠券折扣數'] }"
                        rules="required"
                        style="width: 250px"
                        id="discount"
                        v-model="coupon.discount"
                        @change="checkDiscount"
                        min="1"
                        max="99"
                        placeholder="請輸入折扣數（如：90）"
                      />
                      =<span class="ms-1"
                        >{{ coupon.discount ? coupon.discount / 10 : '？' }}折</span
                      >
                      <ErrorMessage name="優惠券折扣數" class="invalid-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="me-5">
                      <label for="dueDate" class="form-label">優惠截止日期*</label>
                      <v-field
                        type="date"
                        name="截止日期"
                        class="form-control"
                        :class="{ 'is-invalid': errors['截止日期'] }"
                        rules="required"
                        style="width: 250px"
                        id="dueDate"
                        ref="dueDateDefault"
                        v-model="dueDateLocal"
                        @input="dueDateLocal = $event.target.value"
                        min="2123-1-01"
                        max="2123-12-31"
                      />
                      <ErrorMessage name="截止日期" class="invalid-feedback" />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mt-3 mt-lg-0">
                      <label for="dueTimeHour" class="form-label">優惠截止時間*</label>
                      <div>
                        <v-field
                          type="number"
                          name="截止時間(hour)"
                          class="form-control d-inline-block w-auto"
                          :class="{ 'is-invalid': errors['截止時間(hour)'] }"
                          rules="required"
                          id="dueTimeHour"
                          v-model="dueTimeHour"
                          @change="checkDueTime('hour')"
                          placeholder="時"
                          min="0"
                          max="23"
                        />：
                        <v-field
                          type="number"
                          name="截止時間(minute)"
                          class="form-control d-inline-block w-auto"
                          :class="{ 'is-invalid': errors['截止時間(minute)'] }"
                          rules="required"
                          v-model="dueTimeMinute"
                          @change="checkDueTime('min')"
                          placeholder="分"
                          min="0"
                          max="59"
                        />：
                        <v-field
                          type="number"
                          name="截止時間(sec)"
                          class="form-control d-inline-block w-auto"
                          :class="{ 'is-invalid': errors['截止時間(sec)'] }"
                          rules="required"
                          v-model="dueTimeSec"
                          @change="checkDueTime('sec')"
                          placeholder="秒"
                          min="0"
                          max="59"
                        />
                        <ErrorMessage
                          name="截止時間(hour)"
                          class="invalid-feedback"
                        />
                        <ErrorMessage
                          name="截止時間(minute)"
                          class="invalid-feedback"
                        />
                        <ErrorMessage name="截止時間(sec)" class="invalid-feedback" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border position-relative">
                <h5 class="position-absolute start-0
                  translate-middle-x mx-0 mb-0 bg-white py-2 fs-6"
                style="writing-mode: vertical-lr; letter-spacing: 0.3rem; margin-top: 0.3rem;">
                  <span class="opacity-75">啟用</span>
                </h5>
                <p class="mb-0 px-4 py-3">
                  <a href="#" class="text-decoration-none" @click.prevent="setCouponEnable">
                    <i class="bi bi-toggle-on fs-4 align-middle" v-if="coupon.isEnabled"></i>
                    <i class="bi bi-toggle-off fs-4 align-middle" v-else></i>
                    <span class="text-dark ms-2 align-middle">啟用優惠券</span>
                  </a>
                </p>
              </div>
            </template>
            <div class="text-end mt-4">
              <button type="button" class="btn text-muted" @click="hide">取消</button>
              <button type="submit" class="btn btn-primary">
                {{ coupon.id ? '更新' : '新增' }}
              </button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
