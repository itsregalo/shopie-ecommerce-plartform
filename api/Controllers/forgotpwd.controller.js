const mssql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const nodemailer = require('nodemailer');
const { emailConfig } = require('../Config/email.config.js');
const { sqlConfig } = require('../Config/Config.js');
const { createToken } = require('../utilis/token.gen.js');

// Function to get user by email from the database
const getUserByEmail = async (email) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', email)
            .execute('fetchUserByEmailPROC');
        
        return result.recordset[0]; // Return user object or null if not found
    } catch (error) {
        throw error;
    }
};

// POST /users/forgot-password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Please input your email' });
        }

        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(400).json({ error: 'Email not found' });
        }

        // Generate a dedicated reset token
        const resetToken = createToken({ email }, '1d'); // Set expiration (e.g., 1 day)

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: false, // Use TLS
            auth: {
                user: emailConfig.auth.user,
                pass: emailConfig.auth.pass
            }
        });

        const mailOptions = {
            from: emailConfig.auth.user, // Sender's email
            to: email, // User's email
            subject: 'Reset Password', // Email subject
            html: `<h1>Shopie Ecommerce</h1>
            <h2>Click on the link below to reset your password</h2>
                   <p><a href="http://localhost:8005/client/Auth/resetpassword.html/${resetToken}">Reset Password</a></p>` // Reset password link
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error, ${error.message}` });
    }
};

// POST /users/reset-password
const resetPassword = async (req, res) => {
    try {
        const { resetToken, password } = req.body;

        if (!resetToken || !password) {
            return res.status(400).json({ error: 'Please provide reset token and new password' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', decodedToken.email)
            .input('password', hashedPassword)
            .execute('resetPasswordPROC'); 
        
        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'Password reset successful' });
        } else {
            return res.status(400).json({ error: 'Password reset failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error, ${error.message}` });
    }
};

module.exports = {
    forgotPassword,
    resetPassword
};