const { Schema, model } = require('mongoose'); // this only imports the schema constructor and model function - do i need anything else?

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;