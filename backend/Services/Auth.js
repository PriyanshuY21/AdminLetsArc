import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../Models/userModel.js";

// Registers new user
export const register = async (req, res) => {
  console.log(req.body);
  const { client_name, email, phone_number, password } = req.body;

  try {
    // Check if user with given email already exists
    const userExists = await UserModel.findOne({ client_email: email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creates new user record in database
    const user = await UserModel.create({
      user_id: uuidv4(), // Generates unique ID for user
      client_name,
      client_email: email,
      client_phone_number: phone_number,
      password: hashedPassword,
    });

    user.password = undefined; // Removes password from response

    res.status(201).json({ user }); // Sends created user as a response
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" }); // Handles any errors
  }
};

// Logins a user
export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Checks if user exists in database
    const user = await UserModel.findOne({ client_email: email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compares provided password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.password = undefined; // Removes password from response

    // Generate a JWT token for user
    const token = jwt.sign(
      { email: user.client_email, id: user.user_id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d", // Set token expiration time
      }
    );

    res.status(200).json({ user, token }); // Sends user data and token as response
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" }); // Handle any errors
  }
};

// Checks if a user is authenticated
export const authenticated = async (req, res) => {
  try {
    console.log("Checking authentication");

    const email = req.email;

    // Find user in database using email from JWT
    const user = email && (await UserModel.findOne({ client_email: email }));

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    user.password = undefined; // Removes password from response
    return res.status(200).json({ user: user }); // Sends user data as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle any errors
  }
};

// Create new user
export const createUser = async (req, res) => {
  console.log(req.body);
  const { client_name, client_email, client_phone_number, password } = req.body;

  try {
    // Check if user with given email already exists
    const userExists = await UserModel.findOne({ client_email: client_email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creates new user record in the database
    const user = await UserModel.create({
      user_id: uuidv4(), // Generates unique ID for user
      client_name: client_name,
      client_email: client_email,
      client_phone_number: client_phone_number,
      password: hashedPassword,
    });

    user.password = undefined; // Removes password from response

    res.status(201).json({ user: user, message: "User created successfully" }); // Sends created user and success message as a response
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" }); // Handle any errors
  }
};
