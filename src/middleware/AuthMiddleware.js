import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../constants.js";

const DecodeToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

export const AuthMiddleware = (roles, data) => {
  return function (req, res, next) {
    try {
      const token = req.header("Authorization");
      if (!token)
        res
          .status(403)
          .json({data, message: "Ошибка аутентификации. Токен не предоставлен" });
      const user = DecodeToken(token);
      if (roles.indexOf(user.role) !== -1) next();
      else
        return res
          .status(403)
          .json({data,  message: "Ошибка аутентификации. Недостаточно прав" });
    } catch (err) {
        console.log(err.message)
      return res
        .status(403)
        .json({data,  message: "Пользователь не авторизован" });
    }
  };
};
