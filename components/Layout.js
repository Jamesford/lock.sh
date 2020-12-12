import Head from 'next/head'

export default function Layout({ withZxcvbn = false, children }) {
  return (
    <>
      <Head>
        <title>Lock.sh</title>

        {withZxcvbn && (
          <script async type="text/javascript" src="/static/zxcvbn.js" />
        )}
      </Head>

      <main className="flex-grow flex flex-col justify-center items-center font-mono">
        {children}
      </main>
    </>
  )
}
