import CartModel from '../Models/Carts.model.js'


//AGREGAR PRODUCTOS A CARRITO por usuario

async function addProductsToCart(req, res){
    let newProduct = req.body.productId;
    const user = req.user.id
    let carrito= await CartModel.findOne({userID:user}).exec()
    if(!carrito.products.find(e=> e.productId == newProduct)){
    newProduct= {productId: newProduct} 
    carrito.products.push(newProduct)
    }else{
   
    carrito.products.forEach(element => {
        if(element.productId == newProduct) element.quantity= element.quantity +1
   })
    }
    carrito.save()
    .then(_cart=> res.json({msg:"Se Agrego el producto al carrito"}))
    .catch(err=> res.json({msg: err.message}))
    
}

//BORRAR CARRITO POR ID de carrito
function deleteCart(req, res) {
    CartModel.findOneAndDelete({_id:req.params.id})
    .then(_cart =>res.status(200).json("El carrito fue eliminado exitosamente..."))
    .catch(e=> res.status(500).json({msg:e.message})) ;
}



  //OBTENER EL CARRITO POR ID DE CARRITO con productos
function getCartByID(req, res) {
    const populate = { 
        path: 'products.productId'
    }
    const id = req.user.id
    CartModel.findOne({ userID:id }).populate(populate)
    .then(cart => res.status(200).json(cart))
    .catch(e=>res.status(500).json({msg:e.message}))
}

//se elimina producto con id de producto
async function deleteProductByid(req, res){
    const id = req.user.id
    const product = req.params.productId
    let cart = await CartModel.findOne({userID:id})
    cart = cart.products.filter(p=> p.productId != product)
    console.log(cart)
    CartModel.update({userID:id }, {$set:{products: cart}})
    .then(_c => res.status(200).json({msg:"Se elimino producto correctamente"}))
    .catch(e=>res.json({msg:e.message}))
}

//OBTENER TODOS LOS CARRITOS
function getAllCarts(_req, res) {
    CartModel.find()
    .then(carts=>res.status(200).json(carts))
    .catch(e=>res.status(500).json({msg:e.message}))
}


export{
    addProductsToCart,
    deleteCart,
    getCartByID,
    getAllCarts,
    deleteProductByid
}