import React, { Component } from 'react'

export default class Password extends Component {
  render () {
    const { name, pass, onChange } = this.props

    let score = 0
    let color = 'is-danger'
    if (process.browser && window.zxcvbn) {
      let result = window.zxcvbn(pass)
      score = 20
      switch (result.score) {
        case 1:
          score = 40
          break
        case 2:
          score = 60
          color = 'is-warning'
          break
        case 3:
          score = 80
          color = 'is-primary'
          break
        case 4:
          score = 100
          color = 'is-primary'
          break
      }
    }

    if (pass === '') score = 0

    return (
      <div className='field'>
        <label className='label'>Encryption Password</label>

        <div className='control'>
          <input className='input' type='password' name={name} value={pass} onChange={onChange} />

          <progress className={`progress ${color}`} style={{height: '0.25rem', marginTop: '8px'}} value={score} max='100'>15%</progress>
        </div>
      </div>
    )
  }
}
