
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  
    }
});

const sendReportLink = async (parentEmail, studentName, dynamicUrl) => {
    try {
        const info = await transporter.sendMail({
            from: `"University Admin" <${process.env.EMAIL_USER}>`,
            to: parentEmail,
            subject: `Academic Update for ${studentName}`,
            text: `Dear Parent,\n\nA new semester report is available for ${studentName}.\nView it here: ${dynamicUrl}`,
            html: `
                <h3>Academic Update</h3>
                <p>Dear Parent,</p>
                <p>A new semester report is available for <b>${studentName}</b>.</p>
                <a href="${dynamicUrl}" style="padding: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">View Report</a>
            `
        });
        console.log(`Email sent to ${parentEmail}`);
        return true;
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
};

module.exports = { sendReportLink };