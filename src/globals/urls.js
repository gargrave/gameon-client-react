import env from './env'

const DEV_API_ROOT_URL = 'http://localhost:8000'
const STAGING_API_ROOT_URL = 'https://gameon-app-dev.herokuapp.com'
const PROD_API_ROOT_URL = 'https://gameon-app.herokuapp.com'

let apiRoot
let restApiRoot;

(function setUrls () {
  if (env.isProd()) {
    apiRoot = PROD_API_ROOT_URL
    restApiRoot = `${apiRoot}/api/v1`
  } else if (env.isStaging()) {
    apiRoot = STAGING_API_ROOT_URL
    restApiRoot = `${apiRoot}/api/v1`
  } else {
    apiRoot = DEV_API_ROOT_URL
    restApiRoot = `${apiRoot}/api/v1`
  }
})()

// URLs for AJAX calls to the API
export let apiUrls = {
  login: `${apiRoot}/rest-auth/login/`,
  logout: `${apiRoot}/rest-auth/logout/`,
  register: `${apiRoot}/rest-auth/registration/`,
  users: `${apiRoot}/rest-auth/user/`,
  profiles: `${apiRoot}/rest-auth/user/profile/`,
  games: `${restApiRoot}/games/`,
  platforms: `${restApiRoot}/platforms/`
}

// URLs for local routing
export let localUrls = {
  // auth URLs
  profile: '/account/profile',
  accountCreate: '/account/new',
  login: '/account/login',
  // Games URLs
  gamesList: '/games',
  gameCreate: '/games/new',
  gameDetail: '/games/:id',
  // Platforms URLs
  platformsList: '/platforms',
  platformCreate: '/platforms/new',
  platformDetail: '/platforms/:id'
}
