import express from 'express'
import {Router as ProductsRouter} from './Products.routes.js'
import {Router as UsersRouter} from './User.routes.js'
import { Router as CartsRouter } from './Carts.routes.js'
import { Router as OrdersRouter } from "./Orders.routes.js";
import { Router as ImagesRouter } from "./Images.routes.js";
import { authorization } from '../Middlewares/authorization.js'
import { getInfo } from '../Controllers/Info.controller.js';
export const Router = express.Router()
.get('/info', authorization, getInfo)
.use('/api/images', ImagesRouter)
.use('/api/products', ProductsRouter)
.use('/', UsersRouter)
.use('/api/shoppingcartproducts', authorization, CartsRouter)
.use('/api/orders', authorization, OrdersRouter)