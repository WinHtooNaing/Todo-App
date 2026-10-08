import { FaCheckCircle, FaTrash } from "react-icons/fa";

type TodoProps = {
  todo: {
    id: number;
    todo: string;
    completed: boolean;
  };
  deleteTodo: (id: number) => void;
  completeTodo: (id: number) => void;
};

const Todo = ({ todo, deleteTodo, completeTodo }: TodoProps) => {
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
};

export default Todo;
