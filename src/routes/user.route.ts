import express from 'express';
import { UserControllers } from '../controllers/user.controller';

const router = express.Router();

router.post('/api/users', UserControllers.createUser);
router.get('/api/users', UserControllers.getAllUsers);
router.get('/api/users/:userId', UserControllers.getUserById);
router.put('/api/users/:userId', UserControllers.updateUserById);
router.delete('/api/users/:userId', UserControllers.deleteUserById);

router.put('/api/users/:userId/orders', UserControllers.addProductToOrders);
router.get('/api/users/:userId/orders', UserControllers.getAllOrders);
router.get('/api/users/:userId/orders/total-price', UserControllers.totalPriceOfOrders);

export const UserRoutes = router;
