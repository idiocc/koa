const _Koa = require('./depack')

class Koa extends _Koa {
  /**
   * Initialize a new `Application`.
   */
  constructor() {
    super()

    /** When true proxy header fields will be trusted. Default `false`. */
    this.proxy = false
    /** Don't print errors to stdout. Default `false`. */
    this.silent = false
    this.middleware = []
    this.subdomainOffset = 2
    this.env = process.env.NODE_ENV || 'development'

    /**
     * The array with keys for signing secure cookies, or the Keygrip instance.
     * @type {Array<string>|Keygrip}
     * @see https://github.com/idiocc/cookies#class-keygrip
     */
    this.keys = undefined
  }
  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   * @return {http.Server}
   */
  listen(...args) {
    return super.listen(...args)
  }
  /**
   * Return JSON representation.
   * @returns {{ subdomainOffset?: number, proxy?: boolean, env: string }}
   */
  toJSON() {
    return super.toJSON()
  }
  /**
   * Inspect implementation.
   */
  inspect() {
    return this.toJSON()
  }
  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Middleware} fn
   */
  use(fn) {
    return super.use(fn)
  }
  /**
   * Return a request handler callback
   * for node's native http server.
   * @returns {function(!http.IncomingMessage, !http.ServerResponse): !Promise}
   */
  callback() {
    return super.callback()
  }
}

module.exports = Koa

/**
 * @typedef {import('@typedefs/goa').Keygrip} Keygrip
 * @typedef {import('@typedefs/goa').Middleware} Middleware
 * @typedef {import('@typedefs/goa').Application} Application
 * @typedef {import('@typedefs/goa').Context} Context
 * @typedef {import('@typedefs/goa').Request} Request
 * @typedef {import('@typedefs/goa').Response} Response
 */