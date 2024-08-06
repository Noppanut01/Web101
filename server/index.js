const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()
const port = 8000

app.use(bodyparser.json())
app.use(cors())

let conn = null

const initMysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tutorials',
        port: 8889
    })
    console.log('connect to Database')
}


// path = POST / user
app.get('/test', (req, res) => {
    res.send('Hello world')
})

app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0])
})

app.post('/users', async (req, res) => {
    try {
        let user = req.body
        const results = await conn.query('INSERT INTO users SET ?', user)
        console.log('results: ', results)
        res.json({
            message: 'insert ok',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: 'something wrong',
        })
    }

})

app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query(
            'SELECT * FROM users WHERE id = ?', id
        )
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'Not found' }
        }
        res.json(results[0][0])
    } catch (error) {
        console.error('error message', error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: 'something went wrong',
            errorMessage: error.message
        })
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updateUser = req.body
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id])
        console.log('results: ', results)
        res.json({
            message: 'update ok',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: 'something wrong'
        })
    }

})

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE from users WHERE id = ?', id)
        console.log('results: ', results)
        res.json({
            message: 'delete ok',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: 'something wrong',
        })
    }

})

app.listen(port, async (req, res) => {
    await initMysql()
    console.log(`Server running at : ${port}`)
    console.log('Everthing is ok')
})