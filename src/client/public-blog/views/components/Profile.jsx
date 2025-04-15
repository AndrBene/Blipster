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
import ViewsWrapper from './ViewsWrapper';

function Profile() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [myPostsSelected, setMyPostsSelected] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);

  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  async function uploadProfileImg({ profileImg }) {
    try {
      const formData = new FormData();
      formData.append('profileImg', profileImg[0]);
      formData.append(
        'previousProfileImg',
        userInfo?.data.user.photo,
      );

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
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userInfo?.data.user._id}/posts`,
        {
          credentials: 'include',
        },
      );
      const json = await res.json();

      if (json.status === 'error') {
        throw new Error(json.errorMessage);
      }

      setUserPosts(json.data.blogPosts);
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  async function fetchUserComments() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${userInfo?.data.user._id}/comments`,
        {
          credentials: 'include',
        },
      );
      const json = await res.json();

      if (json.status === 'error') {
        throw new Error(json.errorMessage);
      }

      setUserComments(json.data.comments);
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  useEffect(
    function () {
      myPostsSelected ? fetchUserPosts() : fetchUserComments();
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
    <ViewsWrapper>
      <div className="sticky top-0 bg-white pb-2 text-xl font-bold md:text-2xl xl:text-3xl dark:bg-slate-950">
        Profile
      </div>

      <div className="flex flex-wrap items-center gap-y-5 sm:gap-x-5">
        <UserImage image={userInfo?.data.user.photo} />
        <UserInfo user={userInfo?.data.user} />
        <UploadImage
          handleSubmit={handleSubmit}
          register={register}
          uploadProfileImg={uploadProfileImg}
          errors={errors}
        />
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="border-b-[1px] border-gray-200 pb-2 text-lg font-medium md:text-xl xl:text-2xl dark:border-slate-500">
          My Activity
        </div>
        <div className="flex justify-start gap-5 text-base md:text-lg">
          <div
            className={`cursor-pointer ${myPostsSelected ? 'bg-slate-300 dark:bg-slate-700' : null} rounded-full px-3 py-1`}
            onClick={() => {
              setMyPostsSelected(true);
            }}
          >
            Posts
          </div>
          <div
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
            <Posts
              userPosts={userPosts}
              deleteBlogPost={deleteBlogPost}
              alert={alert}
            />
          ) : (
            <div className="mx-2 mt-10 text-base md:text-lg">
              No posts yet
            </div>
          )
        ) : userComments.length > 0 ? (
          <Comments
            userComments={userComments}
            deleteComment={deleteComment}
            alert={alert}
          />
        ) : (
          <div className="mx-2 mt-10 text-base md:text-lg">
            No comments yet
          </div>
        )}
      </div>
    </ViewsWrapper>
  );
}

function UserImage({ image }) {
  return (
    <div className="w-full p-2 sm:w-fit">
      <div className="flex h-12 w-12 items-center justify-center overflow-clip rounded-full ring-1 ring-slate-900 ring-offset-4 ring-offset-white xl:h-24 xl:w-24 dark:ring-white dark:ring-offset-slate-950">
        <img
          src={`${image ? `/users/images/${image}` : '/default_profile.jpg'} `}
          alt="not found"
          className="h-12 object-cover xl:h-24"
        />
      </div>
    </div>
  );
}

function UserInfo({ user }) {
  return (
    <div className="mr-10 flex w-full gap-8 text-base font-normal sm:w-fit sm:grow md:text-lg 2xl:ml-10">
      <div className="flex flex-col gap-1 font-bold">
        <div>Username</div>
        <div>Email</div>
        <div>Role</div>
      </div>
      <div className="flex flex-col gap-1">
        <div>{user?.username}</div>
        <div>{user?.email}</div>
        <div>{user?.role}</div>
      </div>
    </div>
  );
}

