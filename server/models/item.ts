import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db/config'

// Interface for all possible attributes of the data record
interface ItemAttributes {
     id: number;
     item_no: string;
     description?: string;
     amount:number;
     unit?: string;
     rate:number;
     qty:number;
    createdAt?: Date;
    updatedAt?: Date;
}
//type of the object passed to Sequelize’s model.create
export interface ItemsInput extends Optional<ItemAttributes, 'id'> {}
//returned object from model
export interface ItemsOuput extends Required<ItemAttributes> {}

// To implement above interface 
class Item extends Model<ItemAttributes, ItemsInput> implements ItemAttributes {
    public rate!: number;
    public qty!: number;
    public id!: number
    public item_no!: string
    public description!: string
    public unit!: string
    public amount!: number;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Item.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    item_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
   unit: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.STRING
    },
    rate: {
        type: DataTypes.STRING
    },
    qty: {
        type: DataTypes.INTEGER
    }
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Item