import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    content: { type: String, required: true },
    approved: { type: Boolean, default: false }, // Admin approval required
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
  },
);

commentSchema.virtual('userInfo', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
});

commentSchema.virtual('postInfo', {
  ref: 'BlogPost',
  localField: 'post',
  foreignField: '_id',
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
