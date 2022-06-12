import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import apiRouter from './routes/api'
import fetch from './fetch'
const router: Express = express()

router.use(morgan('dev'))
router.use(bodyParser.json())

router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*')
    // set the CORS headers
    res.header(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With,Content-Type,Accept, Authorization'
    )
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST')
        return res.status(200).json({})
    }
    next()
})

/** Routes */
router.use('/api', apiRouter)

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found')
    return res.status(404).json({
        message: error.message,
    })
})

/**
 Fetch API
 **/
var interval: number = +(process.env.FETCH_INTERVAL as string)
var lastVideoId: string | undefined = undefined
setInterval(async () => {
    var date = new Date()
    date.setMinutes(date.getMinutes() - 10)
    try {
        lastVideoId = await fetch(date, lastVideoId)
    } catch (e) {
        console.log(
            'The DB Has not been populated yet please sun the migrate command to start fetching'
        )
    }
}, interval * 1000)

/** Server */
const httpServer = http.createServer(router)
const PORT: any = process.env.PORT ?? 6060
httpServer.listen(PORT, () =>
    console.log(`The server is running on port ${PORT}`)
)
