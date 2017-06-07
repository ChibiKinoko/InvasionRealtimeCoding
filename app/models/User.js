//db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

// create a schema
var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});



UserSchema.methods.generateHash = function(password) {  
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {  
  return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;