import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  const handleEdit = ()=>{

  }
  const handleDelete = ()=>{

  }
  const handleAdd = ()=>{
    

  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-[#99bfbca8] my-5 p-4 rounded-xl min-h-[80vh]">
        <div className="addTodo">
          <h2 className='font-bold text-lg'>Add a Todo</h2>

          <input type="text" className='w-1/2 px-2 py-1 my-1 rounded-lg' />
          <button onClick={handleAdd} className='bg-blue-300 px-2 py-1 rounded-md mx-3 font-bold hover:bg-blue-400 '>Add</button>
        </div>

        <h2 className='font-bold text-lg mt-4'>Your Todos</h2>
        <div className="todos max-h-[60vh] overflow-auto">

          <div className="todo my-2">
            <div className="todoContent flex justify-between bg-white rounded-lg p-3 items-center">
              <div className="text">{todo}</div>

              <div className="change flex gap-5">
                <button onClick={handleEdit} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400'>Edit</button>
                <button onClick={handleDelete} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400 '>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
