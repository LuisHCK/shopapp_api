import { Router } from 'express'
import { login, signUp } from './controllers'

const router = Router()

router.post('/login', (req, res, next) => login({ req, res, next }))

router.post('/sign-up', (req, res, next) => signUp({ req, res, next }))

export default router
