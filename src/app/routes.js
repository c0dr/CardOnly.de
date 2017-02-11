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
    path: '/home',
    name: 'home.index',
    component: require('pages/home/index/index.vue'),


  },

  // Account
  {
    path: '/cards',
    name: 'cards.index',
    component: require('pages/cards/index/index.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/*',
    redirect: '/home',
  },
];
