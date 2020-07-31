import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: 'Email and Password are required' })

  try {
    const data = await User.create(req.body)
    const token = newToken(data)
    return res.status(201).send({ token })
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: 'Email and Password are required' })

  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) return res.status(401).send({ message: 'user must be real' })

  try {
    const match = await user.checkPassword(req.body.password)
    if (!match) return res.status(401).send({ message: 'password must match' })

    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}

export const protect = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).end()

  const [identity, tokenVal] = token.split(' ')
  if (identity !== 'Bearer') return res.status(401).end()

  try {
    const payload = await verifyToken(tokenVal)
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec()
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).end()
  }
}
