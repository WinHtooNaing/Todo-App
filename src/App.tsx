import Navbar from "./components/Nav";
import TodoApp from "./components/Todo";

const App = () => {
  return (
    <>
      <section className="flex flex-col justify-center sm:w-[60%] w-full mx-auto">
        <Navbar />
        <TodoApp />
      </section>
    </>
  );
};
export default App;
