import { valid } from 'semver'
import Boom from '@hapi/boom'
import { validate } from '../../lib/schema'
import { write } from '../../lib/redis'

export default async function txHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({ error: 'not found' })

  const { error, value: form } = validate(req.body)

  if (error) {
    const {
      data,
      output: { statusCode, payload },
    } = Boom.badData('Received bad data', error.details)

    return res.status(statusCode).json({ ...payload, data })
  }

  const id = await write({
    data: [form.type, form.enc, form.data].join(':'),
    expire: form.exp,
    long: form.long,
  })

  res.status(200).json({ id })
}
