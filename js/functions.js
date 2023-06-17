const lengthCheck = (string, length) => string.length <= length ? 'true' : 'false';

const palindromeCheck = (string) => {
  const normalize = string.replaceAll().toLowerCase();
  let invert = '';

  for (let i = normalize.length - 1; i >= 0; i--) {
    invert += normalize[i];
  }

  return normalize === invert ? 'true' : 'false';
};

const getNumber = (string) => {
  if (typeof string === 'number') {
    string = string.toString();
  }

  let number = '';
  for (let i = 0; i < string.length; i++) {
    const letter = parseInt(string[i], 10);

    if (!isNaN(letter)) {
      number += letter;
    }
  }

  if (number === '') {
    number = NaN;
  }

  return parseInt(number, 10);
};

