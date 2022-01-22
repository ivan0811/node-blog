const express = require('express')
const bodyParser = require('body-parser')
const DBconnect = require('./config/db')
require('dotenv').config({path: './config/.env'})

const app = express()

DBconnect()

app.use(bodyParser())
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const articleRoutes = require('./routes/article')
const commentRoutes = require('./routes/comment')

app.use('/', authRoutes)
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/article', articleRoutes)
app.use('/comment', commentRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
})