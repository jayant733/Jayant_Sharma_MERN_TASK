export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: "Male" | "Female";
  status: "Active" | "Inactive";
  location: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}
