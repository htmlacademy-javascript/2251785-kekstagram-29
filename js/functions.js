// const lengthCheck = (string, length) => string.length <= length ? 'true' : 'false';

// const palindromeCheck = (string) => {
//   const normalize = string.replaceAll().toLowerCase();
//   let invert = '';

//   for (let i = normalize.length - 1; i >= 0; i--) {
//     invert += normalize[i];
//   }

//   return normalize === invert ? 'true' : 'false';
// };

// const getNumber = (string) => {
//   if (typeof string === 'number') {
//     string = string.toString();
//   }

//   let number = '';
//   for (let i = 0; i < string.length; i++) {
//     const letter = parseInt(string[i], 10);

//     if (!isNaN(letter)) {
//       number += letter;
//     }
//   }

//   if (number === '') {
//     number = NaN;
//   }

//   return parseInt(number, 10);
// };

const timeCheck = (startWork, endWork, startMeeting, durationMeeting) => {
  const parse = (string) => parseInt(string, 10);

  // Подсчёт окончания встречи
  startMeeting = startMeeting.split(':');
  const endMeeting = startMeeting;
  endMeeting[0] = parse(endMeeting[0]);
  endMeeting[1] = parse(endMeeting[1]);
  if (durationMeeting < 60) {
    endMeeting[1] = durationMeeting;
  } else {
    endMeeting[0] += ~~(durationMeeting / 60);
    endMeeting[1] += durationMeeting % 60;
  }

  startWork = startWork.split(':');
  endWork = endWork.split(':');
  startWork[0] = parse(startWork[0]);
  startWork[1] = parse(startWork[1]);
  endWork[0] = parse(endWork[0]);
  endWork[1] = parse(endWork[1]);

  if (endMeeting[0] > endWork[0] || endMeeting[0] < startWork[0]) {
    return 'false';
  } else {
    return 'true';
  }
};

console.log(timeCheck('08:00', '17:30', '14:00', 90)); // true
console.log(timeCheck('8:0', '10:0', '8:0', 120)); // true
console.log(timeCheck('08:00', '14:30', '14:00', 90)); // false
console.log(timeCheck('14:00', '17:30', '08:0', 90)); // false
console.log(timeCheck('8:00', '17:30', '08:00', 900)); // false
