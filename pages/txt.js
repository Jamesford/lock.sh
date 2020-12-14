import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { encrypt } from '../lib/crypto'
import Layout from '../components/Layout'
import Back from '../components/Back'
import TextArea from '../components/Form/TextArea'
import Password from '../components/Form/Password'
import Select from '../components/Form/Select'
import Checkbox from '../components/Form/Checkbox'
import Submit from '../components/Form/Submit'

export default function TXT({ back }) {
  const router = useRouter()
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = ({ txt, pass, exp, long }) => {
    const payload = {
      exp,
      long,
      data: btoa(encrypt(txt, pass)),
      type: 'txt',
      enc: true,
    }

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

      <h1 className="text-2xl">TX::ENC::TXT</h1>

      <form className="w-64 my-4" onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          name="txt"
          placeholder="TXT"
          register={register({ required: true })}
          errors={errors}
        />

        <Password
          name="pass"
          placeholder="Password"
          register={register({ required: true })}
          errors={errors}
        />

        <Select
          name="exp"
          defaultValue="21600"
          register={register({ required: true })}
          errors={errors}
        />

        <Checkbox name="long" register={register} errors={errors}>
          Harder-to-guess ID?
        </Checkbox>

        <Submit value="Save" />
      </form>
    </Layout>
  )
}
