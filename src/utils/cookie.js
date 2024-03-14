const AdminTokenName = import.meta.env.VITE_ADMIN_TOKENNAME;
const UserTokenName = import.meta.env.VITE_USER_TOKENNAME;
const UserID = import.meta.env.VITE_USER_NUM;

function getCookie(key) {
  const str = `; ${document.cookie}`.split(`; ${key}=`);
  if (str.length === 2) return str.pop().split(';').shift();
  return '';
}

function setCookie(tokenName, token, expired) {
  let date = null;
  if (expired) {
    date = new Date(expired);
  } else {
    date = new Date();
    date.setDate(date.getDate() + 1);
  }
  document.cookie = `${tokenName}=${token}; expires=${date};`;
}

export function setAdminCookie({ token, expired }) {
  setCookie(AdminTokenName, token, expired);
}

export function setUserToken(token) {
  setCookie(UserTokenName, token);
}

export function setUserId(id) {
  setCookie(UserID, id);
}

export function getAdminCookie() {
  return getCookie(AdminTokenName);
}

export function getUserToken() {
  let token = getCookie(UserTokenName);
  if (token) {
    token = `Bearer ${token}`;
  }
  return token;
}

export function getUserId() {
  return getCookie(UserID);
}

export function delAdminCookie() {
  document.cookie = `${AdminTokenName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function delUserCookie() {
  document.cookie = `${UserTokenName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  document.cookie = `${UserID}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
