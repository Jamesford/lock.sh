import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { decrypt } from '../lib/crypto'
import Password from './Form/Password'
import Submit from './Form/Submit'

const defaultUnlock = (d) => console.log('Unlock:onUnlock =>', d)

export default function Unlock({ enc, onUnlock = defaultUnlock }) {
  const { register, handleSubmit, errors, setError } = useForm()
  const [decrypted, setDecrypted] = useState(null)

  const onSubmit = ({ pass }) => {
    try {
      const dec = decrypt(enc, pass)
      if (dec) {
        onUnlock(dec)
      } else {
        setError('pass', {
          type: 'manual',
          message: 'incorrect password',
        })
      }
    } catch (e) {
      // Catch and ignore "Error: Malformed UTF-8 data"
      if (e.message !== 'Malformed UTF-8 data') console.error(e)
    }
  }

  return (
    <form className="w-64 my-8" onSubmit={handleSubmit(onSubmit)}>
      <Password
        name="pass"
        placeholder="Password"
        register={register({ required: true })}
        errors={errors}
        autoFocus
      />

      <Submit value="Decrypt" />
    </form>
  )
}
