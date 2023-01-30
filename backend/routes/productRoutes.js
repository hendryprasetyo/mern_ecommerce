import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductsById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getCategory,
} from '../controllers/productControler.js'
import { protect, admin } from '../middleware/auth.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)

router.get('/top', getTopProducts)

router.get('/category/:category', getCategory)

router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
