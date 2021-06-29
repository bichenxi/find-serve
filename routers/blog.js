const { Router } = require('express')
const router = Router()
const sqlAsycn = require('../utils/promisify-sql')
const multipart = require('connect-multiparty')
const multipartyMiddleware = multipart()

// update view data

function handlerView(idList) {
    
    let str = 'update blog_table set attention = attention + 1  where '
    idList.forEach((i, index) => {
        str += ` id = ${i}`
        if (idList.length == index + 1) return
        str += ' or'
    })

    sqlAsycn.query({ sql: str })
}

router.get('/', async (req, res) => {
    const { page, size  = 10, searchValue = false} = req.query

    // if select search fetch
    if (searchValue) {
        const [{ 'count(*)': count }] = await sqlAsycn.query({ sql: `select count(*) from blog_table where account = ${searchValue} or content = ${searchValue}` })
        
        const result = await sqlAsycn.query({ sql: `select * from blog_table where account = ${searchValue} or content = '${searchValue}'` })

        const lastPage = Math.ceil(count / size)
        res.send({data: result, count, lastPage, success: true})
        const idList = result.map((i) => i.id)
        handlerView(idList)
        return
    }
    
    const [{ 'count(*)': count }] = await sqlAsycn.query({ sql: 'select count(*) from blog_table' })
    const result = await sqlAsycn.query({ sql: `select * from blog_table limit ${page * size}, ${(page + 1) * size}` })
    const lastPage = Math.ceil(count / size)
    res.send({data: result, count, lastPage, success: true})
    const idList = result.map((i) => i.id)
    handlerView(idList)
})

router.get('/star', async (req, res) => {
    const { id } = req.query

    await sqlAsycn.query({ sql: `update blog_table set star = star + 1 where id = ${id}` })

    res.send({ success: true })
})

router.post('/add', multipartyMiddleware, async (req, res) => {
    const { account, content } = req.body

    if (!content || !account) {
        res.statusCode = 400
        res.send({ message: 'content not null', success: false })
        return
    }
    await sqlAsycn.query({ sql: 'insert into blog_table set ?', value: req.body })
    res.send({ message: 'set blog success done', success: true })
})

module.exports = router