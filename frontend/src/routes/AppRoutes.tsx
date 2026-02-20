import { createBrowserRouter } from "react-router-dom";
import UserListPage from "../pages/UserListPage"
import AddUserPage from "../pages/AddUserPage";
import EditUserPage from "../pages/EditUserPage";
import ViewUserPage from "../pages/ViewUserPage";

export const router = createBrowserRouter([
  { path: "/", element: <UserListPage /> },
  { path: "/users/add", element: <AddUserPage /> },
  { path: "/users/edit/:id", element: <EditUserPage /> },
  { path: "/users/view/:id", element: <ViewUserPage /> },
]);
