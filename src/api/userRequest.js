import * as cookie from '@/utils/cookie';
import * as base from './base';

const PRODUCT_PATH = `${base.PRODUCT_URL}/v2/api/${base.PRODUCT_PATH}/product`;
const REGISTER_PATH = `${base.USER_URL}/register`;
const LOGIN_PATH = `${base.USER_URL}/login`;
const USER_PATH = `${base.USER_URL}/600/users`;
const SETTINGS_PATH = `${base.USER_URL}/600/orderDataSettings`;
const COLLECTION_PATH = `${base.USER_URL}/600/collection`;
const CART_PATH = `${base.USER_URL}/600/carts`;
const COUPON_PATH = `${base.USER_URL}/coupons`;
const FEEDBACK_PATH = `${base.USER_URL}/feedbacks`;

// 產品
export function getProducts() {
  return base.axiosFunction('get', `${PRODUCT_PATH}s/all`);
}

export function getProductItem(id) {
  return base.axiosFunction('get', `${PRODUCT_PATH}/${id}`);
}
// 會員
export function register(user) {
  return base.axiosFunction('post', REGISTER_PATH, user);
}

export function login(user) {
  return base.axiosFunction('post', LOGIN_PATH, user);
}

export function logout() {
  cookie.delUserCookie();
}

export function checkLoginState() {
  const token = cookie.getUserToken();
  const id = cookie.getUserId();
  if (!token || !id) {
    cookie.delUserCookie();
    const res = {
      success: false,
    };
    return res;
  }
  return base.axiosFunction('get', `${USER_PATH}/${id}`, null, token);
}

export function updateUserData(data) {
  const token = cookie.getUserToken();
  const id = cookie.getUserId();
  if (!token || !id) {
    cookie.delUserCookie();
    const res = {
      success: false,
    };
    return res;
  }
  return base.axiosFunction('patch', `${USER_PATH}/${id}`, data, token);
}

export function updatePassword(userId, data) {
  return base.axiosFunction('patch', `${USER_PATH}/${userId}`, data, cookie.getUserToken());
}

export function getUserSettings(userId) {
  return base.axiosFunction('get', `${USER_PATH}/${userId}/orderDataSettings`, null, cookie.getUserToken());
}

export function initUserSettings(userId, data) {
  return base.axiosFunction('post', `${USER_PATH}/${userId}/orderDataSettings`, data, cookie.getUserToken());
}

export function updateUserSettings(settingsId, data) {
  return base.axiosFunction('put', `${SETTINGS_PATH}/${settingsId}`, data, cookie.getUserToken());
}
// 收藏
export function getUserCollection(userId) {
  return base.axiosFunction('get', `${USER_PATH}/${userId}/collection`, null, cookie.getUserToken());
}

export function initCollection(userId) {
  const data = {
    list: [],
    id: new Date().getTime(),
  };
  return base.axiosFunction('post', `${USER_PATH}/${userId}/collection`, data, cookie.getUserToken());
}

export function updateCollection(collectionId, data) {
  return base.axiosFunction('patch', `${COLLECTION_PATH}/${collectionId}`, data, cookie.getUserToken());
}
// 購物車
export function getCartInfo(userId) {
  return base.axiosFunction('get', `${USER_PATH}/${userId}/carts`, null, cookie.getUserToken());
}

export function initCart(userId) {
  const data = {
    list: [],
    id: new Date().getTime(),
  };
  return base.axiosFunction('post', `${USER_PATH}/${userId}/carts`, data, cookie.getUserToken());
}

export function clearCart(cartId) {
  return base.axiosFunction('delete', `${CART_PATH}/${cartId}`, null, cookie.getUserToken());
}

export function updateCart(cartId, data) {
  return base.axiosFunction('patch', `${CART_PATH}/${cartId}`, data, cookie.getUserToken());
}

export function addToCart(cartId, list) {
  return base.axiosFunction('patch', `${CART_PATH}/${cartId}`, { list }, cookie.getUserToken());
}

export function getCoupon(code) {
  return base.axiosFunction('get', `${COUPON_PATH}?code=${code}`);
}
// 訂單
export function sentOrder(userId, data) {
  return base.axiosFunction('post', `${USER_PATH}/${userId}/orders`, data, cookie.getUserToken());
}

export function getOrder(userId, orderId) {
  return base.axiosFunction('get', `${USER_PATH}/${userId}/orders?id=${orderId}`, null, cookie.getUserToken());
}

export function getOrderList(userId) {
  return base.axiosFunction('get', `${USER_PATH}/${userId}/orders`, null, cookie.getUserToken());
}
// 客戶回饋
export function getFeedback() {
  return base.axiosFunction('get', FEEDBACK_PATH);
}
