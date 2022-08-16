import jwt from 'jsonwebtoken';


//verifica que usuario este logueado
function authorization(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
        if (!(authHeader?.includes('Bearer'))) throw new Error("Token Invalido") 
        if (token === null) throw new Error("Token Invalido") 
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,user) =>{
            if(err)throw new Error("Token invalido")
            req.user = user
            next()
        })
    } catch (error) {
        res.status(401).json({msg:error.message})
    }
}

export{
    authorization
}