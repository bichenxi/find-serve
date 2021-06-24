const express = require('express')
const bodParser = require('body-parser')

const app = express()

app.listen(4100, () => {
    console.log('start 4100')
})

app.use(bodParser.urlencoded({ extended: false }))
app.use(bodParser.json())

module.exports = app