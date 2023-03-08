/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.dictionary = new Object();

    
    /************************     I have no idea why this didn't work *************************/
    // for (let index in this.words){
    //   //if the word isn't already in the dictionary add it
    //   let keyword = this.words[index];
    //   let nextword = this.words[index + 1];
    //   if(this.dictionary[keyword] === undefined){
    //     this.dictionary[keyword] = [];
    //   }
    //   //append the next word in the list to this items 'possible next words' list
    //   if (nextword === undefined) this.dictionary[keyword].push(null)
    //   else this.dictionary[keyword].push(nextword)
    // }
    /*********************************************************************************************/


    for (let [index, keyword] of this.words.entries()){
      //if the word isn't already in the dictionary add it
      let nextword = this.words[index + 1];

      if(this.dictionary[keyword] === undefined){
        this.dictionary[keyword] = [];
      }
      //append the next word in the list to this items 'possible next words' list
      if (nextword === undefined) this.dictionary[keyword].push(null);
      else this.dictionary[keyword].push(nextword);
    }


  }


  static choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }


  /** return random text from chains */
  makeText(numWords = 100) {

    const keywords = Object.keys(this.dictionary);
    let output = "";
    let nextWord;
    let wordCount = 0;
    let keyword;
    //Keep looping as long as we have less than 100 words
    while (wordCount < numWords){

      //pick random word from scratch: either at the begenning or after we have hit 'null' in the previous cycle
      keyword = MarkovMachine.choice(keywords);
      //add word
      output += keyword + " ";
      wordCount++;

      while (wordCount < numWords && nextWord !== null){
        
        //get the next word
        let options = this.dictionary[keyword];
        nextWord = MarkovMachine.choice(options);
        //add word
        if (nextWord !== null){
          output += nextWord + " ";
          wordCount++;

          //update keyword: We are now looking for a different keyword
          keyword = nextWord;
        }

      }
    }

    return output;
    
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// mm.makeText(numWords=5);

module.exports = { MarkovMachine };

