const { Router } = require('express')
const router = Router()
const sqlAsycn = require('../utils/promisify-sql')

router.get('/', async (req,res) => {
    const { account } = req.query
    const result = await sqlAsycn.query({sql: `select * from sign_tab where account = ${account} and DATE_FORMAT(time, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )`})
    if (!result.length) {
        res.send({message: '暂无数据', success: true})
        return
    }

    res.send(result)
})

router.get('/add', async (req,res) => {
    const { account } = req.query
    const result = await sqlAsycn.query({ sql: `select * from sign_tab where account = ${account} and time >= curdate()` })
    if (result.length) {
        res.send({ message: '本日已签到', success: false })
        return
    }
    
    const data = await sqlAsycn.query({sql: 'insert into sign_tab set ?', value: { account }})
    if (data.insertId) {
        res.send({ message: '签到成功', success: true})
    }
})

module.exports = router