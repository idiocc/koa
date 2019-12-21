const { _Goa, _Context } = require('./koa')

/**
 * An application constructor.
 * @type {new (options?: ApplicationOptions) => Application)}
 */
const $Goa = _Goa

/**
 * The default context constructor.
 * @type {new () => Context}
 */
const $Context = _Context

module.exports = $Goa
module.exports.Context = $Context

/* typework */
/**
 * @typedef {import('../types/vendor/cookies').Keygrip} Keygrip
 * @typedef {import('../types/vendor/cookies').Cookies} Cookies
 * @typedef {import('../types/vendor/accepts').Accepts} Accepts
 * @typedef {import('../types/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/typedefs/application').Application} Application
 * @typedef {import('../types/typedefs/application').ApplicationOptions} ApplicationOptions
 * @typedef {import('../types/typedefs/context').Context} Context
 * @typedef {import('../types/typedefs/request').Request} Request
 * @typedef {import('../types/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/typedefs/response').Response} Response
 * @typedef {import('../types/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */