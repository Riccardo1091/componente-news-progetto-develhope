import { News } from "./news-gaming/News.tsx";
import { YoutubeNews } from "./news-gameplay/YoutubeNews";
import './App.css';

export function App() {
  return (
    <div className="flex gap-0 flex-column flex-wrap sm:flex-row sm:gap-6 justify-center">
      <News />
      <YoutubeNews />
    </div>
  );
}


