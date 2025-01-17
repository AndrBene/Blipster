import { Route, Routes } from 'react-router-dom';
import TopBar from './TopBar';
import { About } from './About';

function Home() {
  return (
    <div className="mx-64 grid h-full grid-rows-[auto_1fr] overflow-hidden bg-white px-5 text-black">
      <TopBar />
      <div className="overflow-scroll text-xl"></div>
    </div>
  );
}

export default Home;
