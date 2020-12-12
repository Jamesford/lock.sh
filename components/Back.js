import Link from 'next/link'

export default function Back() {
  return (
    <Link href="/">
      <a className="p-2 text-gray-600 hover:text-white hover:underline focus:outline-none focus:ring">
        Back
      </a>
    </Link>
  )
}
