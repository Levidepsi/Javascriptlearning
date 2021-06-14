const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

exports.getBootcamps = asyncHandler ( async (req, res, next) => {
       const bootcamps = await Bootcamp.find()
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