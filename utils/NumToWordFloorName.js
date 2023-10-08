function NumToWordFloorName(number) {
  let result;
  let quotient = Math.floor(number / 10);
  if (number === 0) {
    result = "ground";
  } else if (number % 10 === 1 && quotient !== 1) {
    result = number + "st";
  } else if (number % 10 === 2 && quotient !== 1) {
    result = number + "nd";
  } else if (number % 10 === 3 && quotient !== 1) {
    result = number + "rd";
  } else {
    result = number + "th";
  }
  return result;
}

export default NumToWordFloorName;
