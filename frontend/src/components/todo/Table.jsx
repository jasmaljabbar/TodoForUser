import axios from "axios";
import React, { useState } from "react";
import {
  MdDelete,
  MdEditNote,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

// Correctly define props here
const Table = ({ todos, setTodos, isLoading }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newTodo = todos.filter((todos) => todos.id != id);
      setTodos(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      const newTodo = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };

  const handleChange = (e) => {
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(editText);
  };

  const handeditonece = (id,value)=>{
    handleEdit(id,{
        body:value
    })
  }

  const handleclick = () => {
    
    handeditonece(editText.id, editText.body);
  };

  if (isLoading) {
    // Return early if loading
    return <div>Loading...</div>;
  }

  return (
    <div className="py-2">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 text-black border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Created
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todoItem, index) => (
            <tr key={todoItem.id} className="border-b border-black">
              {" "}
              {/* Add a unique key prop */}
              <td className="p-3 text-left" title={todoItem.id}>
                <span
                  className="inline-block cursor-pointer text-gray-700"
                  onClick={() =>
                    handleCheckbox(todoItem.id, todoItem.completed)
                  }
                >
                  {todoItem.completed ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </span>
              </td>
              <td className="p-3 text-sm text-left text-gray-700">
                {todoItem.body} {/* Example dynamic content */}
              </td>
              <td className="p-3 text-sm text-center">
                <span
                  className={`p-1.5 text-xs font-medium tracking-wider text-black rounded-md ${
                    todoItem.completed ? "bg-green-300" : "bg-red-400"
                  }`}
                >
                  {todoItem.completed ? "Done" : "Incomplete"}{" "}
                  {/* Example dynamic content */}
                </span>
              </td>
              <td className="p-3 text-sm text-left text-gray-700">
                {new Date(todoItem.created).toLocaleString()}{" "}
                {/* Example dynamic content */}
              </td>
              <td className="p-3 text-sm font-medium grid grid-flow-col items-center gap-5 text-gray-800">
                <span
                  className="text-xl cursor-pointer"
                  onClick={() => handleDelete(todoItem.id)}
                >
                  <MdDelete />
                </span>
                <span className="text-xl cursor-pointer">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <MdEditNote onClick={() => setEditText(todoItem)} />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Todo</h3>
            <input
              value={editText.body}
              onChange={handleChange}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary mr-2" onClick={handleclick}>
                  Edit
                </button>
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </table>
    </div>
  );
};

export default Table;
