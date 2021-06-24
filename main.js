const app = require('./utils/app')
const path = require('path')
const express = require('express')

const register = require('./routers/register')
app.use('/register', register)

const loginView = require('./routers/login')
app.use('/login', loginView)

const comment = require('./routers/comment')
app.use('/comment', comment)

const sgin = require('./routers/sign')
app.use('/sign', sgin)

// public
app.use(express.static(path.join(__dirname, 'dist')))