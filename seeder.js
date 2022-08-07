const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
require('dotenv').config()

// Load models
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    console.log('Data Imported...'.green)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    console.log('Data Destroyed...'.green)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Hard reset
const resetData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    console.log('Data Destroyed...'.green)

    await Bootcamp.create(bootcamps)
    await Course.create(courses)
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