import express from 'express'
import controller from '../controllers/apiController'
const router = express.Router()

router.get('/search/:q/:page', controller.search)
router.get('/get/:page', controller.getAll)
export = router
