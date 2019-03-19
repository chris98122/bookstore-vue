/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
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
  },
  {
    path: '/manage_user',
    name: 'ManageUser',
    view: 'ManageUser'
  },
  {
    path: '/on_shelf',
    name: 'OnShelf',
    view: 'OnShelf'
  },
  {
    path: '/manage_book',
    name: 'ManageBook',
    view: 'ManageBook'
  }
]
