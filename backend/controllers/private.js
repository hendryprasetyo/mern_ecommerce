import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Create new order
// @route   POST /api/private/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingProcess,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingProcess,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createOrder = await order.save()

    res.status(201).json(createOrder)
  }
})
// @desc    Get order by ID
// @route   GET /api/private/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    return next(new ErrorResponse('Order not found'))
  }
})

// @desc    Update order to paid
// @route   PUT /api/private/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    return next(ErrorResponse('Order not found'))
  }
})

// @desc    Get all orders
// @route   GET /api/private/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc    Update order to delivered
// @route   GET /api/private/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isProcess = true
    order.processAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    return next(ErrorResponse('Order not found'))
  }
})

// @desc    Update order to delivered
// @route   GET /api/private/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToSuccess = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.statusProcess = true
    order.processAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    return next(ErrorResponse('Order not found'))
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export const getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'you got access to the private data in this route',
  })
}

export const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(201).json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    return next(new ErrorResponse('User not found'))
  }
}

export const updateUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()

    res.status(201).json({
      success: true,
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
}

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({})
  res.json(users)
})

export const deleteUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findById(req.params.id)

  if (users) {
    await users.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    return next(new ErrorResponse('User not Found'))
  }
})

export const getUserById = asyncHandler(async (req, res, next) => {
  const users = await User.findById(req.params.id).select('-password')

  if (users) {
    res.json(users)
  } else {
    res.status(404)
    return next(new ErrorResponse('User not Found'))
  }
})

export const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin
    const updateUser = await user.save()

    res.status(201).json({
      success: true,
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    })
  }
}
