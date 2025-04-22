import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { sendrole } from "../controllers/sendrole.js";
import {
    handleLogin,
    handleRegister,
} from "../controllers/authControllers.js";

const router = Router();

router.route("/login").post(handleLogin);
router.route("/register").post(handleRegister);
router.route("/me").get(verifyJWT, sendrole);


export default router;
