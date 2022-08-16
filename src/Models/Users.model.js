import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});
const UserModel = mongoose.model('user', UserSchema);
export default UserModel;