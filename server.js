require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')

// Connect to database
connectDB()

// Middleware

// Route files
const bootcamps = require('./routes/bootcamps')

const app = express()
const PORT = process.env.PORT

// Mount middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

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

