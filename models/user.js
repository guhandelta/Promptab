import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
      // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
      type: String,
    }
  });
  
  /* const User = model("User", UserSchema); would be given for an always on & always running backend server

    The models obj is provided by the mongoose library and stores all the registered models. 
    If a model named "User" already exists in the "models" obj, it assigns it to the "User variable".
    This prevents redefining the model and that the existing model is reused.
        
    If a model named "User" doesn't exist in the "models" obj, the "model()" is called to create a new model
    The newly created module is then assigned to the "User" variable
  */

  const User = models.User || model("User", UserSchema);
  
  export default User;