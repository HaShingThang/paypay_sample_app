import express from "express";
import { createCake, getCakes } from "../controllers/CakeController";

const router = express.Router();

/// get cakes
router.route("/cakes").get(getCakes);

/// create cakes
router.route('/cakes').post(createCake)

export default router;
