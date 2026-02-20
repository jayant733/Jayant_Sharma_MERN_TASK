import api from "./axios";
import type { ApiResponse } from "../types/api";
import type { User } from "../types/user";

// GET USERS
export const fetchUsers = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await api.get<ApiResponse<User[]>>(
    `/users?page=${page}&limit=${limit}&search=${search}`
  );

  return response.data;
};

// GET USER BY ID
export const fetchUserById = async (id: string) => {
  const response = await api.get<ApiResponse<User>>(
    `/users/${id}`
  );
  return response.data;
};

// CREATE USER
export const createUser = async (data: Partial<User>) => {
  const response = await api.post<ApiResponse<User>>(
    "/users",
    data
  );
  return response.data;
};

// UPDATE USER
export const updateUser = async (
  id: string,
  data: Partial<User>
) => {
  const response = await api.put<ApiResponse<User>>(
    `/users/${id}`,
    data
  );
  return response.data;
};

// DELETE USER
export const deleteUser = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(
    `/users/${id}`
  );
  return response.data;
};

// EXPORT USERS
export const exportUsers = async () => {
  const response = await api.get("/users/export", {
    responseType: "blob",
  });
  return response.data;
};
