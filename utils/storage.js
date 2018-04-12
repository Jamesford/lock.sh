// Keeps track of previous lock id's created by this browser
import EventEmitter from 'events'

const db = 'lock_cache'

class Storage extends EventEmitter {
  constructor (props) {
    super(props)

    if (!process.browser) return {}
    this.store = {}
    this.load()
  }

  setStore = (store) => {
    this.store = store
    this.emit('data', store)
  }

  clear = () => {
    localStorage.removeItem(db)
    this.setStore({})
  }

  clean = (store) => {
    return Object.keys(store).reduce((acc, key) => {
      const time = store[key]
      if (Date.now() < time) { acc[key] = time }
      return acc
    }, {})
  }

  load = () => {
    const dbString = localStorage.getItem(db)

    let parsedHistory
    try {
      parsedHistory = JSON.parse(dbString)  
    } catch (e) {
      console.error(e)
    } finally {
      parsedHistory = parsedHistory || {}
    }
    
    const cleanedHistory = this.clean(parsedHistory)
    this.setStore(cleanedHistory)
    return this.store
  }

  save = () => {
    const dbString = JSON.stringify(this.store)
    localStorage.setItem(db, dbString)
    return true
  }

  put = (id, expiry) => {
    this.setStore({
      ...this.store,
      [id]: Date.now() + (parseInt(expiry, 10) * 1000)
    })
    return this.save()
  }

  list = () => {
    return this.store
  }
}

export default new Storage()
