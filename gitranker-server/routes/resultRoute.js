import express from "express";
import { getResult } from "../controllers/resultController.js";

const router = express.Router();

router.get("/:username",getResult);

export default router