const Course = require('../models/Course')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

    // @access Get Courses
// @route  Get /api/v1/courses
// @route  Get /api/v1/bootcamps/:bootcampId/courses
// @access Public

exports.getCourses = asynchandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        })
    }

    const courses = await query;

    res.status(200).json({
        success:true,
        count: courses.length,
        data: courses
    })
})

 // @access Get single Course
// @route  Get /api/v1/course/:id   
// @access Public

exports.getCourse = asynchandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if(!course) {
        return next (
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        )
    }
    res.status(200).json({
        success:true,
        data: course
    })
})