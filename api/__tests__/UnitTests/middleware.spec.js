const jwt = require('jsonwebtoken');
const { verifyToken, user_is_admin } = require('../../Middleware/verifyToken'); // Import your middleware module

// Mock request, response, and next
const req = {
    headers: {
        authorization: 'Bearer your_mock_token_here'
    }
};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};
const next = jest.fn();

describe('Middleware - verifyToken', () => {
    it('should return error if no token is provided', () => {
        const mockReq = { headers: { authorization: '' } };

        verifyToken(mockReq, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    })
});

describe('Middleware - user_is_admin', () => {
    it('should return error if user is not admin', () => {
        const mockReq = { user: { is_admin: false } };

        user_is_admin(mockReq, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    });

    it('should return 500 if an error occurs', () => {
        const mockReq = { user: { is_admin: true } };
        next.mockImplementation(() => {
            throw new Error('Error in user_is_admin middleware');
        });

        user_is_admin(mockReq, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error in user_is_admin middleware' });
    });
});
