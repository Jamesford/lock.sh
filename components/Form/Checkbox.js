import Field from './Field'

export default function Checkbox({
  register,
  errors,
  name,
  children,
  ...props
}) {
  return (
    <Field name={name} errors={errors}>
      <div className="p-1 flex-grow">{children}</div>

      <input
        id={`field_${name}`}
        className="mr-1 flex-grow-0 focus:outline-none"
        type="checkbox"
        ref={register}
        name={name}
        {...props}
      />
    </Field>
  )
}
