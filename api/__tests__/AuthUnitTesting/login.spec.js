//testing Auth controller
const bcrypt = require("bcryptjs")
const mssql = require("mssql")
const {login} = require("../../Controllers/Auth.controller.js")
const jwt = require("jsonwebtoken")


describe('login test', () => {
    it('should fail when the request body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await login(req, res)

        // expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'email filled is required'})
    }),

    it('should fail if the email is not in the correct format', async () => {
        const req = {
            body: {
                email: 'test',
                password: 'Test1234.'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await login(req, res)

        expect(res.json).toHaveBeenCalledWith({error: 'enter correct email format'})
    })

    it('should fail when the password is incorrect', async () => {
        const req = {
            body: {
                email: 'testing@gmail.com',
                password: 'Test1234'
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
                rowsAffected: [1],
                recordset: [{
                    password: await bcrypt.hash('Test1234.', 10)
                }]
            })
        })
        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Invalid login credentials'})
    })

    it('should fail when the email is not registered', async () => {
        const req = {
            body: {
                email: 'testing@gmail.com',
                password: 'Test1234.'
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
                rowsAffected: [0]   
            })

        })

        await login(req, res)

        // expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'This email is not registered'})
})

it('should login the customer successfully if exist', async () => {
    const mockUser ={
        firstName: 'rachael',
        lastName: 'tems',
        email: 'rachaeltems@gmail.com',
        is_admin: 0,
        is_deleted: 0,
        id: 1,
        password: await bcrypt.hash('Test1234.', 10)    
    }
    const req = {
        body: {
            email: 'rachaeltems@gmail.com',
            password: 'Test1234.'
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
            rowsAffected: [1],
            recordset: [mockUser]
        })
    })

    jest.spyOn(jwt, 'sign').mockReturnValueOnce('token')


    const {password, is_verified, is_assigned, ...user} = mockUser
    await login(req, res) 

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message: 'Login successful', token: 'token', user})
})
it('should login the admin successfully', async () => {
    const mockUser ={
        firstName: 'rachael',
        lastName: 'rach',
        email: 'rachael@gmail.com',
        is_admin: 1,
        is_deleted: 0,
        id: 1,
        password: await bcrypt.hash('Test1234.', 10)    
    }
    const req = {
        body: {
            email: 'rachael@gmail.com',
            password: 'Test1234.'
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
            rowsAffected: [1],
            recordset: [mockUser]
        })
    })

    jest.spyOn(jwt, 'sign').mockReturnValueOnce('token')


    const {password, is_verified, is_assigned, ...user} = mockUser
    await login(req, res) 

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message: 'Login successful', token: 'token', user})
})
})