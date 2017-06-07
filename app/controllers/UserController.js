var user = require('../models/User');


function createUser(req, res) {
    console.log('toto');
}

function updateUser() {

}

function deleteUser() {

}

function findAll() {

}

function findOne() {

}

function login(req, res) {
    if (req.body.username == "" || req.body.password == "" || req.body.username.length < 4 || req.body.password.length < 4) {
        req.flash('error', 'Pseudo et/ou mot de passe incorrect');
        var flash = req.flash('error');
        res.render('login2', { message: flash });
    } else {
        
    }
}

function register(req, res) {
	// console.log(req.body.email.match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}/'));
	if (req.body.username == "" || req.body.password == "" || req.body.email == "") {
        req.flash('error', 'Veuillez remplir tous les champs');
    } else if(new Regex('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}/').test(req.body.email)) {
        
    }
    var flash = req.flash('error');
    res.render('login2', { message: flash });
}

module.exports = {
    create: createUser,
    update: updateUser,
    delete: deleteUser,
    findAll: findAll,
    findOne: findOne,
    login: login,
    register: register
}
