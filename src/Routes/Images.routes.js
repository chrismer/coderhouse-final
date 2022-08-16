import{ verifyAdmin} from '../Middlewares/verifyAdmin.js'
import express from 'express'
import{upload, uploadFile} from '../Utils/multer.js'


export const Router = express.Router()
.post('/', verifyAdmin, upload, uploadFile)