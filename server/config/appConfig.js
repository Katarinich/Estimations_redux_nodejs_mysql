const DB_TYPES = require('./constants').DB_TYPES

function defaultExport() {}

defaultExport.DB_TYPE = process.env.DB_TYPE || DB_TYPES.POSTGRES
defaultExport.ENV = process.env.NODE_ENV || 'development'

module.exports = defaultExport
