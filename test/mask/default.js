import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import koa from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await koa({
      text: this.input,
    })
    return res
  },
  context: Context,
})