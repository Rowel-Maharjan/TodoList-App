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

  const getTodos = async () => {

    let res = await fetch("http://localhost:3000/");
    let todos = await res.json();
    // let todoString = localStorage.getItem("todos")
    // let todos = JSON.parse(todoString)
    settodos(todos);
  }

  useEffect(() => {
    getTodos()
  }, [])


  // const saveToLS = async() => {
  //   console.log(todos)
  //   let res = await fetch("http://localhost:3000/", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify(todos)
  //   });
  //   // localStorage.setItem("todos", JSON.stringify(todos))
  // }


  const handleEdit = async (todo) => {
    btn.current.innerHTML = "Update"
    inputRef.current.focus();

    let index = todos.findIndex(item => {
      return item._id === todo._id
    })
    settodo(todos[index].todo)

    let newTodo = todos.filter(item => {
      return item._id !== todo._id
    })
    settodos(newTodo)
    let res = await fetch(`http://localhost:3000/${todo._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

  }

  const handleDelete = async (todo) => {
    // localStorage.setItem("todos", JSON.stringify(newTodo))
    let res = await fetch(`http://localhost:3000/${todo._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let newTodo = todos.filter(item => {
      return item._id !== todo._id
    })
    settodos(newTodo)


  }

  const handleAdd = async () => {
    // settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])

    let newTodo = { todo, isCompleted: false }
    let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    });
    let data = await res.json()
    settodos([...todos, data])
    settodo("")

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && todo.length > 2) {
      btn.current.click();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-[#99bfbca8] my-5 p-4 rounded-xl min-h-[80vh]">
        <h1 className='font-bold text-xl text-center mb-3'>iTask - Manage your TODO in one place</h1>
        <div className="addTodo">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <div className="inputBox flex flex-col md:flex-row gap-1 md:gap-0">
            <input onKeyDown={handleKeyDown} ref={inputRef} onChange={handleChange} value={todo} type="text" className='md:w-1/2 px-2 py-1 my-1 rounded-lg mx-2' />
            <button ref={btn} onClick={handleAdd} disabled={todo.length <= 2} className='bg-blue-300 px-2 py-1 rounded-md mx-1 font-bold hover:bg-blue-400 cursor-pointer'>Save</button>
          </div>
        </div>


        <input onChange={toggleFinished} className='mt-5' type="checkbox" checked={showFininshed} /> Show Fininshed
        <h2 className='font-bold text-lg '>Your Todos</h2>
        <div className="flex flex-col todos max-h-[60vh] overflow-auto">
          {todos.length == 0 && <div className='my-2'>-Add todo to display here.</div>}
          {todos.map((item, index) => {
            // { saveToLS() }
            return (showFininshed || !item.isCompleted) && <div key={index} className="todo my-1">
              <div className="todoContent flex justify-between bg-white rounded-lg p-3 items-center">
                <div className='flex gap-3'>
                  <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
                </div>
                <div className="change flex gap-3">
                  <button onClick={(e) => handleEdit(item)} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400'><FaEdit /></button>
                  <button onClick={(e) => handleDelete(item)} className='bg-blue-300 px-2 py-1 rounded-md font-bold hover:bg-blue-400 '><MdDeleteForever /></button>
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
