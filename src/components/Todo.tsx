import { useEffect, useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface TodoItem {
  id: number;
  text: string;
}
const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleTodo = () => {
    if (todo.trim() !== "") {
      if (isEditing) {
        const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = existingTodos.map((item: TodoItem) =>
          item.id === editTodoId ? { ...item, text: todo } : item,
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodoItems(updatedTodos);
        setIsEditing(false);
        setEditTodoId(null);
        setTodo("");
      } else {
        const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        const newTodo = { id: Date.now(), text: todo };
        const updatedTodos = [...existingTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodo("");
        setTodoItems(updatedTodos);
      }
    }
  };
  const handleDeleteTodo = (id: number) => {
    const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedTodos = existingTodos.filter(
      (todo: TodoItem) => todo.id !== id,
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodoItems(updatedTodos);
  };
  const getTodosFromLocalStorage = () => {
    const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodoItems(existingTodos);
  };

  const getEditTodo = (id: number, text: string) => {
    setEditTodoId(id);
    setTodo(text);
    setIsEditing(true);
  };

  useEffect(() => {
    getTodosFromLocalStorage();
  }, []);

  return (
    <>
      <div className="flex flex-col w-[70%] mx-auto mt-10">
        <div className="flex w-full gap-2 ">
          <input type="text" hidden name="editTodoId" />
          <input
            type="text"
            placeholder="Add a new todo..."
            className="w-[70%] sm:w-[80%] border border-gray-300 rounded-lg p-4   focus:outline-none focus:ring-2 focus:ring-grey-300 shadow-sm "
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            className="w-[30%] sm:w-[20%] bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300"
            onClick={handleTodo}
          >
            {isEditing ? "Update Todo" : "Add Todo"}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 border border-gray-300 rounded-lg py-4  ">
          {todoItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <CiNoWaitingSign size={30} />
              <h2 className="text-xl font-bold text-gray-800">No Todos</h2>
            </div>
          ) : (
            <ul className="w-full">
              {todoItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border border-gray-300 rounded-lg p-4 mb-4 mx-4 "
                >
                  <span className="text-grey-800">{item.text}</span>
                  <div className="flex gap-2">
                    <FaRegEdit
                      size={20}
                      className="cursor-pointer text-orange-500 hover:text-blue-500 transition-colors duration-300"
                      onClick={() => getEditTodo(item.id, item.text)}
                    />
                    <MdDelete
                      size={20}
                      className="cursor-pointer text-red-500 hover:text-red-500 transition-colors duration-300"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this todo?",
                          )
                        ) {
                          handleDeleteTodo(item.id);
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
