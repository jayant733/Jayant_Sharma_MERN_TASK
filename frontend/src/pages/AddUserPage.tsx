import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { createUser } from "../api/user.api";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await createUser(data);
      toast.success("User created successfully");
      navigate("/");
    } catch {
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Add User
      </h1>

      <UserForm onSubmit={handleSubmit} isLoading={loading} />
    </MainLayout>
  );
}
