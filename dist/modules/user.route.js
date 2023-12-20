"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// user management routes
router.post("/api/users", user_controller_1.UserControllers.createUser);
router.get("/api/users", user_controller_1.UserControllers.getAllUsers);
router.get("/api/users/:userId", user_controller_1.UserControllers.getUserById);
router.put("/api/users/:userId", user_controller_1.UserControllers.updateUserById);
router.delete("/api/users/:userId", user_controller_1.UserControllers.deleteUserById);
// order management routes
router.put("/api/users/:userId/orders", user_controller_1.UserControllers.addProductToOrders);
router.get("/api/users/:userId/orders", user_controller_1.UserControllers.getAllOrders);
router.get("/api/users/:userId/orders/total-price", user_controller_1.UserControllers.totalPriceOfOrders);
exports.UserRoutes = router;
