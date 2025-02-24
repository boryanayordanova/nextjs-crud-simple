import { toast } from "react-toastify";
export default function Table({ users, fetchUsers }) {
  const deleteUser = async (_id) => {
    console.log(_id);
    try {
      const response = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ _id }),
      });

      if (response.ok) {
        console.log("User deleted successfully");
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        console.log("Error deleting user");
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const editUser = (user) => {
    console.log(user);
  };

  return (
    <>
      <div className="table container mx-auto my-10 ">
        <table className="w-full ">
          <thead>
            <tr className="bg-pink-500">
              <th className="border border-gray-300">ID</th>
              <th className="border border-gray-300">Name</th>
              <th className="border border-gray-300">Email</th>
              <th className="border border-gray-300">Options</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice()
              .reverse()
              .map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td className="px-8 py-2 flex justify-evenly hover:cursor-pointer">
                    <button
                      className="bg-green-500 border rounded-md w-1/3 text-white"
                      onClick={() => editUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 border rounded-md w-1/3 text-white"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {/* <tr className="bg-pink-200">
              <td className="border border-gray-300">data1</td>
              <td className="border border-gray-300">data2</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
