import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if (todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      console.log(todos)
      setTodos(todos)
    }
  }, [])


  useEffect(() => {
    if (todos.length >= 1) {
      saveLocally();
    } else {
      localStorage.removeItem('todos'); // Clear local storage if todos is empty
    }
  }, [todos]);
  

  const handleAdd = async (e) => {
    setTodos(prevTodos => [...prevTodos, {id: uuidv4(), todo , isDone: false}]);
    setTodo(""); 
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  
  const handleDone = (id) => {
    const updatedTodos = todos.map(todoItem => {
      if (todoItem.id === id) {
        return { ...todoItem, isDone: !todoItem.isDone };
      }
      return todoItem;
    });
    setTodos(updatedTodos);
    saveLocally()
  };

  const handleDelete=(id)=>{
    let t = todos.filter((i)=>{return i.id!==id})
    setTodos(t)
    saveLocally()
  }

  const handleEdit=(id)=>{
    let t = todos.filter((i)=>{return i.id===id})
    setTodo(t[0].todo)
    let t2 = todos.filter((i)=>{return i.id!==id})
    setTodos(t2)
    saveLocally()
  }

const saveLocally = () => {
  localStorage.setItem("todos", JSON.stringify(todos)); 
};



  return (
    <div>
      <div className="container mx-auto">
        <div className="title flex justify-center my-8">
          <h1 className="text-4xl font-bold text-white">MereTask</h1>
        </div>
        <div className="main">
          <div className="header h-12 rounded-xl w-full sm:w-1/2 mx-auto flex items-center justify-between p-8">
            <input
              onChange={handleChange}
              type="text"
              name="newTodo"
              value={todo}
              id=""
              className="w-[35rem] border-none px-2 outline-none "
            />
            <button onClick={handleAdd} disabled={todo.length<=3} className="bg-white px-3 font-bold">
              Add
            </button>
          </div>
          <div className="todo h-[65vh] m-6 rounded-xl mx-auto w-full p-4 overflow-y-scroll sm:w-1/2">
            <h2 className="text-white text-xl font-bold text-center">
              Your Tasks
            </h2>
            {todos.length===0 && <div className="notask ">
                <img className="invert h-56 grayscale opacity-20 mx-auto my-8" src="task.png" alt="" />
                <h2 className="text-white opacity-20 text-center text-4xl">ADD YOUR FIRST TASK</h2>
              </div>}
            {todos.map((item)=>{
             return <div key={item.id} className="task flex items-center justify-between m-4 p-2 px-4 rounded-lg">
              <div className={item.isDone?"line-through text-white text-opacity-60":"text-white"}>
                {item.todo}
              </div>
              <div className="logos flex gap-4 hover:cursor-pointer">
                <div className="tick">
                <span onClick={() => handleDone(item.id)} className="material-symbols-outlined invert hover:cursor-pointer">
                  {item.isDone?"refresh":"check_circle"}
                </span>

                </div>
                <div className="edit">
                  <span onClick={()=>{handleEdit(item.id)}} class="material-symbols-outlined invert hover:cursor-pointer">
                    edit
                  </span>
                </div>
                <div className="delete">
                  <span onClick={()=>{handleDelete(item.id)}} class="material-symbols-outlined invert hover:cursor-pointer">
                    delete
                  </span>
                </div>
              </div>
            </div>})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
