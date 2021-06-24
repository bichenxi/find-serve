const { Router } = require('express')
const router = Router()
const add = require('./routers/register')

router.use('/', () => {
    router.use('/add',add)
})

module.exports = router