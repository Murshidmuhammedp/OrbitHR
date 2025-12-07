import { Router } from "express"
import { createHR } from "../controllers/superAdminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roles";


const router = Router();

router.post("/hr", authMiddleware, requireRole("superadmin"), createHR);

export default router;