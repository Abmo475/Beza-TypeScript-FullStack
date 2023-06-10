require('dotenv').config()
import  Item from '../models/item'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'
 //to create model target table in the connected database
const dbInit = () => Promise.all([
  /*
  
  alter creates the table if it does not exist or updates the table to match 
  the attributes defined in the model.
  
  */
    Item.sync({ alter: isDev || isTest })
  ])
export default dbInit 
