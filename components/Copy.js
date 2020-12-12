import { useState } from 'react'

export default function Copy({ text, timeout = 1000 }) {
  const [status, set] = useState({})
  const setStatus = (success, message) => {
    set({ success, message })
    if (success) setTimeout(() => set({}), timeout)
  }

  return (
    <div className="relative">
      <button
        className="p-1 w-full rounded text-black bg-white cursor-pointer hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text)
            setStatus(true, 'copied!')
          } catch (e) {
            console.error(e)
            setStatus(false, e.message)
          }
        }}
      >
        Copy
      </button>

      {status && (
        <span
          className={`absolute -bottom-6 left-0 ${
            status.success ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status.message}
        </span>
      )}
    </div>
  )
}
