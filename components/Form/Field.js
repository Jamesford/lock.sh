export default function Field({ error, children }) {
  return (
    <label
      className={`mb-8 w-full flex items-center border-b relative ${
        error ? 'border-red-600' : 'border-gray-400'
      }`}
    >
      {children}

      <div className="absolute -bottom-6 text-red-600">
        {error && error.message}
      </div>
    </label>
  )
}
