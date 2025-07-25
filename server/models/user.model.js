import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';    
dotenv.config();
import crypto from 'crypto';
const userSchema = new Schema({
  fullName: {
    type: 'String',
    required: [true, 'Name is required'],
    minLength: [5, 'Name must be at least 5 characters long'],
    maxLength: [50, 'Name must be at most 50 characters long'],
    lowercase: true,

  },
  email: {
    type: 'String',
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    'Please fill a valid email address',
  ]

  },
  password: {
    type: 'String',
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters long'],
    //maxLength: [20, 'Password must be at most 20 characters long'],
    select: false, // Do not return password in queries
  },
  avatar: {
    public_id: {
        type: 'String',
    },
    secure_url: {
        type: 'String',
    }
  },
  role: {
    type: 'String',
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  subscription: {
    id: String,
    status: String
  }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWTToken: async function() {
        return await jwt.sign(
            {
            id: this._id,
            email: this.email,
            subscription: this.subscription,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
      )
    },
    comparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
   generatePasswordResetToken: async function() {
     const resetToken = crypto.randomBytes(20).toString('hex');

     this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
     this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

      return resetToken;
   }
}

const User = model('User', userSchema);

export default User;