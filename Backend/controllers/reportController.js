import crypto from 'crypto';
import Report from '../models/report';
const { sendReportLink } = require('../services/emailService');

const notifyParent = async (req, res) => {
    try {
        const { studentName, parentEmail, urn } = req.body;

        const secureToken = crypto.randomBytes(32).toString('hex');
        const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const dynamicUrl = `${frontendBaseUrl}/report/${secureToken}`;

        await Report.create({
            studentName,
            parentEmail,
            urn,
            magicToken: secureToken
        });

        const emailSent = await sendReportLink(parentEmail, studentName, dynamicUrl);

        if (emailSent) {
            return res.status(200).json({ 
                success: true, 
                message: "Email dispatched and report saved", 
                token: secureToken 
            });
        } else {
            return res.status(500).json({ error: "Email service failed to send." });
        }
    } catch (error) {
        console.error("Route Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { notifyParent };