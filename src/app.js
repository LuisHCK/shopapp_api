import dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV === 'test') {
    const testPath = path.resolve(process.cwd(), '.env.test')
    dotenv.config({ path: testPath })
} else {
    dotenv.config()
}

import express from 'express'
import bodyParser from 'body-parser'
import connectDb from './database'
import { apiV1 } from './router'

const app = express()

app.use(bodyParser.json())

// Open mongo connection
connectDb()

// Routes
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

// API
app.use('/api/v1', apiV1)

export default app
