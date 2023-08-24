const {v4} = require('uuid')
const mssql = require('mssql')
const { sqlConfig } = require('../Config/Config')

// mocking theresponse objects
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('createNewCategory', () => {
    describe("List of categories", () => {
       const mock_products = [
            {
                "id": "4e670821-5a85-412c-8fce-00207ca6ae49",
                "category_name": "Fashion",
                "created_at": "2023-08-20T23:21:07.693Z"
            },
            {
                "id": "86ad319f-953e-4672-9f2c-4a587d948c0a",
                "category_name": "Cars",
                "created_at": "2023-08-20T23:20:25.780Z"
            }
       ]

       const req = {}

       jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: mock_products
            })
         })
        }
    })
)

