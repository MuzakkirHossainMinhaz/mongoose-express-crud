"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./modules/user.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/", user_route_1.UserRoutes);
// default route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to The Mongoose Express CRUD Mastery server!",
    });
});
// 404 route
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "404! This Route Not Found.",
    });
});
exports.default = app;
