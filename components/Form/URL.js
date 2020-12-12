import Field from './Field'

export default function URL({ register, errors, name, ...props }) {
  return (
    <Field error={errors && errors[name]}>
      <input
        className="p-1 w-full text-white bg-black focus:outline-none focus:ring"
        type="url"
        ref={register}
        name={name}
        {...props}
      />
    </Field>
  )
}
