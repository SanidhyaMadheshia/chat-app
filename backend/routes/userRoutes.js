import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserSidebar } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, getUserSidebar);
export default router;