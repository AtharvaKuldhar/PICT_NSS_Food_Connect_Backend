import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { getvolunteers } from "../controllers/volunteers.js";
import { approve } from "../controllers/approve.js";
import { getdonations } from "../controllers/donations.js";

const router = Router();

router.route("/volunteers").get(verifyJWT, getvolunteers);
router.route("/approve").post(verifyJWT, approve);
router.route("/donations").get(verifyJWT,getdonations);

export default router;
