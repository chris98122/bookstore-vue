/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/register',
    name: 'Register',
    view: 'Register'
  },
  {
    path: '/browse',
    name: 'Browse',
    view: 'Browse'
  },
  {
    path: '/orders',
    name: 'Order',
    view: 'Orders'
  },
  {
    path: '/statistics',
    name: 'Statistics',
    view: 'Statistics'
  },
  {
    path: '/cart',
    name: 'Cart',
    view: 'Cart'
  },
  {
    path: '/book_detail',
    name: 'Detail',
    view: 'BookDetail'
  }
]
