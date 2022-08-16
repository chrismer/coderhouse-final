import { authorization } from "./authorization.js";
//verifica si esta logueado primero y despues si isAdmin es true, si es false devuelve excepcion
function verifyAdmin(req, res, next) {
   try {
    authorization(req, res, ()=>{
        if(!req.user.isAdmin) throw new Error("Solo Permiso Para admins")
        next()
    })
   } catch (error) {
    res.status(403).json({msg:error.message})
   } 
}

export{
    verifyAdmin
}