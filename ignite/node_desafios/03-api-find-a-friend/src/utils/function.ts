export function fetchWordsInText(text: string, words: string[]): boolean {
  let wordsOfTheText = text.split(/\W+/);

  let wordsOfTheTextSet = new Set(wordsOfTheText);

  let count = 0;

  for (let word of words) {
      if (wordsOfTheTextSet.has(word)) {
        count++;
      }
  }
  
  return count >= words.length * 0.75; // ensures that at least 75% of the words are present in the text
}
