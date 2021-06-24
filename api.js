const { Router } = require('express')
const router = Router()
const add = require('./routers/register')

router.use('/', () => {
    console.log(1)
    router.use('/add',add)
})

module.exports = router