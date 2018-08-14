module.exports = (app) => {
    const login = require('../controllers/login.controllers.js');

    app.get('/login/:email', login.findOne);
    app.get('/login', login.findAll);
}
