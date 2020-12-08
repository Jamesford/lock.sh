import { nanoid } from 'nanoid'
import Redis from 'ioredis'
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_ENDPOINT,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
})

async function freeID(ln) {
  let found = false
  while (found === false) {
    const id = nanoid(ln)
    const exists = await redis.exists(id)
    if (exists === 0) {
      found = id
    }
  }
  return found
}

export async function read(id) {
  return redis.get(id)
}

export async function write({ data, expire = '86400', long = false }) {
  const ex = parseInt(expire, 10)
  const id = await freeID(long ? 21 : 5)
  const res = await redis.set(id, data, 'EX', ex)
  return id
}

export default {
  read,
  write,
}
