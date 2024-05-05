import { useState } from 'react';
import { PlayingState, createSpeechEngine, SpeechEngineOptions } from './speech';

const useSpeech = (sentences: string[]) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>('paused');
  let isPlaying = false; // Flag to track whether a sentence is currently being played

  const handleEnd = () => {
    setCurrentSentenceIdx((prevIdx) => {
      const nextIdx = prevIdx + 1;
      if (nextIdx < sentences.length) {
        playNextSentence(nextIdx); // Play the next sentence
      } else {
        setPlaybackState('ended');
        pause(); // Pause playback when all sentences are over
      }
      return nextIdx;
    });
  };

  const handleStateUpdate = (state: PlayingState) => {
    setPlaybackState(state);
  };

  const handleBoundary = (e: SpeechSynthesisEvent) => {
    const charIndex = e.charIndex;
    setCurrentWordRange([charIndex, charIndex + 15]); // Adjust based on your logic
  };

  const speechEngineOptions: SpeechEngineOptions = {
    onBoundary: handleBoundary,
    onEnd: handleEnd,
    onStateUpdate: handleStateUpdate,
  };

  const speechEngine = createSpeechEngine(speechEngineOptions);

  const playNextSentence = (idx: number) => {
    console.log("Playing sentence at index:", idx);
    if (idx < sentences.length) {
      // Check if a sentence is already being played
      isPlaying = true; // Set flag to indicate that playback is in progress
      speechEngine.load(sentences[idx]);
      speechEngine.play();
      setPlaybackState('playing');
    } else {
      // No more sentences to play, set playback state to 'ended' and pause
      setPlaybackState('ended');
      pause();
    }
  };

  const play = () => {
    setCurrentSentenceIdx(0); // Start from the first sentence
    playNextSentence(currentSentenceIdx); // Start playback from the first sentence
  };

  const pause = () => {
    speechEngine.pause();
    setPlaybackState('paused');
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };

