import todosList from "../models/todo.model.js";

const createTodo = async (req, res) => {
    try {
        const todo = await todosList.create(req.body);
        res.status(200).json(todo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getTodo = async (req, res) => {
    try {
        const todo = await todosList.find();
        res.status(200).json(todo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteTodo = async (req, res) => {
    try {
        const todo = await todosList.findByIdAndDelete(req.params.id);
        if (!todo) {
            res.status(404).json({ message: "Todo Not found" })
        }
        res.status(200).json({ message: "Todo succesffuly Deleted" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const editTodo = async (req, res) => {
    try {
        const todo = await todosList.findByIdAndUpdate(req.params.id, req.body);
        if (!todo) {
            res.status(404).json({ message: "Todo Not found" })
        }
        const updatedTodo = await todosList.findById(req.params.id)
        res.status(200).json(updatedTodo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default {getTodo, editTodo, deleteTodo, createTodo}