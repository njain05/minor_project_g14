require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});