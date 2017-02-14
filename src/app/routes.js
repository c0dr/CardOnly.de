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
  // Legal
  {
    path: '/legal',
    name: 'legal.index',
    component: require('pages/legal/index/index.vue'),
  },
   // Recommended cards
  {
    path: '/recommended',
    name: 'cards.recommended',
    component: require('pages/cards/recommended/index.vue'),
  },
  // Index
  {
    path: '/',
    name: 'cards.index',
    component: require('pages/cards/index/index.vue'),
  },
  {
    path: '/*',
    redirect: '/',
  },
];
