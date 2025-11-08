import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
