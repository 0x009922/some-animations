const ctx = require.context('./', true, /^\.\/.+\/index\.js$/);

/**
 * @typedef {{
 * route: import('vue-router').RouteConfig,
 * tile: String,
 * }} AnimationDeclaration
 * @type {AnimationDeclaration[]}
 */
export default ctx.keys().map((val) => ctx(val).default);
