export default function Submit({ value }) {
  return (
    <label className="mb-8 w-full flex items-center">
      <input
        type="submit"
        value={value}
        className="p-1 w-full rounded text-black bg-white cursor-pointer hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring"
      />
    </label>
  )
}
