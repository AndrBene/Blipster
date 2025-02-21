const topics = ['nature', 'sports', 'politics'];

function CreatePost() {
  /*
   TODO: 
   - add logic to send new post to API
   - add authorization
  */

  return (
    <div className="mx-80 mt-10 text-black dark:text-white">
      <div className="mb-12 text-3xl font-bold">Create your post</div>
      <form>
        <div className="mb-10 flex flex-col justify-start gap-4 text-lg">
          <div className="grow text-xl">
            <input
              placeholder="Title"
              className="input border-slate-400 dark:border-white dark:bg-slate-900"
              type="text"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex justify-between gap-4 text-lg">
          <div className="flex flex-col gap-y-2 text-xl">
            <label htmlFor="picture">Choose picture:</label>
            <input
              id="picture"
              type="file"
              className="file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:hover:bg-slate-700"
            />
          </div>

          <div className="flex flex-col gap-y-2 text-xl">
            <label htmlFor="">Choose topic:</label>
            <select className="rounded-lg border border-slate-900 px-2 py-1 outline-none dark:border-slate-500 dark:bg-slate-950">
              {topics.map((topic) => (
                <option value={topic} key={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4 text-lg">
          <div className="h-56 w-full grow rounded-lg border border-slate-400 px-4 py-1 text-lg placeholder:text-stone-400 focus:outline-none dark:border-white dark:bg-slate-900">
            <input
              type="text"
              required
              className="w-full focus:outline-none dark:bg-slate-900 dark:placeholder:text-slate-500"
              placeholder="Tell your blip ..."
            />
          </div>
        </div>

        <div className="mt-14">
          <button className="mb-2 rounded-full bg-slate-800 px-12 py-3 text-xl uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
