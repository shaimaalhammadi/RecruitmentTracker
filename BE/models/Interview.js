const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
    agency: {
        type: String,
    },
    name: {
        type: String,
    },
    first_interview_date: {
        type: String,
        required: false
    },
    second_interview_date: {
        type: String,
        required: false
    },
    candidate_status: {
        type: String,
    },
    recruiter: {
        type: String,
    },
    job_title_arabic: {
        type: String,
    },
    job_title_english: {
        type: String,
    },
    sector: {
        type: String,
    },
    division: {
        type: String,
    },
    jobcategory: {
        type: String,
    },
    joblevel: {
        type: String,
    },
    section: {
        type: String,
    },
    comments: {
        type: String,
    },
    year: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = Interview = mongoose.model('interview', InterviewSchema);

