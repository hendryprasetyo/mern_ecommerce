import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import ErrorResponse from '../utils/errorResponse.js'

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      return next(new ErrorResponse('Not authorized, token failed'))
    }
  }

  if (!token) {
    res.status(401)
    return next(new ErrorResponse('Not authorized, Not token'))
  }
}
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    return next(new ErrorResponse('Not authorized as an admin'))
  }
}
