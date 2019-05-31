import React, { Component } from 'react'
import Storage from '../utils/storage'
import moment from 'moment'

export default class KnownLocks extends Component {
  state = {
    locks: {}
  }

  componentDidMount() {
    Storage.on('data', this.onStorage)
    this.setState(Storage.load())
  }

  componentWillUnmount() {
    Storage.removeListener('data', this.onStorage)
  }

  onStorage = data => {
    this.setState({ locks: data })
  }

  render() {
    const { locks } = this.state
    const keys = Object.keys(locks)

    return (
      <div>
        {locks && keys.length > 0 && (
          <div className="knownlocks">
            <span className="clear">
              <a
                className="button is-text is-small"
                onClick={() => Storage.clear()}
              >
                clear
              </a>
            </span>

            <label className="label">Known Locks</label>

            <ul>
              {keys.map(key => {
                const time = locks[key]

                return (
                  <li className="item" key={key}>
                    <span className="key">
                      <a href={`/${key}`}>{key}</a>
                    </span>

                    <span className="time">
                      expires {moment(time).fromNow()}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <style jsx>{`
          .knownlocks {
            margin-top: 50px;
          }
          .clear {
            float: right;
          }
          .item {
            padding: 5px 0px;
            border-bottom: 1px solid #dbdbdb;
          }
          .item:last-child {
            border-bottom: none;
          }
          .key > a {
            font-family: monospace;
            max-width: 215px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
          }
          .time {
            float: right;
          }
        `}</style>
      </div>
    )
  }
}
