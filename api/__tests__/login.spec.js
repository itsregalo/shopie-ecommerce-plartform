//testing Auth controller
const bcrypt = require("bcryptjs")
const mssql = require("mssql")
const {login} = require("../Controllers/Auth.controller.js")



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
    const req = {
        body: {
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
            rowsAffected: [1]
        })
    })

    
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)

    await login(req, res)

    // expect(res.status).toHaveBeenCalledWith(200)
    // expect(res.json).toHaveBeenCalledWith({message: 'Login successful'})

})
})