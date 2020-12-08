import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import useRX from '../hooks/useRX'

function Loading() {
  return <h1 className="text-2xl">RX::Loading...</h1>
}

function Error({ error }) {
  return (
    <>
      <h1 className="text-2xl">
        RX::{error.statusCode === 404 ? '404' : 'Error'}
      </h1>

      <p className="my-4">There's nothing here...</p>

      <Link href="/">
        <a className="p-2 text-gray-600 hover:text-white hover:underline focus:outline-none focus:ring">
          Back
        </a>
      </Link>
    </>
  )
}

function RxURL({ id, type, enc, url }) {
  return (
    <>
      <h1 className="text-2xl">RX{enc && '::ENC'}::URL</h1>
      {!enc && (
        <>
          <p className="my-4">{url}</p>

          <Link href={url}>
            <a className="px-4 py-2 text-center rounded text-black bg-white hover:bg-gray-400 cursor-pointer focus:outline-none focus:ring focus:bg-gray-400">
              Navigate to URL
            </a>
          </Link>
        </>
      )}
      {enc && (
        <pre>
          <code>{JSON.stringify({ id, type, enc, txt }, null, 2)}</code>
        </pre>
      )}
    </>
  )
}

function RxTXT({ id, type, enc, txt }) {
  return (
    <>
      <h1 className="text-2xl">RX::ENC::TXT</h1>
      <pre>
        <code>{JSON.stringify({ id, type, enc, txt }, null, 2)}</code>
      </pre>
    </>
  )
}

export default function RX(props) {
  const {
    query: { id },
  } = useRouter()
  const { loading, error, data } = useRX(id)

  return (
    <Layout>
      <main className="flex-grow flex flex-col justify-center items-center font-mono">
        {loading && <Loading />}
        {error && <Error error={error} />}
        {data && data.type === 'url' && (
          <RxURL id={id} type={data.type} enc={data.enc} url={data.data} />
        )}
        {data && data.type === 'txt' && (
          <RxTXT id={id} type={data.type} enc={data.enc} txt={data.data} />
        )}
      </main>
    </Layout>
  )
}
