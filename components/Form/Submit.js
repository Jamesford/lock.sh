export default function Submit({ value }) {
  return (
    <input
      className="p-1 w-full rounded text-black bg-white cursor-pointer hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring"
      type="submit"
      value={value}
    />
  )
}
