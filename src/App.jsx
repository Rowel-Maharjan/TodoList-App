import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {

  const inputRef = useRef()
  const btn = useRef()
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFininshed, setshowFininshed] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    let todos = JSON.parse(todoString)
    settodos(todos);
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    btn.current.innerHTML = "Update"
    inputRef.current.focus();

    let index = todos.findIndex(item => {
      return item.id === id
    })
    settodo(todos[index].todo)

    let newTodo = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodo)
  }

  const handleDelete = (e, id) => {
    let newTodo = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodo)
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    btn.current.innerHTML = "Save"
  }

  const toggleFinished = () => {
    setshowFininshed(!showFininshed)
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



  const handleCheckbox = (e) => {
    let id = e.target.name
    let newTodo = todos.filter(item => {
      if (item.id === id) {
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
          <input ref={inputRef} onChange={handleChange} value={todo} type="text" className='w-1/2 px-2 py-1 my-1 rounded-lg' />
          <button ref={btn} onClick={handleAdd} disabled={todo.length <= 2} className='bg-blue-300 px-2 py-1 rounded-md mx-3 font-bold hover:bg-blue-400 '>Save</button>
        </div>


        <input onChange={toggleFinished} className='mt-5' type="checkbox" checked={showFininshed} /> Show Fininshed
        <h2 className='font-bold text-lg '>Your Todos</h2>
        <div className="flex flex-col todos max-h-[60vh] overflow-auto">

          {todos.length == 0 && <div className='my-2'>-Add todo to display here.</div>}
          {todos.map(item => {
            { saveToLS() }
            return (showFininshed || !item.isCompleted) && <div key={item.id} className="todo my-2">
              <div className="todoContent flex justify-between bg-white rounded-lg p-3 items-center">
                <div className='flex gap-3'>
                  <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
                </div>
                <div className="change flex gap-3">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400'><FaEdit /></button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400 '><MdDeleteForever /></button>
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
