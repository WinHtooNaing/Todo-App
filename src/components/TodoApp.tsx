import { useState, useRef } from "react";
import Todo from "./Todo";
import { todoStore } from "../store/store";
interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}
const TodoApp = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const getTodos = todoStore((state) => state.todos);
  const addTodo = () => {
    if (input.trim()) {
      todoStore
        .getState()
        .addTodo({ id: Date.now(), todo: input, completed: false });
      setInput("");
      inputRef.current!.value = "";
    }
  };
  const deleteTodo = (id: number) => {
    todoStore.getState().deleteTodo(id);
    todoStore((state) => state.todos);
  };
  const completeTodo = (id: number) => {
    todoStore.getState().completeTodo(id);
    todoStore((state) => state.todos);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-950 ">
      <div className="w-[90%] max-w-125 p-4 bg-slate-900  shadow-md rounded-md">
        <h1 className="text-center text-white text-2xl">todos For the day!</h1>
        <div className="flex gap-2 justify-center my-8">
          <input
            ref={inputRef}
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
          {getTodos.length > 0 ? (
            <>
              {getTodos.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                  />
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
