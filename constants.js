export const DB_HOST = process.env.DB_HOST || "127.0.0.1"
export const DB_NAME =  process.env.DB_NAME || "tattoo"
export const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY"
export const URI = `mongodb://${DB_HOST}:27017/${DB_NAME}`
