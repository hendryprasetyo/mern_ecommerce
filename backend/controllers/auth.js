import User from '../models/userModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
import generateToken from '../utils/generateToken.js'

export const register = async (req, res, next) => {
  const { username, email, password } = req.body

  const usernameExist = await User.findOne({ username })
  if (usernameExist) {
    res.status(409).json({ message: 'Username already exist' })
  }

  const emailExist = await User.findOne({ email })
  if (emailExist) {
    res.status(409).json({ message: 'Email already exist' })
  }
  if (!usernameExist && !emailExist) {
    try {
      const user = await User.create({
        username: username,
        email: email,
        password,
      })

      res.status(201).json({
        success: true,
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } catch (error) {
      return next(
        res
          .status(400)
          .json({ message: 'Enter a password of at least 8 characters' })
      )
    }
  }
}

export const login = async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next(new ErrorResponse('Please provide username and password', 400))
  }

  try {
    const user = await User.findOne({ username }).select('+password')

    if (!user) {
      return next(new ErrorResponse('Username not found', 404))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Password invalid', 401))
    }
    if (user && isMatch) {
      res.status(200).json({
        success: true,
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const forgotpassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(new ErrorResponse('Email could not be sent', 404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this  link  to reset  your password</p>
    <a href=${resetUrl} clicktacking=off>${resetUrl}</a>
    `
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      })

      res.status(200).json({ success: true, data: 'Email sent' })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse('Email could not be send', 500))
    }
  } catch (error) {
    next(error)
  }
}

export const resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return next(new ErrorResponse('Invalid Reset Token', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json({
      success: true,
      data: 'Password reset success',
    })
  } catch (error) {
    next(error)
  }
}