function UploadImage({
  handleSubmit,
  register,
  uploadProfileImg,
  errors,
}) {
  return (
    <form
      className="flex w-full flex-col justify-start gap-y-3 text-base md:w-fit md:text-lg"
      onSubmit={handleSubmit(uploadProfileImg)}
    >
      <label htmlFor="profileImg">Choose picture:</label>
      <input
        id="profileImg"
        type="file"
        className="file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-2 file:py-1 file:text-base file:text-white file:hover:bg-slate-700 file:xl:text-lg dark:file:bg-white dark:file:text-black dark:file:hover:bg-slate-200"
        {...register('profileImg', {
          required: 'Image is required',
        })}
      />
      <div className="flex items-center gap-x-4">
        <button className="flex w-fit items-center gap-x-3 rounded-lg bg-slate-900 px-3 py-1 text-base uppercase text-white hover:bg-slate-700 xl:text-lg dark:bg-white dark:text-black dark:hover:bg-slate-200">
          <HiMiniArrowUpTray />
          <div>upload</div>
        </button>
        <div className="flex">
          {errors?.profileImg?.message && (
            <div className="text-red-500 xl:text-lg">
              {errors.profileImg.message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function Posts({ userPosts, deleteBlogPost, alert }) {
  return (
    <div className="overflow-x-scroll scrollbar-none">
      <div className="mt-2 grid min-w-[550px] grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-x-5 rounded-t-md bg-slate-900 px-5 py-2 text-sm text-white sm:text-base md:mt-10 md:text-lg dark:bg-slate-200 dark:text-black">
        <div className="min-w-5">Title</div>
        <div className="min-w-24">Date</div>
        <div className="min-w-5">Views</div>
        <div className="min-w-5">Comments</div>
        <div className="min-w-5"></div>
      </div>
      {userPosts?.map((post) => {
        return (
          <div
            key={post._id}
            className="grid min-w-[550px] grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-x-5 border-x-[1px] border-b-[1px] border-gray-200 px-5 py-2 text-sm sm:text-base md:text-lg"
          >
            <div className="min-w-5">{post.title}</div>
            <div className="min-w-24">
              {DateTime.fromISO(post.createdAt).toFormat(
                'MMM dd, yyyy',
              )}
            </div>
            <div className="min-w-5">{post.views}</div>
            <div className="min-w-5">{post.numComments}</div>
            <div className="flex min-w-5 justify-end gap-2">
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
  );
}

function Comments({ userComments, deleteComment, alert }) {
  return (
    <div className="overflow-x-scroll scrollbar-none">
      <div className="mt-2 grid min-w-[550px] grid-cols-[2fr_2fr_1fr_1fr] items-center gap-x-5 rounded-t-md bg-slate-900 px-5 py-2 text-sm text-white sm:text-base md:mt-10 md:text-lg dark:bg-slate-200 dark:text-black">
        <div className="min-w-16">Message</div>
        <div className="min-w-16">Post</div>
        <div className="min-w-24">Date</div>
        <div className="min-w-5"></div>
      </div>
      {userComments?.map((comment) => {
        return (
          <div
            key={comment._id}
            className="grid min-w-[550px] grid-cols-[2fr_2fr_1fr_1fr] items-center gap-x-5 border-x-[1px] border-b-[1px] border-gray-200 px-5 py-2 text-sm sm:text-base md:text-lg"
          >
            <div className="min-w-16">{comment.content}</div>
            <div className="min-w-16">
              {comment.postInfo?.[0]?.title}
            </div>
            <div className="min-w-24">
              {DateTime.fromISO(comment.createdAt).toFormat(
                'MMM dd, yyyy',
              )}
            </div>
            <div className="flex min-w-5 justify-end gap-2">
              <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                <HiOutlinePencilSquare className="size-5" />
              </button>
              <button
                className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  alert(() =>
                    deleteComment(
                      comment._id,
                      comment.postInfo?.[0]?._id,
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
  );
}

export default Profile;
