import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { fetchUserById, updateUser } from "../api/user.api";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchUserById(id).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await updateUser(id!, data);
      toast.success("User updated successfully");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <MainLayout>Loading...</MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Edit User
      </h1>

      <UserForm
        defaultValues={user}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </MainLayout>
  );
}
