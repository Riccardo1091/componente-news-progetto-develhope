import { News } from "./News";
import { YoutubeNews } from "./YoutubeNews";
import './App.css';
//import { TestFetchStrapi } from "./TestFetchStrapi";
//import { YoutubeNewsAlt } from "./YoutubeNewsAlt";

export function App() {
  return (
    <div className="flex gap-0 flex-column flex-wrap sm:flex-row sm:gap-6 justify-center">
      <News />
      <YoutubeNews />
      {/* <TestFetchStrapi /> */}
      {/* <YoutubeNewsAlt/> */}
    </div>
  );
}


