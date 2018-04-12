import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import CryptoJS from 'crypto-js'
import api from '../utils/api'
import ClipboardButton from 'react-clipboard.js'
import Storage from '../utils/storage'
import ExpirySelect from '../components/fields/Expiry'
import Password from '../components/fields/Password'
import { DefaultTime } from '../utils/times'
import NoSSR from 'react-no-ssr'
import KnownLocks from '../components/KnownLocks'

export default class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: '',
      pass: '',
      expiry: DefaultTime,
      res: {},
      loading: false,
      copy: false
    }
  }

  onClear = () => {
    this.setState({ res: {} })
  }

  onInput = (evt) => {
    const { name, value } = evt.target
    this.setState({ [name]: value })
  }

  onSave = async () => {
    const { text, pass, expiry } = this.state

    this.setState({ loading: true })

    const cipher = CryptoJS.AES.encrypt(text, pass).toString()

    const res = await api.create(cipher, expiry)
    if (res && res.id) Storage.put(res.id, expiry)
    this.setState({ res: res, text: '', pass: '', expiry: DefaultTime, loading: false })
  }

  getText = () => `https://lock.sh/${this.state.res.id}`

  onCopy = () => {
    this.setState({ copy: true })
    setTimeout(() => this.setState({ copy: false}), 500)
  }

  render () {
    const { text, pass, expiry, res, loading, copy } = this.state

    let copyStyle = {
      width: '60px',
      position: 'absolute',
      top: '4px',
      right: '5px'
    }

    if (copy) {
      copyStyle = Object.assign(copyStyle, {
        borderColor: '#3273dc',
        color: '#3273dc'
      })
    }

    return (
      <Layout withZxcvbn>
        <main>
          { res.ok &&
            <div className='notification is-link'>
              <button className='delete' onClick={this.onClear}></button>

              <p><strong>Secure lock created</strong></p>

              <div className='control'>
                <input className='input' value={`https://lock.sh/${res.id}`} readOnly />

                <ClipboardButton className='button is-small' style={copyStyle} option-text={this.getText} onSuccess={this.onCopy}>
                  <span>{copy ? 'Copied' : 'Copy'}</span>
                </ClipboardButton>
              </div>
            </div>
          }

          { res.ok === false &&
            <div className='notification is-danger'>
              <button className='delete' onClick={this.onClear}></button>
              <span>Unable to save your lock</span>
            </div>
          }

          <div className='field'>
            <label className='label'>Data to Lock</label>

            <div className='control'>
              <textarea className='textarea' name='text' rows='10' value={text} onChange={this.onInput} />
            </div>
          </div>

          <Password name='pass' pass={pass} onChange={this.onInput} />

          <ExpirySelect name='expiry' expiry={expiry} onChange={this.onInput} />

          <div className='field' style={{ display: 'flex' }}>
            <button className={`button is-link ${loading ? 'is-loading' : ''}`} style={{ flexGrow: '1' }} onClick={this.onSave} disabled={!text || !pass}>Encrypt & Save</button>
          </div>

          <NoSSR>
            <KnownLocks />
          </NoSSR>
        </main>

        <style jsx>{`
          .info {
            margin-top: 50px;
            text-align: center;
          }
        `}</style>
      </Layout>
    )
  }
}
