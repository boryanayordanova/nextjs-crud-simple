"use client";

import { useEffect, useState } from "react";
import Form from "./components/form";
import Table from "./components/table";

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log("sassssss", data);
    // setIsloading(false);
    setUsers(data.data);
    return data.data; // Assuming the response structure contains the user data here
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="text-center mx-auto py-4 px-2 min-h-[100vh]">
      <h1 className="p-3">Simple Crud App</h1>
      <Form />
      <Table users={users} />
    </div>
  );
}
