import expres from "express";
import { analyzeGithubProfile } from "../controllers/analyzeController.js";

const router = expres.Router();

router.post("/",analyzeGithubProfile);


export default router;