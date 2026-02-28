const express = require('express');
const router = express.Router();
const { notifyParent } = require('../controllers/reportController');

const authenticateMainServer = (req, res, next) => {
    const providedSecret = req.headers['verification-key'];
    
    // ADD THESE TWO LINES:
    console.log("1. Header received from Thunder Client:", providedSecret);
    console.log("2. Secret from .env file:", process.env.INTERNAL_SERVER_KEY);
    
    if (providedSecret !== process.env.INTERNAL_SERVER_KEY) {
        return res.status(403).json({ error: "Access Denied: Invalid Key" }); 
    }
    next(); 
};

router.post('/notify-parent', authenticateMainServer, notifyParent);

module.exports = router;