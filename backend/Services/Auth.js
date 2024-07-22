import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../Models/userModel.js";

export const register = async (req, res) => {
  console.log(req.body);
  const { client_name, email, phone_number, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ client_email: email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      user_id: uuidv4(),
      client_name,
      client_email: email,
      client_phone_number: phone_number,
      password: hashedPassword,
    });

    user.password = undefined;

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ client_email: email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.password = undefined;

    const token = jwt.sign(
      { email: user.client_email, id: user.user_id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const authenticated = async (req, res) => {
  try {
    console.log("Checking authentication");

    const email = req.email;

    const user = email && (await UserModel.findOne({ client_email: email }));

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    user.password = undefined;
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  const { client_name, client_email, client_phone_number, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ client_email: client_email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      user_id: uuidv4(),
      client_name: client_name,
      client_email: client_email,
      client_phone_number: client_phone_number,
      password: hashedPassword,
    });

    user.password = undefined;

    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
