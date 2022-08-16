import CartModel from "../Models/Carts.model.js"


async function verifyCart(req, res, next) {
    const user = req.user.id 
    const existCart = await CartModel.findOne({userID:user})
     if(!existCart){
    CartModel.create({userID:user, products:[]})
    .then()
    .catch(e=> res.json({msg:e.message}))
    next()
    }else{
        next()
    }
}

export{
    verifyCart
}