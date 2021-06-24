const { Router } = require('express')
const router = Router()
const sqlAsycn = require('../utils/promisify-sql')
const multipart = require('connect-multiparty')
const multipartyMiddleware = multipart()

router.get('/', async (req,res) => {
    const { account } = req.query
    const result = await sqlAsycn.query({ sql: `select * from comment where account = '${account}'` })
    res.send({ success: true, data: result })
    
})

router.post('/add', multipartyMiddleware, async (req,res) => {
    const { account } = req.body
    const searchResult = await sqlAsycn.query({ sql: `select * from user where account = '${account}'` })
    if (!searchResult.length) {
        res.statusCode = 400
        res.send({ success: false, message: '没有这个账号!' })
        return
    }

    const result = await sqlAsycn.query({ sql: 'insert into comment set ?', value: req.body })
    res.send({ success: true, message: '发布成功', id: result.insertId })
})

module.exports = router