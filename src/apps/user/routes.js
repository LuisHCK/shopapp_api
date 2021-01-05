import { Router } from 'express'
import { create } from './controllers'

const router = Router()

router.post('/', (req, res, next) => create({ req, res, next }))

export default router