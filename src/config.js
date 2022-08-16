import 'dotenv/config';
export const PORT = process.env.PORT || 8080
export const DATABASE_HOST = process.env.DATABASE_HOST || "localhost"
export const DATABASE_USER = process.env.DATABASE_USER || "root"
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "root"
export const DATABASE_NAME = process.env.DATABASE_NAME || "eccommerce"
export const DATABASE_PORT = process.env.DATABASE_PORT || "27017"