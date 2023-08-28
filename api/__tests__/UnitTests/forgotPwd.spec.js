const{forgotPassword} = require('../../Controllers/forgotpwd.controller')
const mssql = require('mssql');

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

        it('should send an email successfully if email exist', async () => {

            const req = {
                body: {
                    email: 'rachaeltems@gmail.com'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const transporter = {
                sendMail: jest.fn().mockImplementationOnce((mailOptions, callback) => {
                    callback(null, true),
                    expect(mailOptions.from).toEqual(emailConfig.auth.user),
                    expect(mailOptions.to).toEqual(email),
                    expect(mailOptions.subject).toEqual('Reset Password'),
                    expect(mailOptions.html).toEqual(`<h1>Shopie Ecommerce</h1>
                    <h2>Copy this token to reset your password</h2>
                           <p>${resetToken}</p>`)
                }),
                createTransport: jest.fn().mockReturnValue({
                    sendMail: jest.fn().mockImplementationOnce((mailOptions, callback) => {
                        expect(mailOptions.from).toEqual(emailConfig.auth.user),
                    expect(mailOptions.to).toEqual(email),
                    expect(mailOptions.subject).toEqual('Reset Password'),
                    expect(mailOptions.html).toEqual(`<h1>Shopie Ecommerce</h1>
                    <h2>Copy this token to reset your password</h2>
                           <p>${resetToken}</p>`)
                    })
                })
            }
            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [{
                        email: 'rachaeltems@gmail.com'
                    }]
                })
            })

            await forgotPassword(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
})
})