export function About() {
  return (
    <div className="mb-20 mt-10 space-x-1 text-base text-slate-800 md:text-lg xl:text-xl dark:text-white">
      <div className="mb-10">
        <span className="font-bold">Blipster</span> is an intuitive
        and modern{' '}
        <span className="font-bold">Blog Management Platform</span>{' '}
        designed to seamlessly connect content creators with their
        audience. It offers a{' '}
        <span className="font-bold">public-facing blog site</span>{' '}
        built with <span className="font-bold">React</span> and a
        robust <span className="font-bold">admin dashboard</span>{' '}
        powered by <span className="font-bold">Angular</span>, all
        backed by a reliable Node.js backend.
        <br />
        Whether you{`'`}re a blogger looking to share stories or an
        admin managing posts and engagement, Blipster makes the
        process efficient and enjoyable.
      </div>

      <div className="mb-5 font-bold">🌟 Key Features</div>
      <div className="mb-5">
        📝 1.{' '}
        <span className="underline underline-offset-4">
          Public Blog Platform (React SPA){' '}
        </span>
        <div className="mt-2">
          <ul className="list-inside list-disc">
            <li>
              <span className="font-medium">Explore Posts:</span>{' '}
              Browse a clean, responsive interface showcasing blog
              posts.
            </li>
            <li>
              <s>
                <span className="font-medium">Search & Filter: </span>
                Easily find posts by keywords or tags.
              </s>
            </li>
            <li>
              <span className="font-medium">Read & Engage: </span>
              View detailed blog posts and leave comments.
            </li>
            <li>
              <span className="font-medium">Design:</span> Seamless
              experience on mobile, tablet, and desktop.
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-5">
        🛡️ 2.{' '}
        <span className="underline underline-offset-4">
          Admin Dashboard (Angular SPA)
        </span>
        <div className="mt-2">
          <li>
            <span className="font-medium">
              Authentication & Authorization:
            </span>{' '}
            Secure access with JWT authentication.
          </li>
          <li>
            <s>
              <span className="font-medium">Post Management:</span>{' '}
              Create, edit, publish, and delete blog posts.
            </s>
          </li>
          <li>
            <span className="font-medium">Post Analytics:</span> View
            insights on views, engagement, and interactions.
          </li>
        </div>
      </div>

      <div className="mb-5">
        ⚙️ 3.{' '}
        <span className="underline underline-offset-4">
          Backend (Node.js + Express.js)
        </span>
        <li>
          <span className="font-medium">Robust APIs:</span> Backend
          services for posts, users, comments, and analytics.
        </li>
        <li>
          <span className="font-medium">Secure Authentication:</span>{' '}
          JWT-based user authentication and admin role management.
        </li>
        <li>
          <span className="font-medium">Database Integration:</span>{' '}
          MongoDB for scalable data storage.
        </li>
      </div>

      <div className="mb-5">
        🤖 4.{' '}
        <span className="underline underline-offset-4">
          AI-Powered Assistance (Future Feature)
        </span>
        <li>
          <span className="font-medium">Content Generation:</span>{' '}
          AI-assisted blog post titles and summaries.
        </li>
        <li>
          <span className="font-medium">Content Optimization:</span>{' '}
          Enhance readability and clarity with AI suggestions.
        </li>
      </div>
    </div>
  );
}
