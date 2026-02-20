import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser, exportUsers } from "../api/user.api";
import type { User } from "../types/user";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";

export default function UserListPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const loadUsers = async () => {
    try {
      const res = await fetchUsers(page, limit, search);
      setUsers(res.data || []);
      setTotal(res.meta?.total || 0);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportUsers();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
      a.click();
    } catch {
      toast.error("Export failed");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-slate-800">
          User Management
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/users/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaPlus /> Add User
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-left">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.gender}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/users/view/${user._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => navigate(`/users/edit/${user._id}`)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
}
