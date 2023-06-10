import * as service from '../db/services/ItemService'
import {CreateItemDTO, UpdateItemsDTO} from '../api/dto/item.dto'
import {Item} from '../interfaces/item.interface'
import {ItemsOuput} from '../models/item'

export const toItem= (item: ItemsOuput): Item => {
    return {
        id: item.id,
        item_no: item.item_no,
        description: item.description,
        unit: item.unit,
        amount:item.amount,
        rate:item.rate,
        qty:item.qty,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    }
}
export const create = async(payload: CreateItemDTO): Promise<Item> => {
    return toItem(await service.create(payload))
}
export const update = async (item_no: String, payload: UpdateItemsDTO): Promise<Item> => {
    return toItem(await service.update(item_no, payload))
}
export const getById = async (id: number): Promise<Item> => {
    return toItem(await service.getById(id))
}
export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
export const getAll = async(): Promise<Item[]> => {
    return (await service.getAll()).map(toItem)
}
export const batchAdd=async(payload:CreateItemDTO[]):Promise<Item[]>=>{
let data=[];
    data.push(await create(payload[0]));
return data;  
}
 