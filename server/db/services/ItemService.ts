
import * as ItemDal from '../dal/items'
import {ItemsInput, ItemsOuput} from '../../models/item'

//intermediary between  controller and DAL
export const create = async (payload: ItemsInput): Promise<ItemsOuput> => {
    return ItemDal.create(payload)
}
export const update = async (id: String, payload: Partial<ItemsInput>): Promise<ItemsOuput> => {
    return ItemDal.update(id, payload)
}

export const getById = (id: number): Promise<ItemsOuput> => {
    return ItemDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return ItemDal.deleteById(id)
}

export const getAll = (): Promise<ItemsOuput[]> => {
    return ItemDal.getAll()
}