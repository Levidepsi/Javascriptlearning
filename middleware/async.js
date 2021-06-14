const asyncHandler = fn => (req, res, nex) => 
    Promise.resolve(fn(req, res, next)).catch(next)

    module.exports = asynchandler