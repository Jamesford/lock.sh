const sid = require('shortid')

module.exports = class DB {
	constructor () {
		this.memory = {}
	}

	read (id) {
		return this.memory[id]
	}

	create (data) {
		const id = sid.generate()
		this.memory[id] = data
		return id
	}
}
