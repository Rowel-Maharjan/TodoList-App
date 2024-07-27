import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    todo: {
        type : String,
        required : [true, "Enter todo"],
        minlength : [3, "The length of todo must be greate than two"] 
    }
});

const todosList = mongoose.model('todo', TodoSchema);
export default todosList