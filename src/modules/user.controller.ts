/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userSchemaValidation, {
    orderSchemaValidation,
} from "./user.joi-validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const { error, value } = userSchemaValidation.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message); // error.details[0].message is the error message
        }

        const result = await UserServices.createUser(value);

        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error!",
            error: error,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsers();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong!",
            error: error,
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await UserServices.getUserById(parseInt(userId));

        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: `${error.message}!`,
            },
        });
    }
};

const updateUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const { error, value } = userSchemaValidation.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const result = await UserServices.updateUserById(
            parseInt(userId),
            value,
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: `${error.message}!`,
            },
        });
    }
};

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        await UserServices.deleteUserById(parseInt(userId));

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: `${error.message}!`,
            },
        });
    }
};

const addProductToOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const { error, value } = orderSchemaValidation.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        await UserServices.addProductToOrders(parseInt(userId), value);

        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: `${error.message}!`,
            },
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await UserServices.getAllOrders(parseInt(userId));

        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: { orders: result },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: `${error.message}!`,
            },
        });
    }
};

const totalPriceOfOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await UserServices.totalPriceOfOrders(parseInt(userId));

        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice: result,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: `${error.message}!`,
            },
        });
    }
};

export const UserControllers = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addProductToOrders,
    getAllOrders,
    totalPriceOfOrders,
};
