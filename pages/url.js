import Link from 'next/link'
import Layout from '../components/Layout'

export default function URL({ back }) {
  return (
    <Layout>
      <main className="flex-grow flex flex-col justify-center items-center font-mono">
        <Link href="/">
          <a className="p-2 text-gray-600 hover:text-white hover:underline focus:outline-none focus:ring">
            Back
          </a>
        </Link>

        <h1 className="text-2xl">TX::URL</h1>

        <form className="w-64 my-4">
          <label className="mb-8 w-full flex items-center border-b border-gray-400">
            <input
              type="text"
              className="p-1 w-full text-white bg-black focus:outline-none focus:ring"
              placeholder="URL"
              autoFocus
            />
          </label>

          <label className="mb-8 w-full flex items-center border-b border-gray-400">
            <div className="p-1 flex-grow">Encrypt?</div>
            <input
              type="checkbox"
              className="mr-1 flex-grow-0 focus:outline-none focus:ring"
            />
          </label>

          <label className="mb-8 w-full flex items-center border-b border-gray-400">
            <input
              type="password"
              className="p-1 w-full text-white bg-black focus:outline-none focus:ring"
              placeholder="Password"
            />
          </label>

          <label className="mb-8 w-full flex items-center border-b border-gray-400">
            <select className="py-1 w-full text-white bg-black focus:outline-none focus:ring">
              <option value="48h">Expire after 48h</option>
              <option value="24h">Expire after 24h</option>
              <option value="12h">Expire after 12h</option>
              <option value="6h">Expire after 6h</option>
              <option value="1h">Expire after 1h</option>
              <option value="30m">Expire after 30m</option>
              <option value="10m">Expire after 10m</option>
            </select>
          </label>

          <label className="mb-8 w-full flex items-center border-b border-gray-400">
            <div className="p-1 flex-grow">Harder-to-guess ID?</div>
            <input
              type="checkbox"
              className="mr-1 flex-grow-0 focus:outline-none focus:ring"
            />
          </label>

          <label className="mb-8 w-full flex items-center">
            <input
              type="submit"
              className="p-1 w-full rounded text-white bg-black hover:text-black hover:bg-white cursor-pointer focus:outline-none focus:ring"
            />
          </label>
        </form>
      </main>
    </Layout>
  )
}
