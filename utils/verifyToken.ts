import jwt from "jsonwebtoken"

export default (token: string) => jwt.verify(token, '0')