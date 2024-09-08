import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = Router();
// router.use()
router.post("/signup", signup);

router.get("/signin", login);
router.get("/login", logout);


// module.exports=router;
// export default router;
export default router;