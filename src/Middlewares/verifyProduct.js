import ProductModel from "../Models/Products.model.js";


async function verifyProduct(req, res, next) {
   
    const productExist =await ProductModel.findOne({_id:  req.body.productId})
    try {
        if(!productExist) throw new Error("No existe el producto")
        next()
    } catch (error) {
        res.json({msg:error.message})
    }
}

export{
    verifyProduct
}