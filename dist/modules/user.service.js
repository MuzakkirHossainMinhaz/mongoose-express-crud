"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error("User already exists!");
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // return only username, fullName, age, email, address
    const result = yield user_model_1.User.find().select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    if (!result) {
        throw new Error("User not found");
    }
    return result;
});
const updateUserById = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userId);
    if (!user) {
        throw new Error("User not found");
    }
    yield user_model_1.User.updateOne({ userId }, userData);
    const result = yield user_model_1.User.findOne({ userId });
    return result;
});
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
const addProductToOrders = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.updateOne({ userId }, { $push: { orders: product } }); // add product to orders
    return result;
});
const getAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.find({ userId }).select({ orders: 1 });
    return result[0].orders; // return orders only
});
const totalPriceOfOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.aggregate([
        { $match: { userId } },
        { $project: { orders: 1 } },
    ]);
    if (!result.length) {
        return 0;
    }
    const products = result[0].orders;
    // sum of prices of all products
    let sum = 0;
    for (const product of products) {
        sum += product.price * product.quantity;
    }
    return sum.toFixed(2); // return rounded to 2 decimal places
});
exports.UserServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addProductToOrders,
    getAllOrders,
    totalPriceOfOrders,
};
