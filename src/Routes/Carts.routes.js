import express from 'express'
import {
    addProductsToCart,
    deleteCart,
    getCartByID,
    getAllCarts, deleteProductByid} from '../Controllers/Cart.controller.js'
import { verifyAdmin } from '../Middlewares/verifyAdmin.js'
import {verifyCart} from '../Middlewares/verifyCart.js'
import {verifyProduct} from '../Middlewares/verifyProduct.js'
export const Router = express.Router()
.post('/',verifyCart, verifyProduct, addProductsToCart)
.get("/", getCartByID)
.delete('/:productId',deleteProductByid)
//Solo Admin
.get('/', verifyAdmin, getAllCarts)
.delete("/:id", verifyAdmin, deleteCart)