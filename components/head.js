import React from 'react'
import Head from 'next/head'

export default ({ title }) => {
  const titleString = title ?
    `${title} | stash.cafe` :
    `stash.cafe`

  return(
    <Head>
      <title>{ titleString }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='/static/favicon.ico' type='image/x-icon' rel='icon' />
      <link href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.0/css/bulma.min.css' rel='stylesheet'  />
      <style>{`
      `}</style>
    </Head>
  )
}
