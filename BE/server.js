const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
require('dotenv').config()

const app = express();

// Connect DB
connectDB();
app.use(cors());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Routes Defined
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/interviews', require('./routes/api/interviews'));
app.use('/api/joinees', require('./routes/api/joinees'));
app.use('/api/dashboard', require('./routes/api/dashboard'));

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));