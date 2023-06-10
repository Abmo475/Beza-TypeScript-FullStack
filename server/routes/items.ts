import express, { Router, Request, Response} from 'express'
const multer  = require('multer')
import * as itemController from '../controllers/item.controller'
import {UpdateItemsDTO} from '../api/dto/item.dto'
import  readXlsxFile from 'read-excel-file/node'
const upload = multer({ dest: './uploads/'})
const itemsRouter = Router()

itemsRouter.get(':/id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await itemController.getById(id)
    return res.status(200).send(result)
})
itemsRouter.put('/:id', async (req: Request, res: Response) => { // update 
    const id =  req.params.id
    const payload:UpdateItemsDTO = req.body
    const result = await itemController.update(id, payload)
    return res.status(201).send(result)
})
itemsRouter.delete('/delete/:id', async (req: Request, res: Response) => { // delete using id 
    const id = Number(req.params.id)
    const result = await itemController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})
itemsRouter.post('/', async (req: Request, res: Response) => {
    const result = await itemController.create(req.body)// for single record 
    return res.status(200).send(result)
})
interface MulterRequest extends Request { // multer interface 
    file: any;
}
itemsRouter.post('/upload',upload.single('file'), async(req: Request, res: Response): Promise<any> => {
   
    const filename=((req as MulterRequest).file)
    console.log(filename)
    const results = await itemController.getAll() // fetch all record 
   readXlsxFile(filename.path).then(async (rows) => {
       while(rows[0][0]!=='Item No')
       rows.shift() // remove empty cells 
       rows.shift() // remove title cell
       let datapoint:String="";
       for(let data of rows){
          datapoint=String(data[0]+""!=="null"?data[0]:datapoint);
      if(data[2]+""==='null') // if unit is found 
      continue;
        const  record= { // create data record 
          "item_no":String(datapoint),
          "description":String(data[1]),
          "unit":String(data[2]),
          "qty":Number(data[3]),
          "rate":Number(data[4]),
          "amount":Number(data[5])
      }
      let found=0;
      for(let i=0;i<results.length;i++){
        if(results[i].item_no===record.item_no && results[i].description===record.description){ // check if item_no and description is same 
          found=results[i].id; // if record found in db 
          break;
        }
    }
        if(found===0)
             await itemController.create(record) // for create
        else
             await itemController.update(String(found),record) // for delete
       } 
        })
   return res.status(200).send({ 
       message:`Record Added`
    })
})
itemsRouter.get('/getall', async (req: Request, res: Response) => {
    const results = await itemController.getAll()
    return res.status(200).send(results)
})
export default itemsRouter