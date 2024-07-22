import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    console.log("Verifying token");

    const token = req.headers.authorization;
    console.log(token);

    if (token) {
      const tokenSplited = token.split(" ")[1];
      const user = jwt.verify(tokenSplited, process.env.JWT_SECRET_KEY);
      req.email = user.email;
      console.log(req.email);
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
