import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  
  const handleEdit = () => {
    
  }
  const handleDelete = () => {
    
  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
  }


  //Any method

  // const handleCheckbox = (e)=>{
  //   let id = e.target.name

  //   let index = todos.findIndex(item=>{
  //     return item.id === id
  //   })

  //   let newTodos = [...todos]; //To create new object
  //   newTodos[index].isCompleted = !newTodos[index].isCompleted

  //   settodos(newTodos)
    
  // }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    let newTodo = todos.filter(item=>{
      if(item.id === id){
        item.isCompleted = !item.isCompleted
      }
      return item
    })
    settodos(newTodo)
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  } 

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-[#99bfbca8] my-5 p-4 rounded-xl min-h-[80vh]">
        <div className="addTodo">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2 px-2 py-1 my-1 rounded-lg' />
          <button  onClick={handleAdd} className='bg-blue-300 px-2 py-1 rounded-md mx-3 font-bold hover:bg-blue-400 '>Add</button>
        </div>

        <h2 className='font-bold text-lg mt-4'>Your Todos</h2>
        <div className="todos max-h-[60vh] overflow-auto">

          {todos.map(item => {
            return <div key={item.id} className="todo my-2">
              <div className="todoContent flex justify-between bg-white rounded-lg p-3 items-center">
                <div className='flex gap-3'>
                  <input type="checkbox" value={item.isCompleted} onChange={handleCheckbox} name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="change flex gap-5">
                  <button onClick={handleEdit} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400'>Edit</button>
                  <button onClick={handleDelete} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400 '>Delete</button>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>

    </>
  )
}

export default App
