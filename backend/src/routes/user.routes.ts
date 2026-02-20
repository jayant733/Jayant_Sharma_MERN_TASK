import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "../dtos/user.dto";

const router = Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/", userController.getUsers);
router.get("/export", userController.exportUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
