import { Link } from 'react-router-dom';

function Post(props) {
  const topicColorMap = {
    nature: 'bg-green-800',
    sports: 'bg-red-800',
    politics: 'bg-blue-800',
  };

  const color = topicColorMap[props.feed.topic];

  return (
    <Link to={`/public-blog/single-post/${props.feed.id}`}>
      <div className="my-6 flex h-56 cursor-pointer flex-col justify-between gap-6 border-b-[0.5px] p-2 hover:bg-slate-50">
        <div className="flex items-start justify-between gap-16 overflow-hidden">
          <div className="">
            <div className="mb-2 text-3xl font-bold text-slate-800">
              {props.feed.title}
            </div>
            <div>{props.feed.content}</div>
          </div>
          <img
            src={`/images/${props.feed.image}`}
            alt="not found"
            className="mr-10 w-36 rounded-lg"
          />
        </div>
        <div className="flex h-auto items-center justify-between">
          <div className="flex items-center justify-start gap-8 text-lg text-stone-500">
            <div>{props.feed.date}</div>
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
              <div>{props.feed.comments}</div>
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
