const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

console.log(userSchema.virtuals);

const User = mongoose.model("User", userSchema);

module.exports = User;
