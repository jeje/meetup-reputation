'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ORGANIZATIONS_DB: '"/orbitdb/QmYSpNa8o87CJyBhYnwADq5qvgg5i7dn6mGUCVx9dXavyT/organizations.docs"',
  ORGANIZATIONS_COUNTER: '"/orbitdb/QmbfxgzpR3MCDZ3naYkFFnpMm74Z3MCnMBYFc4w51pz49H/organizations.counter"'
})
