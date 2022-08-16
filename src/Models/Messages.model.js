import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    text:[{
        type:String
    }]
});
const MessageModel = mongoose.model('message', MessageSchema);
export default MessageModel;