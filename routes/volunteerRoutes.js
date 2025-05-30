import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { donate } from "../controllers/donate.js";
import { getactivities } from "../controllers/activities.js";


const router = Router();

router.route("/donate").post(verifyJWT, donate);
router.route("/activities").get(verifyJWT, getactivities);


export default router;