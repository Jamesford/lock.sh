import CryptoJS from 'crypto-js'

export function encrypt(data, pass) {
  return CryptoJS.AES.encrypt(data, pass).toString()
}

export function decrypt(enc, pass) {
  return CryptoJS.AES.decrypt(enc, pass).toString(CryptoJS.enc.Utf8)
}

export default {
  encrypt,
  decrypt,
}
