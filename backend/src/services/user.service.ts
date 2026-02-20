import { User } from "../models/user.models";
import { IUser } from "../interfaces/user.interface";

export const createUser = async (
  data: Partial<IUser>
): Promise<IUser> => {
  return await User.create(data);
};

export const getUsers = async (
  page: number,
  limit: number,
  search?: string
): Promise<{ users: IUser[]; total: number }> => {
  const query: any = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const total = await User.countDocuments(query);

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return { users, total };
};

export const getUserById = async (
  id: string
): Promise<IUser | null> => {
  return await User.findById(id);
};

export const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (
  id: string
): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};
