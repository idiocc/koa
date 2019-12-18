import aqt from '@rqt/aqt'
import Goa from '../compile'

const goa = new Goa()
goa.use(async (ctx, next) => {
  ctx.body = 'Hello World'
  ctx.status = 201
  ctx.message = 'example'
  await next()
})
goa.listen(3000, async function() {
  const url = `http://localhost:3000`
  console.log(url, '\n')
  const res = await aqt(url)
  console.log(res)
  this.close()
})