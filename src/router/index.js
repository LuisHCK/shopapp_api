import { Router } from 'express'
import UserRouter from '../apps/user/routes'
import AuthRouter from '../apps/auth/routes'

export const apiV1 = Router()

// Define API V1 modules
apiV1.use('/users', UserRouter)

apiV1.use('/auth', AuthRouter)
