import React from 'react'
import { ValidTimes } from '../../utils/times'

export default ({ name, expiry, onChange }) => (
  <div className='field'>
    <label className='label'>Expire After</label>
    <div className='control'>
      <div className='select is-fullwidth'>
        <select name={name} value={expiry} onChange={onChange}>
          { ValidTimes.map(t => <option key={t.key} value={t.val}>{t.key}</option>) }
        </select>
      </div>
    </div>
  </div>
)
