import { useState } from 'react'
import Link from 'next/link'
import Back from './Back'
import Unlock from './Unlock'

export default function RxURL({ id, enc, url }) {
  const [decrypted, setDecrypted] = useState(enc ? false : url)
  const onUnlock = (dec) => setDecrypted(dec)

  return (
    <>
      <Back />

      <h1 className="text-2xl">RX{enc && '::ENC'}::URL</h1>

      {!decrypted && <Unlock enc={url} onUnlock={onUnlock} />}

      {!!decrypted && (
        <>
          <p className="my-4">{decrypted}</p>

          <Link href={decrypted}>
            <a className="px-4 py-2 text-center rounded text-black bg-white hover:bg-gray-400 cursor-pointer focus:outline-none focus:ring focus:bg-gray-400">
              Navigate to URL
            </a>
          </Link>

          {/* {enc && <button onClick={() => setDecrypted(false)}>Lock</button>} */}
        </>
      )}
    </>
  )
}
