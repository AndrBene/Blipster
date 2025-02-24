import Comment from './Comment';

function Comments({ comments }) {
  return (
    <div className="mb-20">
      {/*
        TODO: 
        - add new comment input element
      */}
      {comments?.length > 0 ? (
        <div className="mb-6 flex flex-col justify-start text-lg font-medium text-black xl:text-2xl dark:text-white">
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
