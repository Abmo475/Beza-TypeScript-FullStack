export interface Item {
  id: number
  item_no: string
  description?: string
  unit?: string
  amount?:Number
  qty?:Number
  rate?:Number
  createdAt: Date
  updatedAt: Date
}