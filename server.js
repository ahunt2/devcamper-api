require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const color = require('colors')
const fileupload = require('express-fileupload')
const connectDB = require('./config/db')

// Connect to database
connectDB()

// Middleware
const errorHandler = require('./middleware/error')

// Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express()
app.use(express.json())
const PORT = process.env.PORT

// Mount middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})

// Handle unhandles promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold)
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})

