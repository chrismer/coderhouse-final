import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const OrderSchema = mongoose.Schema({
    userID:{
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    date:{
        type:Date,
        default:Date.now
    },
    products:[{
        type:Object

    }],
    email:{type: String, required:true},
    amount:{type:Number}
});
const OrderModel = mongoose.model('order', OrderSchema);
export default OrderModel;