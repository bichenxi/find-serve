const { Router } = require('express')
const router = Router()
const sqlAsycn = require('../utils/promisify-sql')
const multipart = require('connect-multiparty')
const multipartyMiddleware = multipart()

router.post('/', multipartyMiddleware, async (req,res) => {
    const { account, password } = req.body
    const sql = `select * from user where account = ${account} and password = '${password}'`
    const result = await sqlAsycn.query({sql})
    if (!result.length) {
        res.statusCode = 400
        res.send({
            success: false,
            message: '账号或者密码错误'
        })
        return
    }
    res.statusCode = 200
    res.send({data: result[0], success: true})
})

module.exports = router