const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Joinee = require("../../models/Joinee");

// @route   DELETE api/joinees
// @desc    Deleting from Joinee list
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Joinee.findByIdAndRemove({ _id: req.params.id });
        res.send(`Deleted ${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

// @route   GET api/joinees
// @desc    Fetch all joinees
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const joinees = await Joinee.find();
        res.status(200).json(joinees);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

// @route   PATCH api/joinees
// @desc    Update a joinee in joinees list
// @access  Private
router.patch('/:id', auth, async (req, res) => {
    const newObj = req.body;
    try {
        const record = await Joinee.findByIdAndUpdate(req.params.id, newObj);
        res.send(`Updated ${record}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

// @route   POST api/joinees
// @desc    Adding to joinees list
// @access  Private
router.post('/', auth, async (req, res) => {
    const {
        candidate_name,
        role_position,
        grade,
        status,
        start_date,
        application_to_resignation,
        application_to_joining,
        open_application,
        date_request_to_resign,
        joining_date,
        salary_offered,
        required_documents,
        initial_offer,
        hrc,
        offical_offer_letter,
        tarasulype,
        medical_assesment,
        adsg,
        reference_check,
        resignation_requested,
        notice_period,
        employment_contract,
        joining_forms,
        new_joiner_checklist,
        new_joiner_bio,
        sector,
        jobcategory,
        joblevel,
        year
    } = req.body;

    try {
        const joinee = new Joinee({
            candidate_name: candidate_name ? candidate_name : null,
            role_position: role_position ? role_position : null,
            grade: grade ? grade : null,
            status: status ? status : null,
            start_date: start_date ? start_date : null,
            application_to_resignation: application_to_resignation ? application_to_resignation : null,
            application_to_joining: application_to_joining ? application_to_joining : null,
            open_application: open_application ? open_application : null,
            date_request_to_resign: date_request_to_resign ? date_request_to_resign : null,
            joining_date: joining_date ? joining_date : null,
            salary_offered: salary_offered ? salary_offered : null,
            required_documents: required_documents ? required_documents : null,
            initial_offer: initial_offer ? initial_offer : null,
            hrc: hrc ? hrc : null,
            offical_offer_letter: offical_offer_letter ? offical_offer_letter : null,
            tarasulype: tarasulype ? tarasulype : null,
            medical_assesment: medical_assesment ? medical_assesment : null,
            adsg: adsg ? adsg : null,
            reference_check: reference_check ? reference_check : null,
            resignation_requested: resignation_requested ? resignation_requested : null,
            notice_period: notice_period ? notice_period : null,
            employment_contract: employment_contract ? employment_contract : null,
            joining_forms: joining_forms ? joining_forms : null,
            new_joiner_checklist: new_joiner_checklist ? new_joiner_checklist : null,
            new_joiner_bio: new_joiner_bio ? new_joiner_bio : null,
            sector: sector ? sector : null,
            jobcategory: jobcategory ? jobcategory : null,
            joblevel: joblevel ? joblevel : null,
            year: year ? year : null
        });
        await joinee.save();
        return res.status(200).send("Joinee Record Inserted");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error Occurred");
    }
});

module.exports = router;