import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { fetchUserIsAuthenticated } from '../services/authApi';

const topics = ['nature', 'sports', 'politics'];

function CreatePost({ setIsCreatePost }) {
  const { register, handleSubmit, reset } = useForm();
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

      const res = await fetch(`/api/v1/posts`, {
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
    <div className="flex h-full justify-center overflow-hidden">
      <div className="w-2/3 overflow-scroll pb-5 pt-10 text-black dark:text-white sm:w-10/12 lg:w-2/3">
        <div className="mb-12 text-xl font-bold md:text-2xl xl:text-3xl">
          Create your post
        </div>
        <form onSubmit={handleSubmit(createPost)}>
          <div className="mb-10 flex flex-col justify-start gap-4 text-base xl:text-lg">
            <div className="grow text-lg xl:text-xl">
              <input
                placeholder="Title"
                className="input w-1/2 border-slate-400 dark:border-white dark:bg-slate-900"
                type="text"
                required
                {...register('title')}
              />
            </div>
          </div>

          <div className="mb-12 flex flex-col justify-between gap-4 text-base md:flex-row xl:text-lg">
            <div className="flex flex-col gap-y-2 text-base md:text-lg xl:text-xl">
              <label htmlFor="picture">Choose picture:</label>
              <input
                id="picture"
                type="file"
                className="file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:hover:bg-slate-700"
                {...register('photo')}
              />
            </div>

            <div className="flex flex-col gap-y-2 text-base md:text-lg xl:text-xl">
              <label htmlFor="">Choose topic:</label>
              <select
                className="w-24 rounded-lg border border-slate-900 px-2 py-1 outline-none dark:border-slate-500 dark:bg-slate-950 xl:w-full"
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

          <div className="mb-10 flex items-center gap-4 text-base md:text-lg xl:text-lg">
            <div className="h-56 w-full grow rounded-lg border border-slate-400 px-4 py-1 text-base placeholder:text-stone-400 focus:outline-none dark:border-white dark:bg-slate-900 md:text-lg xl:text-lg">
              <input
                type="text"
                required
                className="w-full focus:outline-none dark:bg-slate-900 dark:placeholder:text-slate-500"
                placeholder="Tell your blip ..."
                {...register('content')}
              />
            </div>
          </div>

          <div className="mt-14 flex justify-center xl:block">
            <button className="mb-2 rounded-full bg-slate-800 px-12 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none md:text-lg xl:text-xl">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
