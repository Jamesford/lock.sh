import React, { Component } from 'react'
import Layout from '../components/Layout'
import CryptoJS from 'crypto-js'
import api from '../utils/api'

export default class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: '',
      pass: '',
      res: {},
      loading: false
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
    const { text, pass } = this.state

    this.setState({ loading: true })

    const cipher = CryptoJS.AES.encrypt(text, pass).toString()

    const res = await api.create(cipher)
    this.setState({ res: res, text: '', pass: '', loading: false })
  }

  render () {
    const { text, pass, res, loading } = this.state

    return (
      <Layout>
        <main>
          { res.ok &&
            <div className='notification is-info'>
              <button className='delete' onClick={this.onClear}></button>
              <p><strong>Secure lock created</strong></p>
              <p><a href={`/${res.id}`}>https://lock.sh/{res.id}</a></p>
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

          <div className='field'>
            <label className='label'>Encryption Password</label>
            <div className='control'>
              <input className='input' type='password' name='pass' value={pass} onChange={this.onInput} />
            </div>
          </div>

          <div className='field' style={{ display: 'flex' }}>
            <button className={`button is-info ${loading ? 'is-loading' : ''}`} style={{ flexGrow: '1' }} onClick={this.onSave} disabled={!text || !pass}>Encrypt & Save</button>
          </div>

          <div className='info'>
            Locks automatically expire after 24 hours
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
