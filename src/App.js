import { News } from "./News";
import { YoutubeNews } from "./YoutubeNews";
//import { YoutubeNewsAlt } from "./YoutubeNewsAlt";

export function App() {
  return (
    <div className="App flex gap-8 justify-center">
      <News />
      <YoutubeNews />
      {/* <YoutubeNewsAlt/> */}
    </div>
  );
}


