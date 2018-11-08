const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Database Configuration
const mongoURI = require("../config/database/database").mongoURI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Create Schema
const UserSchema = new Schema({
  accountType: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/* ======================================== METHODS ======================================== */
// Generate a Hash
UserSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate Password
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/* ====================================== EXPORT ======================================= */

module.exports = User = conn.model("users", UserSchema);

/* ===================================================================================== */
