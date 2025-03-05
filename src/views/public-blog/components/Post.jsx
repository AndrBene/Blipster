import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEye,
} from 'react-icons/hi2';

const topicColorMap = {
  nature: 'bg-green-800',
  sports: 'bg-red-800',
  politics: 'bg-blue-800',
};

function Post(props) {
  const color = topicColorMap[props.feed.topic];

  async function updateViews() {
    const response = await fetch(
      `http://localhost:3000/api/v1/posts/${props.feed._id}/num-views`,
    );
    const resJson = await response.json();

    fetch(
      `http://localhost:3000/api/v1/posts/${props.feed._id}/num-views`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
        body: JSON.stringify({ views: resJson.data.numViews + 1 }),
      },
    );
  }

  return (
    <Link
      to={`/public-blog/single-post/${props.feed._id}`}
      onClick={updateViews}
    >
      <div className="my-6 flex h-56 cursor-pointer flex-col justify-between gap-6 border-b-[0.5px] p-2 hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-900">
        <div className="flex items-start justify-between gap-4 overflow-hidden xl:gap-16">
          <div className="">
            <div className="mb-2 text-lg font-bold text-slate-800 dark:text-white md:text-2xl xl:text-3xl">
              {props.feed.title}
            </div>
            <div className="text-sm md:text-lg xl:text-xl">
              {props.feed.content}
            </div>
          </div>
          {props.feed.image && (
            <img
              src={`/posts/images/${props.feed.image}`}
              alt="not found"
              className="w-24 rounded-lg md:w-32 xl:mr-10 xl:w-36"
            />
          )}
        </div>
        <div className="flex h-auto items-center justify-between">
          <div className="flex items-center justify-start gap-2 text-sm text-stone-500 dark:text-slate-500 md:gap-5 md:text-base xl:gap-8 xl:text-lg">
            <div>
              {DateTime.fromISO(props.feed.updatedAt).toFormat(
                'MMM dd, yyyy',
              )}
            </div>
            <div className="flex items-center justify-start gap-1 xl:gap-2">
              <HiOutlineEye className="size-4 md:size-5 xl:size-6" />
              <div>{props.feed.views}</div>
            </div>
            <div className="flex items-center justify-start gap-1 xl:gap-2">
              <HiOutlineChatBubbleOvalLeft className="size-4 md:size-5 xl:size-6" />
              <div>{props.feed.numComments}</div>
            </div>
          </div>
          <div
            className={`rounded-lg ${color} p-2 text-sm uppercase italic text-white`}
          >
            {props.feed.topic}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
