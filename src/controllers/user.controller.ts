import { Request, Response } from 'express';
import { UserServices } from '../services/user.service';
import userSchemaValidation, { orderSchema } from '../validations/user.joi.validation';

const hiddenPassword = (user: any) => {
  // return info without password
  const result: any = {
    userId: user.userId,
    username: user.username,
    fullName: user.fullName,
    age: user.age,
    email: user.email,
    isActive: user.isActive,
    hobbies: user.hobbies,
    address: user.address,
  };

  // if user has orders
  if (user.orders.length > 0) {
    result.orders = user.orders;
  }

  return result;
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = userSchemaValidation.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);  // error.details[0].message is the error message
    }

    const result = await UserServices.createUser(value);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: hiddenPassword(result),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error
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
      message: error.message || 'Something went wrong!',
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
      data: hiddenPassword(result),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.updateUserById(parseInt(userId), req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: hiddenPassword(result),
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: "User not found!"
      }
    });
  }
}

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await UserServices.deleteUserById(parseInt(userId));

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    });
  }
};


const addProductToOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const { error, value } = orderSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const result = await UserServices.addProductToOrders(parseInt(userId), value);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    });
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getAllOrders(parseInt(userId));

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: { orders: result }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    });
  }
}

const totalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.totalPriceOfOrders(parseInt(userId));

    // sum of prices
    let sum = 0
    for (let i = 0; i < result.length; i++) {
      sum += result[i].price;  // add price of each product
    }

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        "totalPrice": sum.toFixed(2)   // round to 2 decimal places
      }
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!"
      }
    });
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addProductToOrders,
  getAllOrders,
  totalPriceOfOrders
};
