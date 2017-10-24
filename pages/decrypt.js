import React, { Component } from 'react'
import Layout from '../components/Layout'
import CryptoJS from 'crypto-js'
import debounce from 'lodash/debounce'
import ClipboardButton from 'react-clipboard.js'

export default class Decrypt extends Component {
  static getInitialProps ({ query: { id, enc, p } }) {
    return { id, enc, p }
  }

  constructor (props) {
    super(props)

    this.state = {
      text: props.enc,
      pass: props.p || '',
      wait: !!props.p,
      copy: false
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

  getText = () => this.state.text

  onCopy = () => {
    this.setState({ copy: true })
    setTimeout(() => this.setState({ copy: false}), 500)
  }

  render () {
    const { text, pass, wait, copy } = this.state

    let copyStyle = {
      width: '60px',
      marginTop: '-1px',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }

    const successStyle = {
      borderColor: '#3273dc'
    }

    if (copy) {
      copyStyle = Object.assign(copyStyle, successStyle, {
        color: '#3273dc'
      })
    }

    return (
      <Layout>
        <main>
          <div className='field'>
            <label className='label'>Locked Data</label>

            <div className='control'>
              <textarea className='textarea' style={copy ? successStyle : {}} name='text' rows='10' value={text} readOnly />

              <ClipboardButton className='button is-small pull-right' style={copyStyle} option-text={this.getText} onSuccess={this.onCopy}>
                <span>{copy ? 'Copied' : 'Copy'}</span>
              </ClipboardButton>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Decryption Password</label>

            <div className={`control ${wait ? 'is-loading' : ''}`}>
              <input className='input' type='password' name='pass' value={pass} onChange={this.onPassword} />
            </div>
          </div>

          <div className='info'>
            <a href='/'>Create new Lock</a>
          </div>
        </main>

        <style jsx>{`
          .info {
            margin-top: 50px;
            text-align: center;
          }
          .textarea {
            border-bottom-right-radius: 0;
          }
          .textarea:hover {
            z-index: 1;
          }
          .button:hover {
            z-index: 1;
          }
        `}</style>
      </Layout>
    )
  }
}
