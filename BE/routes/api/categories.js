const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Category = require("../../models/Category");

// @route   POST api/categories
// @desc    Adding to category list
// @access  Private
router.post('/', auth, async (req, res) => {
    const { category, value, addedBy } = req.body;
    const alias = category.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    try {
        let cate = new Category({
            alias,
            category,
            value,
            addedBy
        });
        await cate.save();
        return res.status(200).send("Category Added");
    } catch (error) {
        return res.status(500).send("Error Occurred");
    }
});

// @route   DELETE api/categories
// @desc    Deleting from category list
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Category.findByIdAndRemove({ _id: req.params.id });
        res.send(`Deleted ${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

// @route   GET api/categories
// @desc    Fetch all categories
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
})

// @route   GET api/categories/:category
// @desc    Fetch all records corresponding to one category
// @access  Private
router.get('/:alias', auth, async (req, res) => {
    try {
        const alias = req.params.alias;
        const categories = await Category.find({ alias }).sort({'createdAt': 'desc'});
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
})

// @route   PATCH api/categories
// @desc    Update a category in category list
// @access  Private
router.patch('/:id', auth, async (req, res) => {
    const newVal = req.body.value;
    try {
        const record = await Category.findByIdAndUpdate( req.params.id, { value: newVal } );
        res.send(`Updated ${record}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occurred");
    }
});

module.exports = router;