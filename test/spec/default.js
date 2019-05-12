import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import koa from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof koa, 'function')
  },
  async 'calls package without error'() {
    await koa()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await koa({
      text,
    })
    ok(res, text)
  },
}

export default T