import React, { Component } from 'react'

const normal = 'button is-expanded'
const selected = 'button is-expanded is-link'

export default ({ name, value, onChange }) => (
  <div className="field">
    <label className="label">Use Friendly ID</label>

    <div className="control">
      <div className="buttons has-addons">
        <button
          className={value ? selected : normal}
          onClick={onChange}
          name={name}
          value={true}
        >
          Yes
        </button>

        <button
          className={!value ? selected : normal}
          onClick={onChange}
          name={name}
          value={false}
        >
          No
        </button>
      </div>
    </div>
  </div>
)
