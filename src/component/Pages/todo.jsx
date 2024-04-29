import React, { useState } from "react";
import { useReducer } from "react";
import { Button } from "flowbite-react";
import Navbar from "./navbar";
// import Footer from "./footer";

const initialState = [];
function reducer(state, action) {
  const TODO_Action = {
    ADD_TASK: "add_task",
    DELETE_TASK: "delete_task",
  };
  switch (action.type) {
    case "TODO_Action.ADD_TASK":
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
        },
      ];
    case "TODO_Action.DELETE_TASK":
      return state.filter((t) => t.id !== action.payload);

    default:
      return state;
  }
}

function Todo() {
  const [todo, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState("");

  const handleAdd = () => {
    if (data.trim() !== "") {
      dispatch({ type: "TODO_Action.ADD_TASK", payload: data });
      setData("");
    }
  };

  return (
    <>
      <Navbar />
        <div className="flex flex-col justify-center items-center w-full max-w-screen-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo List: {todo.length}</h1>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter task"
          className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
        />
        <Button onClick={handleAdd} color="success" className="h-10">
          Add
        </Button>
      </div>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200 sticky top-0">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Task</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-300 px-4 py-2">{task.id}</td>
              <td className="border border-gray-300 px-4 py-2">{task.name}</td>
              <td
                className="border border-gray-300 px-4 py-2"
                style={{ textAlign: "-webkit-center" }}
              >
                <Button
                  color="failure"
                  onClick={() =>
                    dispatch({
                      type: "TODO_Action.DELETE_TASK",
                      payload: task.id,
                    })
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Footer /> */}
    </div>
    </>
  
  );
}

export default Todo;