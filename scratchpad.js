const {
  arr1,
  arr2,
  obj1,
  obj2,
  Arr,
  Obj,
  ArrayHashMap,
} = require("./lib/javascript-prototypes.js");

b = "abcdddeeeeaabbbcd";
counter = [];
letterchange = null;

let a = Arr(b.split(""));
ArrayHashMap(b);
a;

a.forEach((v, i) => {
  if (a[i - 1] == a[i] && a[i + 1] == a[i]) {
    counter.push([v, i - 1]);
  }
  if (a[i] !== a[i + 1]) letterchange = i;
});

counter;
