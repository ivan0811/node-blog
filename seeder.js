const fs = require('fs')
require('dotenv').config({ path: './config/.env' })
const DBConnect = require('./config/db')
DBConnect()

const User = require('./models/User')
const Category = require('./models/Category')
const Article = require('./models/Article')
const Comment = require('./models/Comment')

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`)
)

const categories = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/categories.json`)
)

const articles = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/articles.json`)
)

const comments = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/comments.json`)
)

const importData = async () => {
    try {
        await User.create(users)
        await Category.create(categories)
        await Article.create(articles)
        await Comment.create(comments)
    } catch (err) {
        console.error(err)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Category.deleteMany()
        await Article.deleteMany()
        await Comment.deleteMany()
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}




