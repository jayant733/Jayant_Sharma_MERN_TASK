import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: "Male" | "Female";
  status: "Active" | "Inactive";
  location: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
