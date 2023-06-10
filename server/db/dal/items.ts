
import Item from '../../models/item'
import {ItemsInput, ItemsOuput} from '../../models/item'
//The data access layer (DAL) is where we implement our SQL queries

// Insert into 
export const create = async (payload: ItemsInput): Promise<ItemsOuput> => {
    const item = await Item.create(payload)
    return item
}
export const findOrCreate = async (payload: ItemsInput): Promise<ItemsOuput> => {
    const [item] = await Item.findOrCreate({
        where: {
            item_no: payload.item_no 
        },
        defaults: payload
    })
    return item
}
export const update = async (payload: Partial<ItemsInput>): Promise<ItemsOuput> => {
    const item = await Item.findOne({where: {
      id:payload.id
      }})
    if (!item) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedItem = await item.update(payload)
    return updatedItem
}
export const getById = async (id: number): Promise<ItemsOuput> => {
    const item = await Item.findByPk(id)
    if (!item) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return item
}
export const deleteById = async (id: number): Promise<boolean> => {
    const deletedItemCount = await Item.destroy({
        where: {id}
    })
    return !!deletedItemCount
}
export const getAll = async (): Promise<ItemsOuput[]> => {
    return Item.findAll()
}
