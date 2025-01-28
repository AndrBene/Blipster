function Comment({ comment }) {
  return (
    // <div className="flex content-center justify-between border-b-[1px] border-slate-800 px-32 py-3">
    <div className="mb-2 flex flex-col justify-start gap-5 border-b-[1px] border-gray-200 p-5">
      <div className="flex items-center justify-start gap-4">
        <div className="h-16 w-16 overflow-clip rounded-full border-[1px] border-slate-800">
          <img
            src="/stephcurry.jpg"
            alt="not found"
            className="h-16 object-cover"
          />
        </div>
        <div>
          <div>Mario Rossi</div>
          <div className="text-base text-stone-400">Mar 12, 2024</div>
        </div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
}

export default Comment;
