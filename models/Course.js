const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({ 
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },

    description: {
        type: string,
        required: [true, 'Please add a description']
    },

    weeks: {
        type: string,
        required: [true, 'Please add number of weeks']
    },

    tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost']
    },

    minimunSkill: {
        type: string,
        required: [true, 'Please add minimum skill'],
        enum: ['beginner', 'intermediate', 'advance']
    },

    scholarshipavailable: {
        type: Boolean,
       default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref:  'Bootcamp',
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema)