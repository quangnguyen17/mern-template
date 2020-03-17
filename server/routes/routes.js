const UserController = require('../controllers/UserController');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/logout', UserController.logout);
    // Auth
    app.get('/api/users', authenticate, UserController.getAllUsers);
    app.get('/api/users/current', authenticate, UserController.getCurrentUser);
    app.get('/api/user/:id', authenticate, UserController.getUserById);
}