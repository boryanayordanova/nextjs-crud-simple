"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "./components/form";
import Table from "./components/table";
import Loading from "./components/loading";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.data || []); // Ensure users is always an array
      setLoading(false);
      return data.data; // Assuming the response structure contains the user data here
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="text-center mx-auto py-4 px-2 min-h-[100vh]">
        <h1 className="p-3">Simple Crud App</h1>
        <Form fetchUsers={fetchUsers} />
        {loading ? (
          <div className="min-h-[50vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <Table users={users} fetchUsers={fetchUsers}/>
        )}
      </div>
    </>
  );
}
