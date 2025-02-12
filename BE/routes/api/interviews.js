const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Interview = require("../../models/Interview");

// @route   POST api/interviews
// @desc    Adding to interview list
// @access  Private
router.post('/', auth, async (req, res) => {
    const {
        agency,
        name,
        first_interview_date,
        second_interview_date,
        candidate_status,
        recruiter,
        job_title_arabic,
        job_title_english,
        sector,
        division,
        jobcategory,
        joblevel,
        section,
        comments,
        year
    } = req.body;
    try {
        const interview = new Interview({
            agency: agency ? agency : null,
            name: name ? name : null,
            first_interview_date: first_interview_date ? first_interview_date : null,
            second_interview_date: second_interview_date ? second_interview_date : null,
            candidate_status: candidate_status ? candidate_status : null,
            recruiter: recruiter ? recruiter : null,
            job_title_arabic: job_title_arabic ? job_title_arabic : null,
            job_title_english: job_title_english ? job_title_english : null,
            sector: sector ? sector : null,
            division: division ? division : null,
            jobcategory: jobcategory ? jobcategory : null,
            joblevel: joblevel ? joblevel : null,
            section: section ? section : null,
            comments: comments ? comments : null,
            year: year ? year : null
        });
        await interview.save();
        return res.status(200).send("Interview Record Inserted");
    } catch (error) {
        return res.status(500).send("Error Occurred");
    }
});

// @route   DELETE api/interviews
// @desc    Deleting from Interview list
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Interview.findByIdAndRemove({ _id: req.params.id });
        res.send(`Deleted ${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

// @route   GET api/interviews
// @desc    Fetch all interviews
// @access  Private
router.get('/', async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json(interviews);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
})

// @route   PATCH api/interviews
// @desc    Update a interview in interviews list
// @access  Private
router.patch('/:id', auth, async (req, res) => {
    const newObj = req.body;
    try {
        const record = await Interview.findByIdAndUpdate( req.params.id, newObj );
        res.send(`Updated ${record}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

module.exports = router; 