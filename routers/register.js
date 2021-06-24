const { Router } = require('express')
const router = Router()
const sqlAsycn = require('../utils/promisify-sql')
const multipart = require('connect-multiparty')
const multipartyMiddleware = multipart()

router.post('/' , multipartyMiddleware, async (req, res) => {
    const sqlResult = await sqlAsycn.query({sql: `select * from user where account = ${req.body.account}`})
    
    // if register account
    if (sqlResult.length) {
        res.statusCode = 401
        res.send({message: '此账号以及注册'})
    }
    const sql = 'insert into user set ?'
    const data = await sqlAsycn.query({sql, value: req.body})
    if (data.insertId) {
        res.statusCode = 200
        res.send({
            id: data.insertId,
            message: '注册成功!',
            success: true
        })
    }
})

module.exports = router