import express from 'express'
import { getAllProducts,getProductsByID, putProducts, postProducts, deleteProducts } from '../Controllers/Products.controller.js'
import{ verifyAdmin} from '../Middlewares/verifyAdmin.js'
export const Router = express.Router()
.get('/', getAllProducts)
.get('/:id', getProductsByID)
//solo administrador
.post('/',verifyAdmin, postProducts)
.put('/:id',verifyAdmin, putProducts )
.delete('/:id',verifyAdmin, deleteProducts)
