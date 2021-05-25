// @access Get all bootcamps
// @route  Get /api/v1/bootcamps
// @access Public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps'})
}

// @access Get single bootcamps
// @route  Get /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `show bootcamps ${req.params.id}`})
}

// @access Create all bootcamps
// @route  POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'create new bootcamps'})
}

// @access Update all bootcamps
// @route  Put /api/v1/bootcamps
// @access Private

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update bootcamps${req.params.id}`})
}

// @access Delete all bootcamps
// @route  Delete /api/v1/bootcamps
// @access Private

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete bootcamps${req.params.id}`})
}

module.exports