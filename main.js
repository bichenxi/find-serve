const app = require('./utils/app')
const path = require('path')
const express = require('express')

const register = require('./routers/register')
app.use('/api/register', register)

const loginView = require('./routers/login')
app.use('/api/login', loginView)

const comment = require('./routers/comment')
app.use('/api/comment', comment)

const sgin = require('./routers/sign')
app.use('/api/sign', sgin)

const blog = require('./routers/blog')
app.use('/api/blog', blog)
// public
app.use(express.static(path.join(__dirname, 'dist')))