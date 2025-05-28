import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt for:", email);

    const user = await userModel.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: "Error during login" });
  }
};




//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Registering user:", { name, email, password });

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      console.log("User already exists");
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      console.log("Invalid email");
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      console.log("Weak password");
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log("User saved:", user);

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.json({ success: false, message: "Error" });
  }
};



export { loginUser, registerUser }