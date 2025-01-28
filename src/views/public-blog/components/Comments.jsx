import Comment from './Comment';

function Comments({ comments }) {
  return (
    <div className="mb-20">
      {comments?.length > 0 ? (
        <div className="mb-6 flex flex-col justify-start text-2xl font-medium text-black">
          Comments
        </div>
      ) : null}
      {comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </div>
  );
}

export default Comments;
