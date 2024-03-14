import axios from 'axios';

export const PRODUCT_URL = import.meta.env.VITE_PRODUCT_URL;
export const PRODUCT_PATH = import.meta.env.VITE_PRODUCT_PATH;
export const USER_URL = import.meta.env.VITE_JSON_SERVER_URL;

function setResData(res) {
  const response = {
    success: true,
    data: res.data || '',
  };
  return response;
}

function setResError(res) {
  const response = {
    success: false,
    errorMessage: res.data.message || res.data,
  };
  return response;
}

function setCatchError(e) {
  const response = {
    success: false,
    errorMessage: e.response?.data?.message || e.response || e,
  };
  return response;
}

export async function axiosFunction(method, path, data = null, token = null) {
  try {
    axios.defaults.headers.common.Authorization = token;
    const res = await axios[method](path, data);
    if (res.data.success || res.data.success === undefined) {
      return setResData(res);
    }
    return setResError(res);
  } catch (e) {
    return setCatchError(e);
  }
}
