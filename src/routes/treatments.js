import { Router } from 'express'
import { list } from '../controllers/treatment'

const router = Router()
router.get('/list', list)

export default router