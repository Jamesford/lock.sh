import React, { Component } from 'react'
import Head from '../components/head'

export default class Help extends Component {
  render () {
    return (
      <div className='wrapper'>
        <Head />

        <h1 className='title is-2'>Stash Cafe</h1>

        <main>
          Help
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
