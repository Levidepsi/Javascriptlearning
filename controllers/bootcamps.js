const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const { Query } = require('mongoose')
exports.getBootcamps = asyncHandler ( async (req, res, next) => {
let query;

const  reqQuery = {...req.query};

let queryStr = JSON.stringify(req.query);

const removeFields = ['select', 'sort', 'page', 'limit'];

removeFields.forEach(param => delete reqQuery[param])

// Create operators ( )
Query = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  
// Finding Resource
query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

// Select Fields
if (req.query.select) {
  const fields = req.query.select.split(',').join(' ');
  query = query.select(fields)
}

// Sort
if (req.query.sort) {
  const sortBy = req.query.sort.split(',').join(' ')
  query = query.sort(sortBy)
} else {
  query = query.sort('-createdAt')
}

// Pagination
  const page = parseInt(req.query.page, 10 || 1)
  const limit = parseInt(req.query.limit, 10 || 100)
  const skip = (page - 1 ) * limit;
  const startindex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments

  query = query.skip(skip).limit(limit)


    const bootcamps = await query;

// pagination result
const pagination = {}


if (endIndex < total) {
  pagination.next = {
    page: page + 1,
    limit
  }
}

if (startIndex > 0) {
  pagination.prev = {
    page: page - 1,
    limit
  }
}
  res.status(200).json({
    success: true, 
    count:bootcamps.length, 
    pagination: pagination, 
    data: bootcamps
  })
})

// @access Get single bootcamps
// @route  Get /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = asyncHandler ( async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
}

  res.status(200).json({success: true, data: bootcamp})


})

// @access Create all bootcamps
// @route  POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = asyncHandler (async (req, res, next) => {

  const bootcamp = await Bootcamp.create(req.body)

  res.status(200).json({
      success: true,
      data: bootcamp 
})
   
})

// @access Update all bootcamps
// @route  Put /api/v1/bootcamps
// @access Private

exports.updateBootcamp = asyncHandler ( async (req, res, next) => {

  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
      })
      
      if (!bootcamp) {
      return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
      }
      res.status(200).json({ success: true, data: bootcamp });
}); 

// @access Delete all bootcamps
// @route  Delete /api/v1/bootcamps
// @access Private

exports.deleteBootcamp = asyncHandler (async (req, res, next) => {
const bootcamp = await Bootcamp.findById(req.params.id)
    
    if (!bootcamp) {
    return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    bootcamp.remove()
    res.status(200).json({ success: true, data: {} });

})

exports.getBootcampsInRadius = asyncHandler (async (req, res, next) => {
  const { zipcode, distance } = req.params;

// Get lat/long from geocoder
const loc = await geocoder.geocode(zipcode);
const lat = loc[0].latitude;
const lng = loc[0].longitude;

// cal radius using radinas
// Divide dist by radius of Earth
//  Earth radius  = 3,963 mi / 6,378 km
const radius = distance / 3963

const boocamps = await Bootcamp.find ({
  location: { $geoWithin: {$ceterSphere: [[lng, lat],  radius]}}
})

res.status(200).json({
  success: true,
  count: bootcamps.length,
  data: bootcamps
})

})