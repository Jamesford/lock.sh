// Keeps track of previous lock id's created by this browser

const db = 'lock_cache'

class Storage {
  constructor (props) {
    if (!process.browser) return {}
    this.store = {}
    this.load()
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
    
    this.store = this.clean(parsedHistory)
    return this.store
  }

  save = () => {
    const dbString = JSON.stringify(this.store)
    localStorage.setItem(db, dbString)
    return true
  }

  put = (id, expiry) => {
    this.store[id] = Date.now() + (parseInt(expiry, 10) * 1000)
    return this.save()
  }

  list = () => {
    return this.store
  }
}

export default new Storage()

