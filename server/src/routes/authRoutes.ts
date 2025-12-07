import { Router } from "express";
import { login, registerSuperAdmin } from "../controllers/authController";


const router = Router();

router.post("/superadmin/register", registerSuperAdmin);

router.post("/login", login);

export default router;