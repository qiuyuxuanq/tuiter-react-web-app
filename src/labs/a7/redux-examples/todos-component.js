import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, todoDoneToggle } from "./reducers/todos-reducer";
const Todos = () => {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const [todo, setTodo] = useState({ do: "" });
  const dispatch = useDispatch();
  const deleteTodoClickHandler = (index) => {
    dispatch(deleteTodo(index));
  };

  const toggleTodoDone = (todo) => {
    dispatch(todoDoneToggle(todo));
  };

  const createTodoClickHandler = () => {
    dispatch(addTodo(todo));
  };
  const todoChangeHandler = (event, index) => {
    const doValue = event.target.value;
    const newTodo = {
      do: doValue,
    };
    setTodo(newTodo);
  };
  return (
    <>
      <h3>Todos</h3>
      <ul className="list-group todo-box">
        {todos.map((todo, index) => (
          <li className="list-group-item todo-item" key={todo._id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodoDone(todo)}
              className="me-2"
            />
            <input
              onChange={(e) => todoChangeHandler(e, index)}
              value={todo.do}
              className="form-control w-75"
            />
            {index > 0 ? (
              <button
                onClick={() => deleteTodoClickHandler(index)}
                className="btn btn-danger 
                        float-end ms-2"
              >
                Delete
              </button>
            ) : (
              ""
            )}

            {index === 0 ? (
              <button
                onClick={createTodoClickHandler}
                className="btn btn-primary w-25 
             float-end"
              >
                Create
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
export default Todos;
