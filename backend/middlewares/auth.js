import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; // Ensure correct path
import ErrorHandler from "../utils/errorHandler.js"; // Ensure correct path

export const protect = TryCatch(async (req, res, next) => {
 
  let token = req.cookies["Auth-Token"];
  
  if (!token) {
    return next(new ErrorHandler(401, "Not authorized, no token"));
  }

  try {
    const decoded = jwt.verify(token, "tempsecret");
    req.user = decoded._id;

    if (!req.user) {
      return next(new ErrorHandler(401, "User not found"));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler(401, "Not authorized, token failed"));
  }
});

export const socketAuthenticate = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies["Auth-Token"];
    console.log(authToken);
    if (!authToken)
      return next(new ErrorHandler("please Login to access this Route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);
    if (!user) return next(new ErrorHandler("Invalid User", 401));
    socket.user = user;

    return next();
  } catch (error) {
    return next(new ErrorHandler("please Login to access this Route", 401));
  }
};
