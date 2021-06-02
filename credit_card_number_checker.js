// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
// apply Luhn algorithm
const validateCred = arr => {
  // as length of array is being used a number of times, calculate it once here to save doing it over & over later
  const arrayLength = arr.length;
  // put check digit in first as the temporary array is being declared and assigned anyway
  const tempArray = [arr[arrayLength - 1]];
  // now add each of the numbers that will need to be summed into the temporary array (along with the check digit)
  for (i = 1; i < arr.length; i++) {
    /* iterating with increment rather than decrement as it's easier to identify odd/even 
     * digits from the end of an unknown length of array this way
     */
    if (i % 2 !== 0) {
      // for odd numbers, counting from the end of the array, do the doubling and minusing bit
      const numToAdd = arr[arrayLength - (1 + i)] * 2;
      numToAdd <= 9 ? tempArray.push(numToAdd) : tempArray.push(numToAdd - 9);
    } else {
      // otherwise just add the digit without changing it
      tempArray.push(arr[arrayLength - (1 + i)]);
    }
  }
  // finally, return T/F for if the sum of all the digits in the temporary array modulo 10 is zero
  return (tempArray.reduce((acc, curr) => acc + curr)) % 10 === 0;
}

// test code to see if validateCred is working
const validateAllArrays = arr => {
  arr.forEach((arr, index) => {
    console.log(`array ${index}: ${validateCred(arr)}`);
  });
};

const findInvalidCards = arr => {
  const returnArray =[];
  arr.forEach(innerArray => {
    // make use of validateCred to check each nested array and add to the returnArray if required
    if (!validateCred(innerArray)) returnArray.push(innerArray);
  });
  return returnArray;
};

const idInvalidCardCompanies = arr => {
  const returnArray =[];
  arr.forEach(card => {
    // get 1st digit of each card and check with a switch statement
    switch (card[0]) {
      case 3:
        if (!returnArray.includes('Amex (American Express)')) returnArray.push('Amex (American Express)');
        break;
      case 4:
        if (!returnArray.includes('Visa')) returnArray.push('Visa');
        break;
      case 5:
        if (!returnArray.includes('Mastercard')) returnArray.push('Mastercard');
        break;
      case 6:
        if (!returnArray.includes('Discover')) returnArray.push('Discover');
        break;
      default:
        if (!returnArray.includes('Company not found')) returnArray.push('Company not found');
        break;
    }
  });
  return returnArray;
};

//validateAllArrays();
//console.log(findInvalidCards(batch));
//console.log(idInvalidCardCompanies(findInvalidCards(batch)));




