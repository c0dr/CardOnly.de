/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */


/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
  // Home
  {
    path: '/contact',
    name: 'home.index',
    component: require('pages/home/index/index.vue'),
  },

  // Account
  {
    path: '/',
    name: 'cards.index',
    component: require('pages/cards/index/index.vue'),
  },
  {
    path: '/',
    redirect: '/',
  },
  {
    path: '/*',
    redirect: '/',
  },
];
