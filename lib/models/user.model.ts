import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    id:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    name: {type:String, required:true},
    image: String,
    bio: String,
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    saved:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    requests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    stories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ],
    groups:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],
    onboarded:{type: Boolean, default:false},
    
});

const User= mongoose.models.User|| mongoose.model("User", userSchema);
export default User;