import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

export function encrypt(data, pass) {
  return AES.encrypt(data, pass).toString()
}

export function decrypt(enc, pass) {
  return AES.decrypt(enc, pass).toString(Utf8)
}

export default {
  encrypt,
  decrypt,
}
