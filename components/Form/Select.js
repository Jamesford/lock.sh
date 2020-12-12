import Field from './Field'

const defaultOptions = [
  { value: '172800', label: 'Expire after 48h' },
  { value: '86400', label: 'Expire after 24h' },
  { value: '43200', label: 'Expire after 12h' },
  { value: '21600', label: 'Expire after 6h' },
  { value: '3600', label: 'Expire after 1h' },
  { value: '1800', label: 'Expire after 30m' },
  { value: '600', label: 'Expire after 10m' },
]

export default function Select({
  register,
  errors,
  name,
  options = defaultOptions,
  ...props
}) {
  return (
    <Field name={name} errors={errors}>
      <select
        id={`field_${name}`}
        className="py-1 w-full text-white bg-black focus:outline-none focus:ring"
        ref={register}
        name={name}
        {...props}
      >
        {options.map(({ value, label }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
    </Field>
  )
}
