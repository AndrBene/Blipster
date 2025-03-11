import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { fetchUserIsAuthenticated } from '../services/authApi';
import ViewsWrapper from '../components/ViewsWrapper';

const topics = ['nature', 'sports', 'politics'];

function CreatePost({ setIsCreatePost }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  useEffect(function () {
    setIsCreatePost(true);

    return () => {
      setIsCreatePost(false);
    };
  }, []);

  async function createPost(postInfo) {
    try {
      const formData = new FormData();
      formData.append('title', postInfo.title);
      formData.append('content', postInfo.content);
      formData.append('author', userInfo.data.user._id);
      formData.append('topic', postInfo.topic);
      formData.append('image', postInfo.photo[0]);

      const res = await fetch(`http://localhost:3000/api/v1/posts`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const json = await res.json();

      if (json.status === 'error') {
        throw new Error(json.message);
      }

      toast.success('Post created successfully!');

      reset();
    } catch (error) {
      toast.error(`Error creating new post: ${error}`);
    }
  }

  return (
    <ViewsWrapper>
      <div className="sticky top-0 bg-white pb-2 text-xl font-bold md:text-2xl xl:text-3xl dark:bg-slate-950">
        Create your post
      </div>
      <form
        onSubmit={handleSubmit(createPost)}
        className="flex grow flex-col justify-between gap-y-10 xl:grow-0"
      >
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            <div className="text-lg xl:text-xl">
              <input
                placeholder="Title"
                className="input border-slate-400 md:w-1/2 dark:border-white dark:bg-slate-900"
                type="text"
                {...register('title', {
                  required: 'Title is required',
                })}
              />
            </div>
            <div>
              {errors?.title?.message && (
                <div className="text-red-500 xl:text-lg">
                  {errors.title.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 text-base md:flex-row xl:text-lg">
            <div className="flex flex-col gap-y-2 text-base md:text-lg xl:text-xl">
              <label htmlFor="picture">Choose picture:</label>
              <input
                id="picture"
                type="file"
                className="file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:hover:bg-slate-700 dark:file:bg-white dark:file:text-black dark:file:hover:bg-slate-200"
                {...register('photo')}
              />
            </div>

            <div className="flex flex-col gap-y-2 text-base md:text-lg xl:text-xl">
              <label htmlFor="">Choose topic:</label>
              <select
                className="w-24 rounded-lg border border-slate-900 px-2 py-1 outline-none xl:w-full dark:border-slate-500 dark:bg-slate-950"
                {...register('topic')}
              >
                {topics.map((topic) => (
                  <option value={topic} key={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="h-32 w-full rounded-lg border border-slate-400 px-4 py-1 text-base placeholder:text-stone-400 focus:outline-none md:text-lg xl:text-lg dark:border-white dark:bg-slate-900">
              <textarea
                className="h-full w-full focus:outline-none dark:bg-slate-900 dark:placeholder:text-slate-500"
                placeholder="Tell your blip ..."
                {...register('content', {
                  required: 'A message is required',
                })}
              ></textarea>
            </div>
            <div className="flex">
              {errors?.content?.message && (
                <div className="text-red-500 xl:text-lg">
                  {errors.content.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center xl:mt-10 xl:block">
          <button className="rounded-full bg-slate-800 px-12 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none md:text-lg xl:text-xl dark:bg-white dark:text-black dark:hover:bg-slate-200">
            Post
          </button>
        </div>
      </form>
    </ViewsWrapper>
  );
}

export default CreatePost;
