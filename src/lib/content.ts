const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
*/

const parseSSML = (ssml: string): string[] => {
    const sentenceRegex = /<s>(.*?)<\/s>/g; // Regex to capture sentences inside <s> tags
    const sentences: string[] = [];
    let match;
    
    while ((match = sentenceRegex.exec(ssml)) !== null) {
      sentences.push(match[1].trim()); // Extract and trim the matched sentence
    }
  
    return sentences;
  };

  const fetchContent = async (url = API_URL): Promise<string[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API response data:", data);
  
      // Check if the content field is a string and not empty
      if (typeof data.content === "string" && data.content.length > 0) {
        const sentences = parseSSML(data.content); // Parse sentences from SSML
        console.log("Extracted sentences:", sentences);
        return sentences; // Return the array of sentences
      } else {
        console.warn("Invalid response format or empty 'content' field");
        return []; // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
      return []; // Fallback to an empty array on error
    }
  };
  
/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    const sentenceRegex = /<s>(.*?)<\/s>/g;
    const sentences = []
    let match;

    while((match = sentenceRegex.exec(content)) !== null){
        sentences.push(match[1].trim())
    }

    return sentences;
};

export { fetchContent, parseContentIntoSentences };
