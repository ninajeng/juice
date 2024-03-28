function dateFormat(date) {
  return `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
}

function timeFormat(dateTime) {
  return dateTime.toTimeString().substring(0, 8);
}

export function currency(num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function unixToDateTime(unixTime) {
  const dateTime = new Date(unixTime);
  return `${dateFormat(dateTime)} ${timeFormat(dateTime)}`;
}

export function dateTimeToUnix(dateTime) {
  return new Date(dateTime);
}

export function isPhone(value) {
  const phoneNumber = /^(09)[0-9]{8}$/;
  return phoneNumber.test(value) ? true : '請填寫正確的電話號碼';
}
