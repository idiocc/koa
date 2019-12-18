const _Koa = require('./koa')

/**
 * An application constructor.
 * @type {function(new: Application)}
 */
const Koa = _Koa

module.exports = Koa

/* typework */
/**
 * @typedef {import('../types/vendor/cookies').Keygrip} Keygrip
 * @typedef {import('../types/vendor/cookies').Cookies} Cookies
 * @typedef {import('../types/vendor/accepts').Accepts} Accepts
 * @typedef {import('../types/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/typedefs/application').Application} Application
 * @typedef {import('../types/typedefs/context').Context} Context
 * @typedef {import('../types/typedefs/request').Request} Request
 * @typedef {import('../types/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/typedefs/response').Response} Response
 * @typedef {import('../types/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */