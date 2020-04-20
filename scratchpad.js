const { Arr, Obj, ArrayHashMap } = require("./lib/javascript-prototypes.js");
g = Arr([
  2,
  2,
  5,
  6,
  2,
  1,
  6,
  7,
  8,
  9,
  3,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  4,
  2,
  23,
  4,
  5,
  111,
  2,
  1,
  1,
]);
s = Arr([
  2,
  6,
  7,
  2,
  1,
  1,
  3,
  2,
  2,
  2,
  2,
  2,
  3,
  5,
  6,
  7,
  8,
  9,
  9,
  9,
  999,
  9,
  9,
  9,
  5,
  2,
  34,
  11,
]);

let counter = 0;
s.forEach((v) => {
  if (v.isinarray(g)) {
    counter = counter + 1;
    g.sub(v);
    s.sub(v);
  }
});

s.removegarbage().srt();
g.removegarbage().srt();
s = Arr(s.filter((x) => x > g[0]));

g.forEach((greed) => {
  s = Arr(s.filter((x) => x > greed));
  if (s.length > 0) {
    counter++;
    s.splice(0, 1, "");
  }
});
counter;
