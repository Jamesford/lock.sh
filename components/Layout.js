import React from 'react'
import Head from './head'

export default ({ children, title = 'Stash Cafe' }) => (
  <div className='wrapper'>
    <Head title={title} />

    <div className='page'>
      <img className='site-title' src='/static/logo.svg' />

      { children }
    </div>

    <footer style={{ paddingTop: '50px' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <code><i className='fa fa-btc' /> 1P7yFQAC3EiqpdB7K9s6bKPvXEP1LPoQnY</code>
      </div>
    </footer>

    <style jsx>{`
      .wrapper {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }
      .page {
        margin: 0 auto;
        width: 400px;
        padding-top: 30px;
        flex-grow: 1;
      }
      code {
        color: #4a4a4a !important;
        font-weight: 700;
      }
    `}</style>
  </div>
)
