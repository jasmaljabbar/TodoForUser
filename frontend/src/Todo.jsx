import React, { useEffect, useState } from "react";
import Table from "./components/todo/Table";
import TodoForm from "./components/todo/TodoForm";
import axios from "axios";

export default function Todo() {
  const [todos, setTodos] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      setTodos(response.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(todos);
  }, []);

  return (
    <div className="bg-indigo-100 px-8 min-h-screen">
      <nav className="pt-12">
        <h1 className="text-5xl text-center pb-8 text-gray-900">Todo List</h1>
      </nav>
      <TodoForm setTodos={setTodos} fetchData={fetchData}/>
      <Table todos={todos} setTodos={setTodos} isLoading={isLoading} />
    </div>
  );
}
