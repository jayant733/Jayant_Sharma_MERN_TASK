import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Parser } from "json2csv";
import { RequestWithId } from "../types/express";


import { IApiResponse } from "../types/apiResponse";
import { IUser } from "../interfaces/user.interface";

export const createUser = asyncHandler(
  async (req: Request, res: Response<IApiResponse<IUser>>) => {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);

export const getUsers = asyncHandler(
  async (
    req: Request,
    res: Response<IApiResponse<IUser[]>>
  ) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const { users, total } = await userService.getUsers(
      page,
      limit,
      search
    );

    return res.json({
      success: true,
      data: users,
      meta: {
        total,
        page,
        limit,
      },
    });
  }
);


export const getUserById = asyncHandler(
  async (
    req: Request<{ id: string }>,
    res: Response<IApiResponse<IUser>>
  ) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  }
);

export const updateUser = asyncHandler<
  { id: string },
  IApiResponse<IUser>
>(async (req, res) => {
  const updatedUser = await userService.updateUser(
    req.params.id,
    req.body
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

export const deleteUser = asyncHandler<
  { id: string },
  IApiResponse<null>
>(async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.id);

  if (!deletedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json({
    success: true,
    message: "User deleted successfully",
    data: null,
  });
});




export const exportUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  const parser = new Parser({
    fields: [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "gender",
      "status",
      "location",
    ],
  });

  const csv = parser.parse(users);

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");

  return res.send(csv);
});
