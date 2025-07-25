import  connectionToDB  from './config/dbConnection.js';
import app from './app.js';
import cloudinary from 'cloudinary';
import { config } from 'dotenv';
config();
import Razorpay from 'razorpay';

const PORT = process.env.PORT || 5000;

// Cloudinary configuration

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_SECRET || 'dummy_key',
});

app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`Server is running at http:localhost:${PORT}`);
});