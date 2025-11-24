import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
// import { getUsersForSlidebar,sendMessage } from "../controllers/message.controller.js";
import { getUsersForSlidebar, sendMessage, getMessages } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users",protectRoute,getUsersForSlidebar);
router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);

export default router;