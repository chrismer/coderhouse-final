import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const CartSchema = mongoose.Schema({
    userID:{
        type: ObjectId,
        ref: 'user',
        unique:true
    },
    products:[{productId:{type:ObjectId, ref:"product"}, quantity:{type:Number, default:1}}]
});
const CartModel = mongoose.model('cart', CartSchema);
export default CartModel;