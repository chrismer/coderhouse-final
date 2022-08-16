import {createOrder, getOrderByID, updateOrder,deleteOrder, getAllOrders} from '../Controllers/Order.controller.js'
import express from 'express'
import { verifyAdmin } from '../Middlewares/verifyAdmin.js'



export const Router = express.Router()
.post('/',createOrder )
.get('/:id', getOrderByID)

//solo admin
.put('/',verifyAdmin, updateOrder)
.delete('/',verifyAdmin, deleteOrder)
.get('/', verifyAdmin,getAllOrders)