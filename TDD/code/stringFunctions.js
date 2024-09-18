function reverseString(str) {
  return str.split("").reverse().join("");
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { reverseString, capitalizeString };
