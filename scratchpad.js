const { Zray, Zob } = require("./javascript-prototypes.js");

let arr = [1, 3, false, "", "", "", 3, 5];

let a = new Zray(arr);
let b = 3;
let c = "asdf";

console.log(b.isin(a));
