import Field from './Field'

export default function TextArea({
  register,
  errors,
  name,
  rows = '6',
  ...props
}) {
  return (
    <Field name={name} errors={errors}>
      <textarea
        id={`field_${name}`}
        className="p-1 w-full text-white bg-black resize-none focus:outline-none"
        ref={register}
        name={name}
        rows={rows}
        {...props}
      />
    </Field>
  )
}
