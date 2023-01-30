import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import auth from './routes/auth.js'
import privateRoute from './routes/private.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import morgan from 'morgan'

dotenv.config()

// connect DB
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//  Defind body req from  api
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/products', productRoutes)
app.use('/api/auth', auth)
app.use('/api/private', privateRoute)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//error handler (should be last piece of middleware)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`logged error: ${err}`)
})
