module.exports = (app) => {
    const members = require('../controllers/members.controllers.js');

    app.get('/members', members.findAll);
}
