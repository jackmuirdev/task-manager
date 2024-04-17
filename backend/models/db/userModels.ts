import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value: any) {
        // Password must contain at least 1 capital letter, 1 symbol, 1 number, and 1 letter
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(value);
      },
      message: "Password must contain at least 1 capital letter, 1 symbol, 1 number, and 1 letter"
    }
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) { 
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;