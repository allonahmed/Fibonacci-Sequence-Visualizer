//for adding huge numbers
//need to convert to string because JS cannot handle large numbers

export const Add = (arg1, arg2) => {
  let sum = "";
  let r = 0;
  let a1, a2, i;

  // Pick the shortest string as first parameter and the longest as second parameter in my algorithm
  if (arg1.length < arg2.length) {
    a1 = arg1;
    a2 = arg2;
  } else {
    a1 = arg2;
    a2 = arg1;
  }
  a1 = a1.split("").reverse();
  a2 = a2.split("").reverse();

  // Sum a1 and a2 digits
  for (i = 0; i < a2.length; i++) {
    let t = (i < a1.length ? parseInt(a1[i]) : 0) + parseInt(a2[i]) + r;

    sum += t % 10;

    r = t < 10 ? 0 : Math.floor(t / 10);
  }
  // Append the last remain
  if (r > 0) sum += r;

  sum = sum.split("").reverse();

  // Trim the leading "0"
  while (sum[0] == "0") sum.shift();

  return sum.length > 0 ? sum.join("") : "0";
};

export const scientificNotation = (data) => {
  if (data < 2000000000) {
    //if data is less than 2billion, return data in standard form
    return data.toString();
  }
  //toExponential converts numbers into JS scientific notation
  let nData = data.toExponential(6); //6 represents the number of digits after the decimal
  //convert our data to a more standard version so mathjax can format notation better
  let sn = nData.toString().replace("e+", "×10^{");
  sn += "}";
  return sn;
};
