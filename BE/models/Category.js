const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    alias: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = Category = mongoose.model('category', CategorySchema);