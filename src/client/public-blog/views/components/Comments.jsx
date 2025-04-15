import { useForm } from 'react-hook-form';
import Comment from './Comment';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { fetchUserIsAuthenticated } from '../services/authApi';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Spinner from './Spinner';
import Loader from './Loader';

function Comments({ comments }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { id } = useParams();

  const { isFetching, data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  const queryClient = useQueryClient();

  const { isPending: sendingMessage, mutate: submitComment } =
    useMutation({
      mutationFn: sendNewComment,
      onSuccess: () => {
        toast.success(`Comment posted successfully`);
        reset();
        queryClient.invalidateQueries({
          queryKey: [`post-${id}`],
        });
      },
      onError: (error) => {
        toast.error(`Unable to send comment: ${error}`);
      },
    });

  async function sendNewComment({ comment }) {
    const res = await fetch(`/api/v1/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Sending JSON data
      },
      credentials: 'include',
      body: JSON.stringify({
        user: userInfo.data.user._id,
        content: comment,
      }),
    });

    const json = await res.json();

    if (json.status === 'error') {
      throw new Error(json.message);
    }
  }

  return (
    <div className="mb-20 overflow-x-visible">
      {/* {comments?.length > 0 ? ( */}
      <div className="overflow-x-visible">
        <div className="mb-6 flex flex-col justify-start text-lg font-medium text-black xl:text-2xl dark:text-white">
          Comments
        </div>
        {isFetching && <Loader text={''} />}
        {userInfo?.authenticated && !isFetching && (
          <form
            className="flex flex-col gap-y-3 px-5 pb-5"
            onSubmit={handleSubmit(submitComment)}
          >
            <div className="flex h-12 w-full grow items-center justify-between rounded-lg px-4 py-8 text-base shadow-custom placeholder:text-stone-400 focus:outline-none md:text-lg xl:text-lg dark:border-white dark:bg-slate-900 dark:shadow-custom-dark">
              <input
                type="text"
                className="w-full focus:outline-none dark:bg-slate-900 dark:placeholder:text-slate-500"
                placeholder="What are your thoughts?"
                {...register('comment', {
                  required: 'A comment is required',
                })}
              />

              <button className="flex w-20 items-center justify-center rounded-full bg-slate-800 px-5 py-1 text-base text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none xl:text-lg dark:bg-stone-200 dark:text-black dark:hover:bg-white dark:focus:bg-white dark:focus:outline-none">
                {sendingMessage === undefined ||
                sendingMessage === false ? (
                  'Reply'
                ) : (
                  <Spinner width={4} />
                )}
              </button>
            </div>
            <div>
              {errors?.comment?.message && (
                <div className="text-red-500 xl:text-lg">
                  {errors.comment.message}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
      {/* ) : null} */}
      {comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </div>
  );
}

export default Comments;
