const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const { Query } = require('mongoose')
exports.getBootcamps = asyncHandler ( async (req, res, next) => {
    let query;

    const  reqQuery = {...req.query};

    let queryStr = JSON.stringify(req.query);

    const removeFields = ['select'];

    removeFields.forEach(param => delete reqQuery[param])

    Query = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

     

    query = Bootcamp.find(JSON.parse(queryStr))

    if (req.query.select) {
      
    }
       const bootcamps = await query;


       res.status(200).json({ success: true, data: bootcamps})


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
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
           
           if (!bootcamp) {
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
           }
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