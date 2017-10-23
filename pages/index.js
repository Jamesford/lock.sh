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
      res: {}
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

    const cipher = CryptoJS.AES.encrypt(text, pass).toString()

    const res = await api.create(cipher)
    this.setState({ res: res, text: '', pass: '' })
  }

  render () {
    const { text, pass, res } = this.state

    return (
      <Layout>
        <main>
          { res.ok &&
            <div className='notification is-info'>
              <button className='delete' onClick={this.onClear}></button>
              <p><strong>Secret stash created</strong></p>
              <p><a href={`/${res.id}`}>https://stash.cafe/{res.id}</a></p>
            </div>
          }

          { res.ok === false &&
            <div className='notification is-danger'>
              <button className='delete' onClick={this.onClear}></button>
              <span>Unable to stash your stuff</span>
            </div>
          }

          <div className='field'>
            <label className='label'>Data to Stash</label>

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

          <div className='field level'>
            <div className='level-left' />

            <div className='level-right'>
              <div className='control'>
                <button className='button is-info' onClick={this.onSave} disabled={!text || !pass}>Encrypt & Save</button>
              </div>
            </div>
          </div>

          <div className='info'>
            Stash automatically expires after 24 hours
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
