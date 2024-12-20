"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
const aws = {
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET_NAME,
};
const stripe = {
    stripe_api_key: process.env.STRIPE_API_KEY,
    stripe_api_secret: process.env.STRIPE_API_SECRET,
};
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    ip: process.env.IP,
    database_url: process.env.DATABASE_URL,
    cloudunary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudunary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudunary_api_secret: process.env.CLOUDINARY_API_SECRET,
    server_url: process.env.SERVER_URL,
    client_Url: process.env.CLIENT_URL,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    admin_phone: process.env.ADMIN_PHONE,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    nodemailer_host_email: process.env.NODEMAILER_HOST_EMAIL,
    nodemailer_host_pass: process.env.NODEMAILER_HOST_PASS,
    otp_expire_time: process.env.OTP_EXPIRE_TIME,
    otp_token_expire_time: process.env.OTP_TOKEN_EXPIRE_TIME,
    socket_port: process.env.SOCKET_PORT,
    stripe_secret: process.env.STRIPE_API_SECRET,
    stripe_key: process.env.STRIPE_API_KEY,
    wave_payment_url: process.env.WAVE_PAYMENT_URL,
    orange_money_payment_url: process.env.ORANGE_MONEY_PAYMENT_URL,
    mtn_momo_payment_url: process.env.MTN_MOMO_PAYMENT_URL,
    moov_money_payment_url: process.env.MOOV_MONEY_PAYMENT_URL,
    aws,
    stripe,
};
