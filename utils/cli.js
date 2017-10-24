import CryptoJS from 'crypto-js'
import api from './api'

class Lock {
  static intro () {
    console.log('Welcome to Lock.sh')
    console.log('Feel free to use the cli to create a Lock')
    console.log('-------------------------------------------')
    Lock.help()
  }

  static help () {
    console.log('Commands')
    console.log('  new Lock(data, pass) -- creates a Lock with given data and password')
    console.log('      .encrypt(pass)   -- encrypt the Lock using the password (uses Lock.pass if no argument)')
    console.log('      .decrypt(pass)   -- decrypt the Lock using the password (uses Lock.pass if no argument)')
    console.log('      .save()*         -- saves the Lock (will encrypt if not already encrypted)')
    console.log('      .get(id)*        -- populates current Lock with data retrieved using Id argument (overwrites current data)')
    console.log('  Lock.help()          -- prints this help text')
    console.log('')
    console.log(' * - returns a Promise, otherwise returns the Lock instance')
    console.log('-------------------------------------------')
  }

  constructor (data, pass) {
    this.data = data || ''
    this.pass = pass || ''
    this.id = ''
    this.enc = ''
  }

  encrypt (pass) {
    if (!this.data || (!pass && !this.pass)) throw 'No data or password to encrypt'
    this.enc = CryptoJS.AES.encrypt(this.data, pass || this.pass).toString()
    return this
  }

  decrypt (pass) {
    if (!this.enc || (!pass && !this.pass)) throw 'No encrypted data or password to decrypt'
    this.data = CryptoJS.AES.decrypt(this.enc, pass || this.pass).toString(CryptoJS.enc.Utf8)
    return this
  }

  async save () {
    if (!this.data && !this.enc) throw 'No data to encrypt or encrypted data to save'

    // If no encrypted data, encrypt the data
    if (!this.enc) this.encrypt()

    let res = await api.create(this.enc)
    if (!res.ok) throw 'Failed to save Lock'

    this.id = res.id
    return this
  }

  async get (id) {
    let res = await api.read(id)
    if (!res.ok) throw 'Failed to get Lock'

    this.id = id
    this.enc = res.data
    return this
  }
}

if (process.browser) {
    Lock.intro()
    global.Lock = Lock
}
