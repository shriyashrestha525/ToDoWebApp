import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4} from 'uuid';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos);
    }
  }, [])

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) =>{
    let index = todos.findIndex(item =>{
      return item.id === id;
    });
    let newtodo = todos[index].todo;
    settodo(newtodo);

    let newtodos = todos.filter(item =>{
      return item.id !== id
    });
    settodos(newtodos);

    saveToLS(newtodos);
    
  }

  const handleDelete = (id) =>{
    
    var confirmDelete = confirm("Are you sure you want to delete this");
    if(confirmDelete){
      let newtodos = todos.filter(item =>{
        return item.id!==id
      });
      settodos(newtodos);
      saveToLS(newtodos);
    }

  }
  const handleChange = (e) =>{
    settodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLS(newtodos);
  }
  
  

  const handleAdd = () =>{
    const newTodo =  {id: uuidv4(), todo, isCompleted: false};
    const updatedTodo = [...todos, newTodo];

    settodos(updatedTodo);
    settodo("");
    saveToLS(updatedTodo);
  };

  return (
    <>
      <Navbar name = "iTask"/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='container my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-full'>
        <div className='addTodo flex flex-col gap-2'>
          <h2  className='text-xl font-bold'>Add a Todo</h2> 
          <input onChange= {handleChange} value= {todo} type="text" className='w-full'/>
          <button onClick={handleAdd} disabled = {todo.length <= 3} className='bg-violet-800 disabled:bg-violet-300 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md w-full mb-5'>Add</button>
        </div>
        <input onChange= {toggleFinished} type="checkbox" checked = {showFinished} /> Show Finished 
        <h2 className='text-xl font-bold mt-6'>Your Todos</h2>
       <div className='todos'>
        {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item=> {
          if (showFinished || !item.isCompleted){
            return(

              <div key = {item.id} className="todo flex justify-between w-full my-2">
                <input onChange={handleCheckbox} type="checkbox" checked = {item.isCompleted} name ={item.id} id = "" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                <div className='buttons flex h-full'>
                  <button id='edit' onClick={(e) => {handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 mx-6 text-sm font-bold text-white rounded-md'><FiEdit /></button>
                  <button id='delete' onClick={(e)=>{handleDelete(item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 mx-6 text-sm font-bold text-white rounded-md'><MdDeleteOutline /></button>
                </div>
              </div>
            )
          }
        } )}
        
       </div>
      </div>
      </div>
      
    </>
  )
}

export default App
