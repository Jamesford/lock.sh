import React, { Component } from 'react'
import Head from '../components/head'
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

  onToggle = (evt) => {
    this.setState({ open: evt.target.checked })
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
      <div className='wrapper'>
        <Head />

        <h1 className='title is-2'>Stash Cafe</h1>

        <main>
          { res.ok &&
            <div className='notification is-primary'>
              {/* <button className='delete'></button> */}
              <span><a href='#'>https://stash.cafe/{res.id}</a></span>
            </div>
          }

          { res.ok === false &&
            <div className='notification is-danger'>
              {/* <button className='delete'></button> */}
              <span>Unable to stash your stuff</span>
            </div>
          }

          <div className='field'>
            <label className='label'>Data to Stash</label>

            <div className='control'>
              <textarea className='textarea' name='text' value={text} onChange={this.onInput} />
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
                <button className='button is-primary' onClick={this.onSave}>Save</button>
              </div>
            </div>
          </div>
        </main>

        <style jsx>{`
          .wrapper {
            margin: 75px auto;
            width: 400px;
          }
        `}</style>
      </div>
    )
  }
}
