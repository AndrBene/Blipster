import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

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
      <div className="my-6 flex h-56 cursor-pointer flex-col justify-between gap-6 border-b-[0.5px] p-2 hover:bg-slate-50">
        <div className="flex items-start justify-between gap-16 overflow-hidden">
          <div className="">
            <div className="mb-2 text-3xl font-bold text-slate-800">
              {props.feed.title}
            </div>
            <div>{props.feed.content}</div>
          </div>
          <img
            src={`/posts/images/${props.feed.image}`}
            alt="not found"
            className="mr-10 w-36 rounded-lg"
          />
        </div>
        <div className="flex h-auto items-center justify-between">
          <div className="flex items-center justify-start gap-8 text-lg text-stone-500">
            <div>
              {DateTime.fromISO(props.feed.updatedAt).toFormat(
                'MMM dd, yyyy',
              )}
            </div>
            <div className="flex items-center justify-start gap-2">
              <img
                src="/views.png"
                className="size-5 opacity-50"
                alt="not found"
              />
              <div>{props.feed.views}</div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <img
                src="/comments.png"
                className="size-5 opacity-50"
                alt="not found"
              />
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
