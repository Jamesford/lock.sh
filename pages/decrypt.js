import React, { Component } from 'react'
import Layout from '../components/Layout'
import CryptoJS from 'crypto-js'
import debounce from 'lodash/debounce'


export default class Decrypt extends Component {
  static getInitialProps ({ query: { id, enc, p } }) {
    return { id, enc, p }
  }

  constructor (props) {
    super(props)

    this.state = {
      text: props.enc,
      pass: props.p || '',
      wait: !!props.p
    }
  }

  // Don't attempt decryption on server
  // componentDidMount is called only on client-side
  componentDidMount () {
    if (this.props.p) this.attemptDecrypt()
  }

  attemptDecrypt = debounce(() => {
    const { enc } = this.props
    const { pass } = this.state

    // Prevents "Error: Malformed UTF-8 data" breaking interactivity
    // When typing password
    try {
      const deciphered = CryptoJS.AES.decrypt(enc, pass)
      const decipheredText = deciphered.toString(CryptoJS.enc.Utf8)
      this.setState({ text: decipheredText || enc, wait: false })
    } catch (err) {
      this.setState({ text: enc, wait: false })
    }
  }, 500)

  onPassword = (evt) => {
    const { value } = evt.target
    this.setState({ pass: value, wait: true })
    this.attemptDecrypt()
  }

  render () {
    const { text, pass, wait } = this.state

    return (
      <Layout>
        <main>
          <div className='field'>
            <label className='label'>Stashed Data</label>

            <div className='control'>
              <textarea className='textarea' name='text' rows='10' value={text} readOnly />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Decryption Password</label>
            <div className={`control ${wait ? 'is-loading' : ''}`}>
              <input className='input' type='password' name='pass' value={pass} onChange={this.onPassword} />
            </div>
          </div>

          <div className='info'>
            <a href='/'>Create new Stash</a>
          </div>
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
