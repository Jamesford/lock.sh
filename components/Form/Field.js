export default function Field({ errors, name, children }) {
  const error = errors && errors[name]

  return (
    <label
      className={`mb-8 w-full flex items-center border-b relative ${
        error ? 'border-red-600' : 'border-gray-400'
      } focus-within:ring`}
      htmlFor={`field_${name}`}
    >
      {children}

      <div className="absolute -bottom-6 text-red-600">
        {error && error.message}
      </div>
    </label>
  )
}
