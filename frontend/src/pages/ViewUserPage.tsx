import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../api/user.api";
import type { User } from "../types/user";
import MainLayout from "../layouts/MainLayout";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

export default function ViewUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchUserById(id).then((res) => {
      setUser(res.data || null);
    });
  }, [id]);

  if (!user)
    return (
      <MainLayout>
        <p className="text-slate-700">Loading user...</p>
      </MainLayout>
    );

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          User Details
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <FaArrowLeft /> Back
          </button>

          <button
            onClick={() => navigate(`/users/edit/${user._id}`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaEdit /> Edit
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/50">

        {/* Name Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-slate-500">{user.email}</p>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              user.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          <Detail label="Mobile" value={user.mobile} />
          <Detail label="Gender" value={user.gender} />
          <Detail label="Location" value={user.location} />
          <Detail
            label="Created At"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
          <Detail
            label="Updated At"
            value={new Date(user.updatedAt).toLocaleDateString()}
          />

        </div>
      </div>
    </MainLayout>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/40 p-4 rounded-xl border border-white/40 shadow-sm">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-lg font-medium text-slate-800">{value}</p>
    </div>
  );
}
