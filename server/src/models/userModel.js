const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // this only works on CREATE and SAVE!!!
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not coincide!",
      },
    },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Role-based access
    createdAt: { type: Date, default: Date.now },
  },
  {
    // timestamps: true,
    toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

userSchema.virtual("blogPosts", {
  ref: "BlogPost",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

console.log(userSchema.virtuals);

const User = mongoose.model("User", userSchema);

module.exports = User;
