/* alanode example/ */
import koa from '../src'

(async () => {
  const res = await koa({
    text: 'example',
  })
  console.log(res)
})()