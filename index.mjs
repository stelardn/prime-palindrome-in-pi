import fetch from 'node-fetch';

function verifyPalindrome(string) {
  for (let j = 0; j <= 9; j++) {
    if (string[j] !== string[20 - j]) {
      return false;
    }
  }
  return true;
}

function verifyPrime(number) {
  for (let k = 2; k < number; k++) {
    if (number % k === 0) {
      return false;
    }
  }
  return true;
}

let i = 1;
let final = false;

async function getPi(i) {
  const section = fetch(`https://api.pi.delivery/v1/pi?start=${i}&numberOfDigits=1000`)
    .then(response => response.json())
    .then(data => data.content)
    .then(bigSection => {
      for (let j = 0; j <= 979; j++) {
        const smallSection = bigSection.slice(j, j + 21);

        const isPalindrome = verifyPalindrome(smallSection);

        if (isPalindrome) {
          console.log(smallSection + ' is palindrome.......................');

          const isPrime = verifyPrime(Number(smallSection));

          if (isPrime) {
            console.log(smallSection);
            return 'FOUND IT';
          }

        }

        if (j === 979) {
          const pos = i + j;
          console.log(smallSection + '-----' + pos);
          i = i + 979;
          console.log('New fetch comming...');
          getPi(i);
        }
      }
    })
}

getPi(24935881);

