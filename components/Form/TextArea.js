import Field from './Field'

export default function TextArea({
  register,
  errors,
  name,
  rows = '6',
  ...props
}) {
  return (
    <Field error={errors && errors[name]}>
      <textarea
        className="p-1 w-full text-white bg-black focus:outline-none focus:ring resize-none"
        ref={register}
        name={name}
        rows={rows}
        {...props}
      />
    </Field>
  )
}
