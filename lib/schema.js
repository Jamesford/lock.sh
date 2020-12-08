import Joi from 'joi'

export const schema = Joi.object({
  type: Joi.any().valid('url', 'txt').required(),
  enc: Joi.bool().strict().required(),
  data: Joi.string().base64().required(),
  exp: Joi.any()
    .valid('172800', '86400', '43200', '21600', '3600', '1800', '600')
    .required(),
  long: Joi.bool().strict().required(),
})

export function validate(data) {
  return schema.validate(data, {
    abortEarly: false,
    convert: false,
  })
}

export default {
  schema,
  validate,
}
