/**
 * Displays all sentences and highlights the current sentence and word
 * @param {Object} props
 * @param {[number, number]} props.currentWordRange - The start and end indices of the current word
 * @param {number} props.currentSentenceIdx - The index of the current sentence being read
 * @param {string[]} props.sentences - An array of all available sentences
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  // Get the current sentence and word range
  const currentSentence =
    currentSentenceIdx >= 0 && currentSentenceIdx < sentences.length
      ? sentences[currentSentenceIdx]
      : "";
  const [start, end] = currentWordRange;

  // Extract the currently highlighted word range
  const highlightedWord = currentSentence.substring(start, end);

  return (
    <div data-testid="currently-reading">
      {/* List all sentences in an ordered list */}
      <div>
        <h3>All Sentences:</h3>
        <ul>
          {sentences.map((sentence, idx) => (
            <li
              key={idx}
              style={{
                fontWeight: idx === currentSentenceIdx ? "bold" : "normal",
              }}
            >
              {idx === currentSentenceIdx ? (
                <>
                  {sentence.substring(0, start)}
                  <span
                    data-testid="current-word"
                    style={{ backgroundColor: "blue" }}
                  >
                    {highlightedWord}
                  </span>
                  {sentence.substring(end)}
                </>
              ) : (
                sentence
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
