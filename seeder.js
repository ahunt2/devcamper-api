const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
require('dotenv').config()

// Load models
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')
const User = require('./models/User')
const Review = require('./models/Review')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'))

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await Review.create(reviews)
    console.log('Data Imported...'.green)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany()
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await Review.deleteMany()
    console.log('Data Destroyed...'.green)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Hard reset
const resetData = async () => {
  try {
    await User.deleteMany()
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await Review.deleteMany()
    console.log('Data Destroyed...'.green)

    await User.create(users)
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await Review.create(reviews)
    console.log('Data Imported...'.green)

    console.log('Data reset'.green)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if(process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
} else if (process.argv[2] === '-r') {
  resetData()
}