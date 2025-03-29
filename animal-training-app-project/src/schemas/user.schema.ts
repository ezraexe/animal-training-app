import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  admin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);