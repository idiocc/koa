import aqt from '@rqt/aqt'
import Goa from '../'

const goa = new Goa()
goa.use(async (ctx, next) => {
  ctx.body = 'Hello World'
  ctx.status = 201
  ctx.message = 'example'
  await next()
})
goa.listen(3000, async function() {
  const url = `http://localhost:3000`
  console.log(url)
  const res = await aqt(`http://localhost:3000`)
  console.log(res)
  this.close()
})