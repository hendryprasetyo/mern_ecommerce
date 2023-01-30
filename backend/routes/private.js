import express from 'express'
import {
  getPrivateData,
  getUserProfile,
  updateUserProfile,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getUsers,
  deleteUsers,
  updateUser,
  getUserById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToSuccess,
} from '../controllers/private.js'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(protect, getPrivateData)
router.route('/users').get(protect, admin, getUsers)
router
  .route('/users/:id')
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router.route('/myorders').get(protect, getMyOrders)
router
  .route('/orders')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders)
router.route('/orders/:id').get(protect, getOrderById)
router.route('/orders/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id').get(protect, getUserProfile)
router.route('/orders/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/orders/:id/success').put(protect, admin, updateOrderToSuccess)
router.route('/profile').put(protect, updateUserProfile)

export default router
