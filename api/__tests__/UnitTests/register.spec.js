//testing Auth controller
const mssql = require("mssql")
const jwt = require("jsonwebtoken")
const hash= require("../../utilis/hashedpwd.js")
const {customeregister} = require("../../Controllers/Auth.controller.js")


describe('customeregister test', () => {
    it('should fail when the request body is empty', async () => {
        const req = {
            body: {}
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await customeregister(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'Please input all values'})
    }),

    it('should create a new user successfully', async () => {
        const req = {
            body: {
                firstName: 'test',
                lastName: 'test',
                email: 'test@gmail.com',
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
        jest.spyOn(hash, 'hashPassword').mockResolvedValueOnce('Test1234.')
        // jest.spyOn(jwt, 'sign').mockResolvedValueOnce('token')

        await customeregister(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({message: 'Account created successfully'})
       }),

    it('should fail when the email is already registered', async () => {
        const req = {
            body: {
                firstName: 'test',
                lastName: 'test',
                email: 'testtest@gmail.com',
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
                    rowsAffected: [1]
                })
         })

            await customeregister(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({error: 'Account creation failed! This email is already registered'})
    })

  

    })


 