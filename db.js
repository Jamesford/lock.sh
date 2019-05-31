const sid = require('shortid')
const SillyId = require('sillyid')
const sillid = new SillyId()
const redis = require('redis')
const client = redis.createClient()

client.on('error', function(err) {
  if (err.code === 'ECONNREFUSED') throw err
  else console.log('Error ' + err)
})

module.exports = class DB {
  read(id) {
    return new Promise((resolve, reject) => {
      client.get(id, (err, res) => {
        if (err) return reject(err)
        else return resolve(res)
      })
    })
  }

  create(data, expiry, friendly) {
    return new Promise((resolve, reject) => {
      const expireAfter = parseInt(expiry, 10)
      const id = friendly ? sillid.generate() : sid.generate()
      client.set(id, data, 'EX', expireAfter, err => {
        if (err) return reject(err)
        else return resolve(id)
      })
    })
  }
}
