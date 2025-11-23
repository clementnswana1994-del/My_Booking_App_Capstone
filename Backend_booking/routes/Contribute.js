import express from "express";
import { contributePostController } from "../controllers/Contribute.js";

const app = express();

app.post("/contribute-post", contributePostController);

export default app;