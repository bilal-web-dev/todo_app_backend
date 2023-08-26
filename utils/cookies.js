import jwt from "jsonwebtoken";

export const sendCookies = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  console.log("🚀 ~ file: cookies.js:5 ~ sendCookies ~ token:", process.env.NODE_ENV === "Development")
  

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
