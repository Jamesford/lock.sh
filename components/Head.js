import React from 'react'
import Head from 'next/head'

export default ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    {/* <link href='/static/favicon.ico' type='image/x-icon' rel='icon' /> */}
    <link href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.0/css/bulma.min.css' rel='stylesheet'  />
    <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
    <style>{`
      html {
        background: #fafafa;
      }
      .site-title {
        display: block;
        margin: 0 auto 30px;
        width: 320px;
      }
    `}</style>
  </Head>
)
