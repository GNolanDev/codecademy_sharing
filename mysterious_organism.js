// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, basesArray) => {
    return {
        specimenNum: num,
        dna: basesArray,
        mutate() {
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            const possibleNewBases = ['A', 'T', 'C', 'G'].filter(base => base !== this.dna[randomIndex]);
            this.dna[randomIndex] = possibleNewBases[Math.floor(Math.random() * 3)];
            return this.dna;
        },
        compareDNA(comparePAequor) {
          let matchCount = 0;
          for (i = 0; i < this.dna.length; i++) {
              if (this.dna[i] === comparePAequor.dna[i]) matchCount++;
          }
          console.log(`Match between sample ${this.specimenNum} and ${comparePAequor} is: ${matchCount * 100 / this.dna.length}%`);
        },
        willLikelySurvive() {
          let CandGcount = 0;
          this.dna.forEach(letter => {
            if (['C', 'G'].includes(letter)) CandGcount++;
          });
          return (CandGcount / this.dna.length > 0.60);
        }
    };
};

const make30survivors = () => {
  const arrayOfSurvivors = [];
  let idNumber = 1;
  while (arrayOfSurvivors.length < 30) {
    const newpAequor = pAequorFactory(idNumber, mockUpStrand());
    if (newpAequor.willLikelySurvive()) {
      arrayOfSurvivors.push(newpAequor);
      idNumber++;
    }
  }
  return arrayOfSurvivors;
};

const survivorArray = make30survivors();

// test code
//const newThingy1 = pAequorFactory(1, mockUpStrand());
//const newThingy2 = pAequorFactory(2, mockUpStrand());
//console.log(newThingy);
//console.log(newThingy1.compareDNA(newThingy2));
//console.log(newThingy1.willLikelySurvive());
console.log(survivorArray);