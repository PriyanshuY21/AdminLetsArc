import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    console.log("Verifying token");

    // Retrieves token from authorization header
    const token = req.headers.authorization;
    console.log(token);

    if (token) {
      // Splits token to get actual JWT value
      const tokenSplited = token.split(" ")[1];
      
      // Verify token and extracts user information
      const user = jwt.verify(tokenSplited, process.env.JWT_SECRET_KEY);
      
      // Attach user's email to request object
      req.email = user.email;
      console.log(req.email);
    } else {
      // If no token is provided, return an unauthorized error
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    // Handle any errors and return an internal server error
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
