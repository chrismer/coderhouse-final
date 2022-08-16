import OrderModel from '../Models/Orders.model.js'
import UserModel from '../Models/Users.model.js'
import { orderAdminEmail, orderEmail } from '../Utils/nodemailer.js'
import CartModel from '../Models/Carts.model.js'



// crear orden
async function createOrder(req, res){
    const populate = { 
        path: 'products.productId'
    }
  const userID = req.user.id
  
  const cart = await CartModel.findOne({userID: userID}).populate(populate)
  let email = "";
  await UserModel.findOne({_id:cart.userID}).then(u => email = u.email).catch(e => console.log(e))
  let total=0 
  cart.products.forEach(p=> total = total +( p.quantity* p.productId.price))
  const order = {
    userID: cart.userID,
    products: cart.products,
    email:email,
    amount: total
    }
    OrderModel.create(order)
    .then(o=> {
      orderEmail(email, o)
      orderAdminEmail(o)
      CartModel.findOneAndDelete({userID:userID}).then().catch()
      res.json({msg:" orden enviada con exito", o})})
      .catch(e=> res.json({msg: e.message}))
  }




//OBTENER LA ORDEN POR ID DE USUARIO
function getOrderByID(req, res){
    OrderModel.findOne({ userID: req.params.id})
    .then(o=> res.status(200).json(o))
    .catch(e=>res.json({msg: e.message}))
  
 }
//ACTUALIZAR ORDEN

function updateOrder(req, res) {
    OrderModel.findOneAndUpdate(
         {userID: req.user.id},
         {
           $set: req.body,
         },
         { new: true }
       )
       .then(_o=>res.status(200).json({msg:"orden Actualizada con exito"}))
       .catch(e=>res.json({msg: e.message}))
   }
//BORRAR ORDEN POR ID 
function deleteOrder(req, res){
    OrderModel.findOneAndDelete({userID:req.user.id})
    .then(_o=>res.status(200).json({msg:"La Order fue cancelada..."}))
    .catch(e=>res.json({msg: e.message}))
  }

  
  //OBTENER TODOS LAS ORDENES
  function getAllOrders(_req, res){
    OrderModel.find()
     .then(o=>res.status(200).json(o))
     .catch(e=>res.json({msg: e.message}))
  }

export{
    createOrder,
    getOrderByID,
    updateOrder,
    deleteOrder,
    getAllOrders
}