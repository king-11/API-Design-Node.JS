import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const router = express.Router()

router.get('/me', (req, res) => {
  res.send({ me: 'Nebuchadnezzar' })
})
app.use('/api', router)

let i = 0
// a middleware
const log = (req, res, next) => {
  console.log(i++)
  next()
}

app.get('/', [log, log], (req, res) => {
  res.send({ hey: 'man' })
})

app.post('/', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server on port 3000')
  })
}
