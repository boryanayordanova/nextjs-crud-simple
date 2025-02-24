"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Form({ fetchUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(name, email);
    if (name == "" || email == "") {
      toast.error("Please fill all the fields");
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const res = await response.json();
        console.log("res", res);
        toast.success("User created successfully");
        fetchUsers(); // Refresh users after adding
        clearForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
  };

  return (
    <div className="bg-pink-200 px-2 py-2">
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="m-1 p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="m-1 p-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-pink-500 border rounded-md p-1 m-1 hover:bg-purple-500 w-32">
          Submit
        </button>
      </form>
    </div>
  );
}
