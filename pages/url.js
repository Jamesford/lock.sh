import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { encrypt } from '../lib/crypto'
import Layout from '../components/Layout'
import Back from '../components/Back'
import InputURL from '../components/Form/URL'
import Password from '../components/Form/Password'
import Select from '../components/Form/Select'
import Checkbox from '../components/Form/Checkbox'
import Submit from '../components/Form/Submit'

export default function URL({ back }) {
  const router = useRouter()
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = ({ url, enc, pass, exp, long }) => {
    const payload = {
      enc,
      exp,
      long,
      data: btoa(enc ? encrypt(url, pass) : url),
      type: 'url',
    }

    console.log(payload)

    fetch('/api/tx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(({ id }) => router.push(`/${id}`))
  }

  return (
    <Layout>
      <Back />

      <h1 className="text-2xl">TX::URL</h1>

      <form className="w-64 my-4" onSubmit={handleSubmit(onSubmit)}>
        <InputURL
          name="url"
          placeholder="URL"
          autoFocus
          register={register({ required: true })}
          errors={errors}
        />

        <Checkbox name="enc" register={register} errors={errors}>
          Encrypt?
        </Checkbox>

        <Password
          name="pass"
          placeholder="Password"
          register={register}
          errors={errors}
        />

        <Select
          name="exp"
          defaultValue="21600"
          register={register({ required: true })}
          errors={errors}
        />

        <Checkbox name="long" register={register} errors={errors}>
          Harder-toguess ID?
        </Checkbox>

        <Submit value="Save" />
      </form>
    </Layout>
  )
}
