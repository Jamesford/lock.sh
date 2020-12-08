import { valid } from 'semver'
import Boom from '@hapi/boom'
import { validate } from '../../lib/schema'
import { read } from '../../lib/redis'

export default async function rxHandler(req, res) {
  if (req.method !== 'GET') return res.status(404).json({ error: 'not found' })

  const { id } = req.query
  const resp = await read(id)

  if (!resp) {
    const {
      data,
      output: { statusCode, payload },
    } = Boom.notFound('Data not found for ID', { id })

    return res.status(statusCode).json({ ...payload, data })
  }

  const [type, rawEnc, data] = resp.split(':')
  const enc = JSON.parse(rawEnc)

  res.status(200).json({ id, type, enc, data })
}
