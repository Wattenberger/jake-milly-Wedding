exports.WEBPACK_HOST     = process.env.HOST               || "jakemilly.herokuapp.com"
exports.WEBPACK_PORT     = parseInt(process.env.PORT)     || 5000
exports.STATIC_HOST      = process.env.STATIC_HOST        || exports.WEBPACK_HOST
exports.AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
