import Field from './Field'

export default function URL({ register, errors, name, ...props }) {
  return (
    <Field name={name} errors={errors}>
      <input
        id={`field_${name}`}
        className="p-1 w-full text-white bg-black focus:outline-none"
        type="url"
        ref={register}
        name={name}
        {...props}
      />
    </Field>
  )
}
