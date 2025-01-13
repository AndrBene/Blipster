import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // this only works on CREATE and SAVE!!!
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords do not coincide!',
      },
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Role-based access
    createdAt: { type: Date, default: Date.now },
    passwordChangedAt: Date,
  },
  {
    // timestamps: true,
    toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  },
);

userSchema.virtual('blogPosts', {
  ref: 'BlogPost',
  localField: '_id',
  foreignField: 'author',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkCorrectPassword = async function (
  candidatePassword,
  actualPassword,
) {
  return await bcrypt.compare(candidatePassword, actualPassword); // bcrypt extracts the salt from the beginning of the stored hash.
};

userSchema.methods.checkPasswordChangedAfterTokenRelease = function (
  jwtTimestamp,
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 100,
      10,
    );

    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

console.log(userSchema.virtuals);

const User = mongoose.model('User', userSchema);

export default User;
