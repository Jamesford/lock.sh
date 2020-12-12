import Link from 'next/link'
import Layout from '../components/Layout'

export default function Index() {
  return (
    <Layout>
      <p className="p-2">What will you share?</p>

      <div className="flex items-baseline">
        <Link href="/url">
          <a className="p-2 hover:underline focus:outline-none focus:ring">
            URL
          </a>
        </Link>

        <span className="p-2">or</span>

        <Link href="/txt">
          <a className="p-2 hover:underline focus:outline-none focus:ring">
            TXT
          </a>
        </Link>
      </div>
    </Layout>
  )
}
