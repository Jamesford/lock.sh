const defaultLock = () => console.warn('Lock:onLock method is undefined')

export default function Lock({ onLock = defaultLock, children }) {
  return (
    <button
      className="p-2 text-gray-600 hover:text-white hover:underline focus:outline-none focus:ring"
      onClick={onLock}
    >
      {children}
    </button>
  )
}
