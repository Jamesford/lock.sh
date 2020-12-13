import Field from './Field'

export default function Password({ register, errors, name, ...props }) {
  return (
    <Field name={name} errors={errors}>
      <input
        id={`field_${name}`}
        className="p-1 w-full text-white bg-black focus:outline-none"
        type="password"
        ref={register}
        name={name}
        {...props}
      />
    </Field>
  )
}
