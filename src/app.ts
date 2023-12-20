import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/user.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/", UserRoutes);

// default route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to The Mongoose Express CRUD Mastery server!",
    });
});

// 404 route
app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "404! This Route Not Found.",
    });
});

export default app;
