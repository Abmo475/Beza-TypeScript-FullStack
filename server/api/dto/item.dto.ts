import { Optional } from "sequelize/types"

export type CreateItemDTO = {
    item_no: string;
    description?: string;
    amount:number;
    rate:number;
    qty:number;
   unit?: string;
}

export type UpdateItemsDTO = Optional<CreateItemDTO, 'item_no'>

 