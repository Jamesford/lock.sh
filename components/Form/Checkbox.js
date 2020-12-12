import Field from './Field'

export default function Checkbox({
  register,
  errors,
  name,
  children,
  ...props
}) {
  return (
    <Field error={errors && errors[name]}>
      <div className="p-1 flex-grow">{children}</div>

      <input
        className="mr-1 flex-grow-0 focus:outline-none focus:ring"
        type="checkbox"
        ref={register}
        name={name}
      />
    </Field>
  )
}
