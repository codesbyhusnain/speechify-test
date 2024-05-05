import "./App.css";
import { useState } from "react";
import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, currentWordRange, playbackState, play, pause } =
    useSpeech(sentences);

  const loadNewContent = async () => {
    try {
      const content = await fetchContent();
      setSentences(content);
    } catch (error) {
      console.error("Error loading new content:", error);
    }
  };

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={loadNewContent} // Example
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
