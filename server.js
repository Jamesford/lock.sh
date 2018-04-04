const Koa = require('koa')
const next = require('next')
const koaBody = require('koa-body')
const router = require('koa-router')()
const Database = require('./db')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = new Koa()
const db = new Database()

app.prepare()
.then(() => {
  server.use(koaBody({
    jsonLimit: '500kb'
  }))

  server.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  router.post('/api/create', async ctx => {
    const { data, expiry } = ctx.request.body
    const id = await db.create(data, expiry)
    ctx.body = {
      ok: true,
      id: id
    }
  })

  router.get('/api/read/:id', async ctx => {
    const data = await db.read(ctx.params.id)
    ctx.body = {
      ok: !!data,
      data: data
    }
  })

  router.get('/about', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  router.get('/:id', async ctx => {
    const enc = await db.read(ctx.params.id)
    if (!enc) ctx.redirect('/')
    await app.render(ctx.req, ctx.res, '/decrypt', Object.assign(ctx.params, ctx.query, { enc: enc }))
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())
  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
