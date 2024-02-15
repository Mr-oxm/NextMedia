import mongoose from "mongoose";


const storySchema= new mongoose.Schema({
    text:{type:String, required:true},
    bg: {type:String, required:true},
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
});

const Story= mongoose.models.Story|| mongoose.model("Story", storySchema);
export default Story;