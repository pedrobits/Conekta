import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: true,
  },
});

//Export the model
const User = mongoose.model("User", userSchema);

export default User;
