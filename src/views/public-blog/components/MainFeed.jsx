import Post from './Post';

const feed = [
  {
    id: '1',
    title: 'Wildfires',
    text: `Thread of heartbreaking moments just before disaster strikes
(Don't open it if you have a soft heart)`,
    topic: 'nature',
    image: 'wildfires.jpg',
    views: 39,
    comments: 22,
    date: '10 Oct, 2024',
  },
  {
    id: '2',
    title: 'Biden news',
    text: `Four years ago, in the middle of a pandemic, we needed a leader with the character to put politics aside and do what was right. That’s what 
@JoeBiden
 did.
 
At a time when our economy was reeling, he drove what would become the world’s strongest recovery – with 17 million new jobs, historic wage gains, and lower health care costs. He passed landmark legislation to rebuild our nation’s infrastructure and address the threat of climate change. 
 
I’m grateful to Joe for his leadership, his friendship, and his lifetime of service to this country we love.`,
    topic: 'politics',
    image: 'biden.jpg',
    views: 15,
    comments: 3,
    date: '12 Oct, 2024',
  },
  {
    id: '3',
    title: 'Toughest bodyguard around',
    text: `10 things you don’t know about Messi bodyguard`,
    topic: 'sports',
    image: 'messibodiguard.webp',
    views: 83,
    comments: 40,
    date: '10 Oct, 2024',
  },
  {
    id: '4',
    title: 'STEPH CURRY. INEVITABLE 😤',
    text: `His seventh three of the game 💪`,
    topic: 'sports',
    image: 'stephcurry.jpg',
    views: 120,
    comments: 13,
    date: '10 Oct, 2024',
  },
];

function MainFeed() {
  return (
    <div>
      <div className="mt-2 border-2 border-white">
        {feed.map((el) => {
          return <Post key={el.title} feed={el} />;
        })}
      </div>
    </div>
  );
}

export default MainFeed;
