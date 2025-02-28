import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { fetchUserIsAuthenticated } from '../services/authApi';
import {
  HiMiniArrowUpTray,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';

function Profile() {
  const { register, handleSubmit, reset } = useForm();
  const [myPostsSelected, setMyPostsSelected] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);

  const queryClient = useQueryClient();

  const { isLoading, data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  console.log('re-render. userInfo: ', userInfo);

  if (isLoading) {
    return <Spinner />; // Show loading until the query resolves
  }

  async function uploadProfileImg({ profileImg }) {
    try {
      const formData = new FormData();
      formData.append('profileImg', profileImg[0]);

      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userInfo?.data.user._id}/profile-image`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        },
      );

      const json = await res.json();

      if (json.status === 'error') {
        throw new Error(json.message);
      }

      toast.success('Profile image update successfully!');

      queryClient.invalidateQueries({
        queryKey: ['isAuthenticated'],
      });

      reset();
    } catch (error) {
      toast.error(`Error uploading profile image: ${error}`);
    }
  }

  async function fetchUserPosts() {
    console.log('user: ', userInfo?.data.user);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userInfo?.data.user._id}/posts`,
        {
          credentials: 'include',
        },
      );
      const json = await res.json();
      console.log('json:', json);

      if (json.status === 'error') {
        throw new Error(json.errorMessage);
      }

      setUserPosts(json.data.blogPosts);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUserComments() {
    console.log('userInfo?.data: ', userInfo?.data);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userInfo?.data.user._id}/comments`,
        {
          credentials: 'include',
        },
      );
      const json = await res.json();
      console.log('json:', json);

      if (json.status === 'error') {
        throw new Error(json.errorMessage);
      }

      setUserComments(json.data.comments);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(
    function () {
      // if (!isLoading) {
      myPostsSelected ? fetchUserPosts() : fetchUserComments();
      // }
    },
    [myPostsSelected],
  );

  function alert(callback) {
    return toast(
      (t) => (
        <div className="flex flex-col items-center gap-y-5">
          <div>Are you sure you want to proceed?</div>
          <div className="flex gap-x-5">
            <div
              className="cursor-pointer rounded-xl border-[1px] border-slate-950 bg-slate-950 px-3 py-1 text-white hover:border-slate-700 hover:bg-slate-700"
              onClick={() => {
                toast.dismiss(t.id);
                callback();
              }}
            >
              Yes
            </div>
            <div
              className="cursor-pointer rounded-xl border-[1px] border-slate-950 px-3 py-1 text-black hover:border-slate-700 hover:bg-slate-700 hover:text-white"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keeps the toast visible indefinitely
      },
    );
  }

  async function deleteBlogPost(postId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userInfo?.data.user._id}/posts/${postId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      toast.success('Post deleted successfully!');
      fetchUserPosts();
    } catch (error) {
      toast.error(`Error deleting post: ${error}`);
    }
  }

  async function deleteComment(commentId, postId) {
    console.log('commentId: ', commentId);
    console.log('postId: ', postId);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/posts/${postId}/comments/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      toast.success('Comment deleted successfully!');

      fetchUserComments();
    } catch (error) {
      toast.error(`Error deleting comment: ${error}`);
    }
  }

  return (
    <div className="flex h-full justify-center overflow-hidden text-black dark:text-white">
      {/* <div className="text-black"> */}
      <div className="w-2/3 overflow-x-hidden overflow-y-scroll pb-10 pt-10 sm:w-10/12 lg:w-2/3">
        <div className="mb-12 text-xl font-bold md:text-2xl xl:text-3xl">
          Profile
        </div>
        <div className="mb-10 flex flex-col justify-start gap-y-5 md:mb-20 xl:flex-row xl:items-center xl:gap-x-5 2xl:gap-x-10">
          <div className="p-2">
            <div className="flex h-12 w-12 items-center justify-center overflow-clip rounded-full ring-1 ring-slate-900 ring-offset-4 ring-offset-white dark:ring-white dark:ring-offset-slate-950 xl:h-24 xl:w-24">
              <img
                src={`${userInfo?.data.user.photo ? '/users/images/' + userInfo?.data.user.photo : '/default_profile.jpg'} `}
                alt="not found"
                className="h-12 object-cover xl:h-24"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-8 text-base font-normal md:text-lg">
              <div className="flex flex-col gap-1 font-bold">
                <div>Username</div>
                <div>Email</div>
                <div>Role</div>
              </div>
              <div className="flex flex-col gap-1">
                <div>{userInfo?.data.user.username}</div>
                <div>{userInfo?.data.user.email}</div>
                <div>{userInfo?.data.user.role}</div>
              </div>
            </div>
            {/* <div className="flex items-start justify-start gap-x-5 text-lg"> */}
            <form
              className="flex flex-col justify-start gap-y-3 text-base md:text-lg"
              onSubmit={handleSubmit(uploadProfileImg)}
            >
              <label htmlFor="profileImg">Choose picture:</label>
              <input
                id="profileImg"
                type="file"
                className="file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-2 file:py-1 file:text-base file:text-white file:hover:bg-slate-700 dark:file:bg-white dark:file:text-black dark:file:hover:bg-slate-200 file:xl:text-lg"
                {...register('profileImg')}
              />
              <button className="flex w-fit items-center gap-x-3 rounded-lg bg-slate-900 px-3 py-1 text-base uppercase text-white hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-slate-200 xl:text-lg">
                <HiMiniArrowUpTray />
                <div>upload</div>
              </button>
            </form>
          </div>
        </div>
        <div className="border-b-[1px] border-gray-200 pb-2 text-lg font-medium dark:border-slate-500 md:text-xl xl:text-2xl">
          My Activity
        </div>
        <div className="my-5 flex justify-start gap-5 text-base md:text-lg">
          <div
            // className={`cursor-pointer ${myPostsSelected ? 'bg-slate-300 dark:bg-slate-700' : 'border-[1px] dark:border-slate-500'} rounded-full px-3 py-1`}
            className={`cursor-pointer ${myPostsSelected ? 'bg-slate-300 dark:bg-slate-700' : null} rounded-full px-3 py-1`}
            onClick={() => {
              setMyPostsSelected(true);
            }}
          >
            Posts
          </div>
          {/* <div className="rounded-full bg-slate-300 px-3 py-1"> */}
          <div
            // className={`cursor-pointer ${!myPostsSelected ? 'bg-slate-300 dark:bg-slate-700' : 'border-[1px] dark:border-slate-500'} rounded-full px-3 py-1`}
            className={`cursor-pointer ${!myPostsSelected ? 'bg-slate-300 dark:bg-slate-700' : null} rounded-full px-3 py-1`}
            onClick={() => {
              setMyPostsSelected(false);
            }}
          >
            Comments
          </div>
        </div>
        {myPostsSelected ? (
          userPosts.length > 0 ? (
            <div className="overflow-x-scroll">
              <div className="mt-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-x-5 rounded-t-md bg-slate-900 px-5 py-2 text-sm text-white dark:bg-slate-200 dark:text-black sm:text-base md:mt-10 md:text-lg">
                <div>Title</div>
                <div>Date</div>
                <div>Views</div>
                <div>Comments</div>
                <div></div>
              </div>
              {userPosts?.map((post) => {
                return (
                  <div
                    key={post._id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-x-5 border-x-[1px] border-b-[1px] border-gray-200 px-5 py-2 text-sm sm:text-base md:text-lg"
                  >
                    <div>{post.title}</div>
                    <div>
                      {DateTime.fromISO(post.createdAt).toFormat(
                        'MMM dd, yyyy',
                      )}
                    </div>
                    <div>{post.views}</div>
                    <div>{post.numComments}</div>
                    <div className="flex justify-end gap-2">
                      <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                        <HiOutlinePencilSquare className="size-5" />
                      </button>
                      <button
                        onClick={() => {
                          alert(() => deleteBlogPost(post._id));
                        }}
                        className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <HiOutlineTrash className="size-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mx-2 mt-10 text-base md:text-lg">
              No posts yet
            </div>
          )
        ) : userComments.length > 0 ? (
          <div className="overflow-x-scroll">
            <div className="mt-2 grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-x-5 rounded-t-md bg-slate-900 px-5 py-2 text-sm text-white dark:bg-slate-200 dark:text-black sm:text-base md:mt-10 md:text-lg">
              <div>Message</div>
              <div>Post</div>
              <div>Date</div>
              <div></div>
            </div>
            {userComments?.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-x-5 border-x-[1px] border-b-[1px] border-gray-200 px-5 py-2 text-sm sm:text-base md:text-lg"
                >
                  <div>{comment.content}</div>
                  <div>{comment.postInfo[0]?.title}</div>
                  <div>
                    {DateTime.fromISO(comment.createdAt).toFormat(
                      'MMM dd, yyyy',
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                      <HiOutlinePencilSquare className="size-5" />
                    </button>
                    <button
                      className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => {
                        alert(() =>
                          deleteComment(
                            comment._id,
                            comment.postInfo[0]?._id,
                          ),
                        );
                      }}
                    >
                      <HiOutlineTrash className="size-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-2 mt-10 text-base md:text-lg">
            No comments yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
