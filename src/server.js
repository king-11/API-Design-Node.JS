import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
<<<<<<< HEAD
=======
import { connect } from './utils/db'
<<<<<<< HEAD
=======
import { signup, signin, protect } from './utils/auth'

import userRouter from './resources/user/user.router'
>>>>>>> ada13d9... paths protected
import itemRouter from './resources/item/item.router'
>>>>>>> 005beab... exercise 2 make routes using router done

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
<<<<<<< HEAD
=======
app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
>>>>>>> ada13d9... paths protected
app.use('/api/item', itemRouter)

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
