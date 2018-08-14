module.exports = (app) => {
    const profile = require('../controllers/profile.controllers.js');

    // Create a new Note
    app.post('/profile', profile.create);

    // Retrieve all simples
    app.get('/profile', profile.findAll);

    // Retrieve a single Note with noteId
    app.get('/profile/:noteId', profile.findOne);

    // Update a Note with noteId
    app.put('/profile/:noteId', profile.update);

    // Delete a Note with noteId
    app.delete('/profile/:noteId', profile.delete);
}
