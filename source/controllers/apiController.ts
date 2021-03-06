import { Request, Response, NextFunction, application } from 'express'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
var max_res: number = +(process.env.MAX_ENTRIES_PER_PAGE as string)
const prisma = new PrismaClient()

// Search function implements the search functionality in the retrived video details
const search = async (req: Request, res: Response, next: NextFunction) => {
    var page: number = req.params.page ? +req.params.page : 1 //if page number exist, then it is used otherwise it is 1
    var q: string = req.params.q
    var query = await prisma.video.findMany({
        skip: (page - 1) * max_res,
        take: max_res,
        where: {
            OR: {
                title: {
                    search: q.split(' ').join(' | '),
                },
                description: {
                    search: q.split(' ').join(' | '),
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
    res.send(query)
}

// getAll functions returns all the videos stored in the database
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    var page: number = req.params.page ? +req.params.page : 1 //if page number exist, then it is used otherwise it is 1
    var query = await prisma.video.findMany({
        skip: (page - 1) * max_res,
        take: max_res,
        orderBy: [
            {
                publish_time: 'desc',
            },
        ],
    })
    res.status(200)
    res.send(query)
}

export default { search, getAll }
