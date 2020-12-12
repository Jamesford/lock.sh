import { useState, useEffect } from 'react'
import { decrypt } from '../lib/crypto'
import Back from './Back'
import Unlock from './Unlock'
import TextArea from './Form/TextArea'
import Copy from './Copy'
import Lock from './Lock'

export default function RxTXT({ txt }) {
  const [decrypted, setDecrypted] = useState(false)
  const unlock = (dec) => setDecrypted(dec)
  const lock = () => setDecrypted(false)

  return (
    <>
      {!decrypted ? <Back /> : <Lock onLock={lock}>Lock</Lock>}

      <h1 className="text-2xl">RX::ENC::TXT</h1>

      {!decrypted && <Unlock enc={txt} onUnlock={unlock} />}

      {!!decrypted && (
        <div className="w-64 my-4">
          <TextArea value={decrypted} readOnly />

          <Copy text={decrypted} />
        </div>
      )}
    </>
  )
}
