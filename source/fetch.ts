import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import axios, { AxiosResponse } from 'axios'
import 'dotenv/config'
var KEYS: Array<string> = JSON.parse(process.env.KEY as string)
var PARAM = process.env.PARAM
var key = 0
async function fetch(date: Date, lastVideoId: string | undefined) {
    try {
        var res = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&publishedAfter=${date.toISOString()}&q=${PARAM}&key=${
                KEYS[key]
            }`
        )
    } catch (e) {
        console.log(e)
        if (key < KEYS.length - 1) key += 1
        else
            console.log('All API key limits are exhausted, please add new keys')
        return undefined
    }
    var items: Array<{
        snippet: {
            description: string
            title: string
            publishTime: string
        }
        id: { videoId: string }
    }> = res.data.items

    for (let i = 0; i < items.length; i++) {
        let e = items.at(i)
        if (e && lastVideoId == e.id.videoId) break
        if (e)
            await prisma.video.create({
                data: {
                    description: e.snippet.description,
                    publish_time: new Date(e.snippet.publishTime),
                    title: e.snippet.title,
                    videoId: e.id.videoId,
                },
            })
    }
    return items.at(0)?.id.videoId
}
export = fetch
