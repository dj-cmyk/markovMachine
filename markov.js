/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {}
    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i]
      if (chains[word]){
        if (this.words[i+1] == undefined){
          chains[word].push(null)
        } else {
          chains[word].push(this.words[i+1])
        }
      } else {
        if (this.words[i+1] == undefined){
          chains[word] = [null]
        } else {
          chains[word] = [this.words[i+1]]
        }
      }
    }
    return chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    this.phrase = []
    this.stringPhrase = ""
    this.maxWords = numWords;

    let wordsArrLength = this.words.length
    let randStartIndex = Math.floor(Math.random() * (wordsArrLength))
    let startWord = this.words[randStartIndex]
    this.phrase.push(startWord)

    this.getNextWord(startWord)

    return this.stringPhrase;
  }

  getNextWord(startWord){
    let wordArrayLength = this.chains[startWord].length
    let randWordIndex = Math.floor(Math.random() * (wordArrayLength))
    let nextWord = this.chains[startWord][randWordIndex]


    if (nextWord === null || this.phrase.length === this.maxWords){
      this.stringPhrase = this.phrase.join(" ")
      console.log(this.stringPhrase)
      return this.stringPhrase
    } else {
      this.phrase.push(nextWord)
      this.getNextWord(nextWord)
    }
  }
}



module.exports = {
  MarkovMachine: MarkovMachine
};