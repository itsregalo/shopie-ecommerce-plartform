const{forgotPassword} = require('../../Controllers/forgotpwd.controller')
const mssql = require('mssql');
const nodemailer = require('nodemailer');

describe('forgotPwd test', () => {
    it('should fail when the request body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await forgotPassword(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Please input your email'})
    })

    it('should fail when the email is not registered', async () => {
        const req = {
            body: {
                email: 'test@gmail.com'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: []
            })
        })

        await forgotPassword(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Email not found'})
    })

    it('should fail if the email is in the wrong format', async () => {
        const req = {
            body: {
                email: 'test'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: []
            })
        })

        await forgotPassword(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Email not found'})
    })

    it('should send an email successfully if email exists', async () => {
        const email = 'rachaeltems@gmail.com'; // Define the email
        const resetToken = 'your-reset-token'; // Define the reset token
    
        const req = {
            body: {
                email: email,
            },
        };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        const transporter = {
            sendMail: jest.fn().mockImplementationOnce((mailOptions, callback) => {
                callback(null, true);
            }),
            createTransport: jest.fn().mockReturnValue({
                sendMail: jest.fn().mockImplementationOnce((mailOptions, callback) => {
                    callback(null, true);
                }),
            }),
        };
    
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue(transporter);
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{ email: 'rachaeltems@gmail.com' }],
            }),
        });
    
        await forgotPassword(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
       expect(res.json).toHaveBeenCalledWith({ message: 'Email sent successfully' });
    });    
})