import Head from 'next/head'
const { NEXT_PUBLIC_PAGE_TITLE } = process.env

export default function Layout({ withZxcvbn = false, children }) {
  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_PAGE_TITLE}</title>

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
