import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Back from '../components/Back'
import useRX from '../hooks/useRX'
import { encrypt, decrypt } from '../lib/crypto'
import RxTXT from '../components/RxTXT'
import RxURL from '../components/RxURL'

function Loading() {
  return <h1 className="text-2xl">RX::Loading...</h1>
}

function Error({ error }) {
  return (
    <>
      <Back />

      <h1 className="text-2xl">
        RX::{error.statusCode === 404 ? '404' : 'Error'}
      </h1>

      <p className="my-4">There's nothing here...</p>
    </>
  )
}

export default function RX(props) {
  const {
    query: { id },
  } = useRouter()
  const { loading, error, data } = useRX(id)
  /*
   * We could get server-side-props to pre-load the encrypted data
   * but doing an api call once the app is loaded could prevent
   * low-effort attempts to guess id's and scrape encrypted data
   */

  return (
    <Layout>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {data && data.type === 'txt' && (
        <RxTXT id={id} enc={data.enc} txt={data.data} />
      )}
      {data && data.type === 'url' && (
        <RxURL id={id} enc={data.enc} url={data.data} />
      )}
    </Layout>
  )
}
