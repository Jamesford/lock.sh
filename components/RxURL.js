import { useState } from 'react'
import Link from 'next/link'
import Back from './Back'
import Unlock from './Unlock'
import Lock from './Lock'

export default function RxURL({ id, enc, url }) {
  const [decrypted, setDecrypted] = useState(enc ? false : url)
  const unlock = (dec) => setDecrypted(dec)
  const lock = () => setDecrypted(false)

  return (
    <>
      {!enc || !decrypted ? <Back /> : <Lock onLock={lock}>Lock</Lock>}

      <h1 className="text-2xl">RX{enc && '::ENC'}::URL</h1>

      {!decrypted && <Unlock enc={url} onUnlock={unlock} />}

      {!!decrypted && (
        <div className="w-64 my-4">
          <p className="mb-4 text-center">{decrypted}</p>

          <Link href={decrypted}>
            <a className="p-1 w-full block text-center rounded text-black bg-white cursor-pointer hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring">
              Navigate to URL
            </a>
          </Link>
        </div>
      )}
    </>
  )
}
