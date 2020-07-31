import { Router } from 'express'

const router = Router()

const controller = (req, res) => {
  res.set(200)
  res.send({ hey: 'there' })
}

router
  .route('/')
  .get(controller)
  .post(controller)

router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
