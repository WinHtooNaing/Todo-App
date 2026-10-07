import { useState } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}
const TodoApp = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        todo: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
      console.log(todos);
    }
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const completeTodo = (id: number) => {
    setTodos(
      todos.filter((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-950 ">
      <div className="w-[90%] max-w-125 p-4 bg-slate-900  shadow-md rounded-md">
        <h1 className="text-center text-white text-2xl">todos For the day!</h1>
        <div className="flex gap-2 justify-center my-8">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="flex-3 border-gray-500 outline-none border-2 p-2 focus:border-white placeholder-gray-500 text-white rounded-md"
            placeholder="Add Todo..."
          />
          <button
            onClick={addTodo}
            className="flex-1 bg-purple-800 text-white cursor-pointer hover:bg-purple-900 text-sm rounded-md"
          >
            Add Todo
          </button>
        </div>
        <div>
          <h1 className="text-center text-white text-xl">todos</h1>
          {todos?.length > 0 ? (
            <>
              {todos.map((todo) => {
                return (
                  <div
                    className="my-4 flex justify-between bg-purple-900 p-2 rounded-md"
                    key={todo.id}
                  >
                    <p
                      className={`text-white ${
                        todo.completed === true ? "line-through" : ""
                      }`}
                    >
                      {todo.todo}
                    </p>
                    <div className="flex items-center gap-2 text-xl cursor-pointer text-white transition duration-600">
                      <FaCheckCircle
                        className="hover:text-gray-200"
                        onClick={() => completeTodo(todo.id)}
                      />
                      <FaTrash
                        className="hover:text-gray-200"
                        onClick={() => deleteTodo(todo.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <h1 className="text-center text-white text-xl my-4">
              No todos for the day!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
