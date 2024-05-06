import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Pages/home";
import Create from "./component/Pages/create";
import Todo from "./component/Pages/todo";
import Footer from './component/Pages/footer';
import Listofusers from "./component/Pages/listofusers";
import Read from "./component/Pages/read";
import Navbar from "./component/Pages/navbar";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/create/listofusers" element={<Listofusers />}></Route>
          <Route path="/create/listofusers/:id" element={<Read />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
// import React, { useState } from "react";
// import { useReducer } from "react";

// const initialState = [];

// function reducer(state, action) {
//   switch (action.type) {
//     case "ADD_TASK":
//       return [
//         ...state,
//         {
//           id: state.length + 1,
//           name: action.payload,
//         },
//       ];
//     case "DELETE_TASK":
//       return state.filter((t) => t.id !== action.payload);
//     default:
//       return state;
//   }
// }

// function App() {
//   const [todo, dispatch] = useReducer(reducer, initialState);
//   const [taskInput, setTaskInput] = useState("");

//   const handleAddTask = () => {
//     if (taskInput.trim() !== "") {
//       dispatch({ type: "ADD_TASK", payload: taskInput });
//       setTaskInput("");
//     }
//   };

//   return (
//     <div>
//       <h1>todos :{todo.length}</h1>
//       Add task:
//       <input
//         type="text"
//         name="inputdata"
//         value={taskInput}
//         onChange={(e) => setTaskInput(e.target.value)}
//         placeholder="add todo"
//       />
//       <button onClick={handleAddTask}>Add</button>
//       <table>
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>todolist</th>
//           </tr>
//         </thead>
//         <tbody>
//           {todo.map((t) => (
//             <tr key={t.id}>
//               <td>{t.id}</td>
//               <td>{t.name}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     dispatch({ type: "DELETE_TASK", payload: t.id })
//                   }
//                 >
//                   delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
