import UserModel from "../Models/Users.model.js";
import CryptoJS from 'crypto-js'
import jwt from "jsonwebtoken"
import {userEmail} from '../Utils/nodemailer.js'
//Registro de usuario
async function registerUser (req, res){
    let { name, lastname, email,image, password, phone, isAdmin} = req.body
    const existUser = await UserModel.findOne({email}).exec()
try {
    if( !name||!lastname||!email ||!image || !password || !phone   ) throw new Error('Faltan Campos')
    if(existUser) throw new Error('Usuario ya existente')
    if(!isAdmin) isAdmin = false
    password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
    UserModel.create({name, lastname, email, password,image, phone, isAdmin})
    .then(user=> {
        res.status(201).json({msg:"Usuario Creado con Exito"})
        userEmail(user)
        })
    .catch(e=>res.json({msg:e.message}))
} catch (error) {
    res.json({msg:error.message})
}
}

//login de usuario
async function loginUser(req, res){
    const email=req.body.email
    try {
        const userExist = await UserModel.findOne({email})
        if(!userExist) throw new Error('No existe user')
        const hash = CryptoJS.AES.decrypt(userExist.password, process.env.SECRET_KEY)
        const newPass = hash.toString(CryptoJS.enc.Utf8)
        const accessToken = jwt.sign({
            id:userExist._id,
            email:userExist.email,
            isAdmin:userExist.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:"3d"}
        )
        if(newPass !== req.body.password) throw new Error("Password incorrecto")
        const {password, ...restoUser} = userExist._doc
        res.status(200).json({...restoUser, accessToken})
    } catch (error) {
        res.status(401).json({msg:error.message})
    }

}

export{
registerUser,
loginUser,

}