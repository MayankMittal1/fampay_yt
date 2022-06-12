import { Request, Response, NextFunction, application } from 'express'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
var max_res: number = +(process.env.MAX_ENTRIES_PER_PAGE as string)
const prisma = new PrismaClient()

const search = async (req: Request, res: Response, next: NextFunction) => {
    var page: number = +req.params.page
    var query = await prisma.video.findMany({
        where: {
            OR: {
                title: {
                    contains: req.params.q,
                },
                description: {
                    contains: req.params.q,
                },
            },
        },
        orderBy: [
            {
                publish_time: 'desc',
            },
        ],
    })
    res.status(200)
    res.send(
        query.slice(
            (page - 1) * max_res,
            page * max_res >= query.length ? query.length : page * max_res
        )
    )
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    var page: number = +req.params.page
    var query = await prisma.video.findMany({
        orderBy: [
            {
                publish_time: 'desc',
            },
        ],
    })
    res.status(200)
    res.send(
        query.slice(
            (page - 1) * max_res,
            page * max_res >= query.length ? query.length : page * max_res
        )
    )
}

export default { search, getAll }
