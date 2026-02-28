require('dotenv').config();
const express = require('express');
const crypto = require('crypto'); 
const { sendReportLink } = require('./emailService');

const app = express();
const PORT = 3000;

app.use(express.json());

const authenticateMainServer = (req, res, next) => {
    const providedSecret = req.headers['verification-key'];
    
    if (providedSecret !== process.env.INTERNAL_SERVER_KEY) {
        console.warn(`Unauthorized access attempt from IP: ${req.ip}`);
        return res.status(403).json({ error: "Access Denied: Invalid Key" }); 
    }
    
    next(); 
};

app.post('/api/notify-parent', authenticateMainServer, async (req, res) => {
    try {
        const { studentName, parentEmail } = req.body;

        const secureToken = crypto.randomBytes(32).toString('hex');
        
        const frontendBaseUrl = 'http://localhost:5173';
        const dynamicUrl = `${frontendBaseUrl}/reports/verify?token=${secureToken}`;

        const emailSent = await sendReportLink(parentEmail, studentName, dynamicUrl);

        if (emailSent) {
            return res.status(200).json({ 
                success: true, 
                message: "Email dispatched", 
                token: secureToken 
            });
        } else {
            return res.status(500).json({ error: "Email service failed to send." });
        }
    } catch (error) {
        console.error("Route Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Notification Microservice ready on port ${PORT}`);
});