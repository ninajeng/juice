import * as cookie from '@/utils/cookie';
import * as base from './base';

const LOGIN_PATH = `${base.PRODUCT_URL}/v2/admin/signin`;
const LOGOUT_PATH = `${base.PRODUCT_URL}/v2/logout`;
const PRODUCTS_PATH = `${base.PRODUCT_URL}/v2/api/${base.PRODUCT_PATH}/admin/product`;
const IMAGEUPLOAD_PATH = `${base.PRODUCT_URL}/api/${base.PRODUCT_PATH}/admin/upload`;
const CHECKAUTH_PATH = `${base.PRODUCT_URL}/v2/api/user/check`;
const COUPONS_PATH = `${base.USER_URL}/coupons`;
const ORDERS_PATH = `${base.USER_URL}/orders`;

function getToken() {
  return cookie.getAdminCookie();
}

export function checkAuth() {
  if (!getToken()) {
    const response = {
      success: false,
    };
    return response;
  }
  return base.axiosFunction('post', CHECKAUTH_PATH, null, getToken());
}

export function login(user) {
  return base.axiosFunction('post', LOGIN_PATH, user);
}

export function logout() {
  return base.axiosFunction('post', LOGOUT_PATH, null, getToken());
}

export function getProducts(page = 1) {
  return base.axiosFunction('get', `${PRODUCTS_PATH}s?page=${page}`, null, getToken());
}

export function uploadImage(file) {
  return base.axiosFunction('post', IMAGEUPLOAD_PATH, file, getToken());
}

export function updateProduct(data) {
  const product = { ...data };
  const httpMethod = product.id ? 'put' : 'post';
  const path = `${PRODUCTS_PATH}${product.id ? `/${product.id}` : ''}`;
  return base.axiosFunction(httpMethod, path, { data: product }, getToken());
}

export function deleteProduct(id) {
  return base.axiosFunction('delete', `${PRODUCTS_PATH}/${id}`, null, getToken());
}

export function getCoupons() {
  return base.axiosFunction('get', COUPONS_PATH, null, getToken());
}

export function updateCoupon(coupon) {
  const httpMethod = coupon.id ? 'put' : 'post';
  const path = `${COUPONS_PATH}${coupon.id ? `/${coupon.id}` : ''}`;
  return base.axiosFunction(httpMethod, path, coupon, getToken());
}

export function deleteCoupon(id) {
  return base.axiosFunction('delete', `${COUPONS_PATH}/${id}`, null, getToken());
}

export function getOrders() {
  return base.axiosFunction('get', ORDERS_PATH, null, getToken());
}

export function updateOrder(order) {
  return base.axiosFunction('put', `${ORDERS_PATH}/${order.id}`, order, getToken());
}

export function deleteOrder(id) {
  return base.axiosFunction('delete', `${ORDERS_PATH}/${id}`, null, getToken());
}
