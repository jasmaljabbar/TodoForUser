import React, { useEffect, useState } from "react";
import Table from "./components/todo/Table";
import TodoForm from "./components/todo/TodoForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchTodo } from "./features/todo/todoSlice";

export default function Todo() {
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    try {
      dispatch(fetchTodo())
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-indigo-100 px-8 min-h-screen">
      <nav className="pt-12">
        <h1 className="text-5xl text-center pb-8 text-gray-900">Todo List</h1>
      </nav>
      <TodoForm />
      <Table  />
    </div>
  );
}
