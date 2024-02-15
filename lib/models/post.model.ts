import mongoose from "mongoose";


const postSchema= new mongoose.Schema({
    text:{type:String, required:true},
    image:{type:String},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    parentId:{type:String},
    children:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
});

const Post= mongoose.models.Post|| mongoose.model("Post", postSchema);
export default Post;