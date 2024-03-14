import * as cookie from '@/utils/cookie';
import * as base from './base';

const LOGIN_PATH = `${base.PRODUCT_URL}/v2/admin/signin`;
const LOGOUT_PATH = `${base.PRODUCT_URL}/v2/logout`;
const PRODUCTS_PATH = `${base.PRODUCT_URL}/v2/api/${base.PRODUCT_PATH}/admin/product`;
const CHECKAUTH_PATH = `${base.PRODUCT_URL}/v2/api/user/check`;

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

export function updateProduct(data) {
  const product = { ...data };
  const httpMethod = product.id ? 'put' : 'post';
  const path = `${PRODUCTS_PATH}${product.id ? `/${product.id}` : ''}`;
  return base.axiosFunction(httpMethod, path, { data: product }, getToken());
}

export function deleteProduct(id) {
  return base.axiosFunction('delete', `${PRODUCTS_PATH}/${id}`, null, getToken());
}
