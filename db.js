const sid = require('shortid')
const redis = require('redis')
const client = redis.createClient()

client.on('error', function (err) {
	if (err.code === 'ECONNREFUSED') throw err
	else console.log('Error ' + err)
})

module.exports = class DB {
	read (id) {
		return new Promise((resolve, reject) => {
			client.get(id, (err, res) => {
				if (err) return reject(err)
				else return resolve(res)
			})
		})
	}

	create (data) {
		return new Promise((resolve, reject) => {
			const id = sid.generate()
			// 86400 seconds === 24 hours
			client.set(id, data, 'EX', 86400, (err) => {
				if (err) return reject(err)
				else return resolve(id)
			})
		})
	}
}
