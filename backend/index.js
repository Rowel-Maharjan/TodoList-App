import express from 'express'
import mongoose from 'mongoose'
import todoApi from './controllers/todo.controller.js'
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'

const {getTodo, editTodo, deleteTodo, createTodo, patchTodo} = todoApi;

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connection Successfull")
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
})
.catch(()=>{
    console.log("Error in connection")
})

app.get("/", getTodo);
app.put("/:id", editTodo);
app.delete("/:id", deleteTodo);
app.post("/", createTodo);
app.patch("/:id",patchTodo);
