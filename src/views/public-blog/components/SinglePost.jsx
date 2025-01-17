import { Link } from 'react-router-dom';
import Comments from './Comments';

function SinglePost() {
  return (
    // <div className="flex justify-between border-b-2 border-neutral-700 bg-neutral-900 px-10 py-3">
    <div className="mt-10 flex flex-col justify-start">
      <Link
        to="/"
        className="flex cursor-pointer justify-start gap-2"
      >
        <img src="back_arrow.png" alt="not found" className="h-5" />
        <div className="text-sm text-slate-800">Home</div>
      </Link>
      <div className="mt-5">Single post</div>
      <Comments />
    </div>
  );
}

export default SinglePost;
