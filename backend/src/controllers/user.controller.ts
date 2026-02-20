import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Parser } from "json2csv";
import { RequestWithId } from "../types/express";


export const createUser = asyncHandler(
   async (req: RequestWithId, res: Response) =>{
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);

export const getUsers = asyncHandler(
  async (req: RequestWithId, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const { users, total } = await userService.getUsers(
      page,
      limit,
      search
    );

    res.json({
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
 async (req: RequestWithId, res: Response) =>
{
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  }
);

export const updateUser = asyncHandler(
 async (req: RequestWithId, res: Response) => {
    const user = await userService.updateUser(req.params.id, req.body);

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  }
);

export const deleteUser = asyncHandler(
  async (req: RequestWithId, res: Response) =>
 {
    await userService.deleteUser(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  }
);

export const exportUsers = asyncHandler(
   async (req: RequestWithId, res: Response) =>
     {
    const users = await userService.getAllUsers();

    const parser = new Parser();
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    return res.send(csv);
  }
);
