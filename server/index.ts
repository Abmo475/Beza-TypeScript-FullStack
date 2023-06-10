import express, { Application, Request, Response } from 'express'
import routes from './routes/items'
import dbInit from './db/init'
const cors=require('cors');
dbInit()
const port = 4000
export const get = () => {
    const app: Application = express()
    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get('/', async(req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Server Running at port ${port}` })
    })
    app.use(cors({"Access-Control-Allow-Origin": "http://localhost:3001"}))
    app.use('/api/v1', routes)
   
    return app
}
export const start = () => {
    const app = get()
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`)
    }
}
start()
