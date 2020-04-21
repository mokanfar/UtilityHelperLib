_ = require("./licia-data-manip.js");
R = require("./ramda.custom.js");

//==============================================
class Zray extends Array {
  constructor(...args) {
    super(...args);
  }
}

Zray.prototype.sum = function () {
  let total = 0;
  for (let i = 0; i < this.length; i++) {
    total += this[i];
  }
  return total;
};

Zray.prototype.first = function () {
  return this[0];
};

Zray.prototype.last = function () {
  return this[this.length - 1];
};

Zray.prototype.average = function () {
  return this.sum() / this.length;
};

Zray.prototype.range = function () {
  let self = this.sort();
  return {
    min: self[0],
    max: self[this.length - 1],
  };
};

Zray.prototype.isempty = function () {
  return this.length == 0;
};

Zray.prototype.max = function () {
  return Math.max(...this);
};

Zray.prototype.min = function () {
  return Math.min(...this);
};

Zray.prototype.removeallvaluesfromarray = Zray.prototype.removeallthatareingreedy = Zray.prototype.removegreedyfromthisarraythatareinarray = function (
  arr
) {
  arr.map((x) => this.removeall(x));
  return this;
};

// Zray.prototype.jsonliftvalasindexofobjentry = function (id) {
//   return R.indexBy((x) => this[0]["a"], this);
// };

Zray.prototype.findallwheremissinginarray = Zray.prototype.findallmissinginarr = function (
  arr
) {
  const s = new Set(this);
  return arr.filter((x) => !s.has(x));
};

Zray.prototype.sub = Zray.prototype.substitute = Zray.prototype.rep = function (
  val,
  substitution = ""
) {
  let idx = this.indexOf(val);
  this.splice(idx, 1, substitution);
  return this;
};

Zray.prototype.remove = function (val) {
  let idx = this.indexOf(val);
  this.splice(idx, 1);
  return this;
};

Zray.prototype.removeall = Zray.prototype.removeevery = Zray.prototype.greedyremoveall = Zray.prototype.removeallwherevalueis = Zray.prototype.removeallwherevalueis = function (
  val
) {
  let idx = this.indexOf(val);
  if (idx !== -1) {
    this.splice(idx, 1);
    this.removeall(val);
  }
  return this;
};

Zray.prototype.filternongreedy = Zray.prototype.removefromarray = Zray.prototype.filterouteachonebyone = Zray.prototype.filter1by1iterablyfrom = Zray.prototype.filterout1by1fromarray = Zray.prototype.filteroutnotgreedythatsin = Zray.prototype.filtersafeoutfromarrayvalsof = function (
  arr
) {
  let tmp = [...this];
  arr.map((x) => {
    if (x.isin(tmp)) {
      tmp.sub(x, "#REMOVED");
    }
  });
  return tmp.filter((x) => x != "#REMOVED");
};

Zray.prototype.removebyindexfromarray = Zray.prototype.removefromlistofindexes = Zray.prototype.removebyindexesnongreedy = Zray.prototype.removeallfromarrayofindexes = function (
  arr
) {
  arr.map((x) => this.splice(x, 1, "#DELETED"));
  this.removeall("#DELETED");
  return this;
};

Zray.prototype.removenongreedyiterablyfrom = Zray.prototype.remove1by1iterablyfromarray = Zray.prototype.removenongreedyfromvalsinarr = Zray.prototype.removefromarray = function (
  arr
) {
  arr.map((x) => {
    if (x.isin(this)) {
      this.sub(x, "#REMOVED");
    }
  });
  this.removeall("#REMOVED");
  return this;
};

Zray.prototype.suball = Zray.prototype.substituteallthatmatchvalue = Zray.prototype.replacealloccurrencesofvalue = Zray.prototype.substitutealloccurencesofvalue = function (
  val
) {
  let idx = this.indexOf(val);
  if (idx !== -1) {
    this.splice(idx, 1, "");
    this.sub(val);
  }
  return this;
};

Zray.prototype.samein = Zray.prototype.hasthesamein = Zray.prototype.getsamevaluefromarray = Zray.prototype.filterallthathassamein = Zray.prototype.filtersamevaluesinarray = Zray.prototype.filtersamevaluesthatsin = function (
  arr
) {
  const s = new Set(arr);
  return this.filter((x) => s.has(x));
};

// Zray.prototype. =
// Zray.prototype.filtermissingeither =
// Zray.prototype.filtermissingboth =
// Zray.prototype.filtermissingfromboth =
// Zray.prototype.filtersymmetricdifference =
// Zray.prototype.missinginboth =
// Zray.prototype.filtermissingineitherorarray =
// function(
//     arr
// ) {
//     //removes from arr1 that is found in arr2
//     const s = new Set(arr);
//     return this.filter((x) => !s.has(x));
// };

Zray.prototype.unique = Zray.prototype.getunique = Zray.prototype.finduniqueinself = Zray.prototype.filteroutdupesinself = function () {
  let a = [...new Set(this)];
  return a[0];
};

Zray.prototype.srt = function (direction = null) {
  if (direction) {
    return this.sort((a, b) => b - a);
  }

  return this.sort((a, b) => a - b);
};

Zray.prototype.diff = Zray.prototype.diffwith = Zray.prototype.difference = Zray.prototype.filtermissing = Zray.prototype.symmetricdifferencewith = Zray.prototype.uniquewithcomparedarray = Zray.prototype.filterdifferencewitharray = function (
  arr
) {
  return [
    ...new Set([
      ...this.filter((v) => !arr.includes(v)),
      ...arr.filter((v) => !this.includes(v)),
    ]),
  ];
};

Zray.prototype.addmissing = Zray.prototype.adduniquefromarr = Zray.prototype.addallmissingfromarray = function (
  arr
) {
  const s = new Set(this);
  this.push(...arr.filter((x) => !s.has(x)));
  return this;
};

Zray.prototype.jsonarrayfiltervalues = function (...args) {
  let k = [];
  for (let arg of args) k.push(arg);
  return R.project(k, this);
};

Zray.prototype.shiftindexfromto = Zray.prototype.movestartidxendidx = Zray.prototype.shiftstartidxendidx = Zray.prototype.movevalueatindextoindex = Zray.prototype.shiftvaluefromindextoindex = function (
  start,
  end
) {
  let tmp = R.move(start, end, this);
  replaceArray(this, arr);
  return this;
};

Zray.prototype.dupe = Zray.prototype.dupes = Zray.prototype.showdupes = Zray.prototype.showdupes = Zray.prototype.duplicates = Zray.prototype.getduplicates = Zray.prototype.findduplicates = Zray.prototype.filterduplicates = function () {
  let duplicates = this.reduce(function (acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
    return acc;
  }, []);
  return duplicates;
};

Zray.prototype.pos = Zray.prototype.idx = Zray.prototype.position = function (
  v
) {
  return Zray.prototype.indexOf.call(this, v);
};

Zray.prototype.has = Zray.prototype.hasvalue = Zray.prototype.contains = function (
  v
) {
  return Zray.prototype.indexOf.call(this, v) !== -1;
};

Zray.prototype.countnumberofoccurencesof = function (v) {
  return this.filter((x) => x == v).length;
};

Zray.prototype.notin = Zray.prototype.missingfromarray = Zray.prototype.filternotinarray = Zray.prototype.getvaluesmissingfromarray = function (
  arr
) {
  const s = new Set(arr);
  return this.filter((x) => !s.has(x));
};

Zray.prototype.filteroutgarbage = function () {
  return _.compact(this);
};

Zray.prototype.removegarbage = function () {
  let tmp = _.compact(this);
  replaceArray(this, tmp);
  return this;
};

Zray.prototype.jsonfindfirstwherekeyvalueis = function (fn) {
  return _.find(this, fn);
};

Zray.prototype.combinewithandremovedupes = function (...arr) {
  let tmp = _.union(this, ...arr);
  replaceArray(this, tmp);
  return this;
  //this.splice(0, this.length, ...tmp);
};

Zray.prototype.removeduplicates = Zray.prototype.removedupes = function () {
  let tmp = new Set(this);
  replaceArray(this, tmp);
  return this;
};

Zray.prototype.getalljsonrecords = Zray.prototype.jsongetallvalueswhere = Zray.prototype.findalljsonrecordsthatmatch = function () {
  return _.filter(this, matcher(obj));
};

Zray.prototype.jsonfilterallexcept = function (arr) {
  return _.pick(this, arr);
};

Zray.prototype.insertvalueofintoindex = function (val, idx) {
  let tmp = R.insert(idx, val, this);
  this.splice(0, this.length, ...tmp);
};

//TODO: test this make sure it removes instead of immutability
Zray.prototype.removebyapplyingfilterfunction = function (fn) {
  _.remove(this, fn);
  return this;
  //replaceArray(this, arr);
};

//==============================================

//==============================================
class Zob extends Object {
  constructor(args) {
    super(args);
    Object.assign(this, args);
  }
}

Zob.prototype.applyarraylikemapwithfunction = function (fn) {
  return R.mapObjIndexed(fn, this);
};

Zob.prototype.setkeytovalueifnotexist = Zob.prototype.setkeyifnotexistto = function (
  key,
  val
) {
  if (R.pathOr(val, key, this) == val) {
    this[key] = val;
  }
  return this;
};

Zob.prototype.filteroutexceptkeysinarray = function (arr) {
  return R.pickall(arr, this);
};

Zob.prototype.withoutarraylistofkeys = function (v) {
  return _.omit(this, v);
};

Zob.prototype.values = Zob.prototype.getvaluesasarray = function () {
  return _.values(this);
};

Zob.prototype.get = Zob.prototype.getkey = Zob.prototype.getprop = Zob.prototype.getvalueof = function (
  v
) {
  return _.safeGet(this, v);
};

Zob.prototype.add = Zob.prototype.set = Zob.prototype.setprop = function (
  ...v
) {
  return _.safeSet(this, ...v);
};

Zob.prototype.del = Zob.prototype.delete = Zob.prototype.removekey = Zob.prototype.deleteprop = function (
  v
) {
  return _.safeDel(this, v);
};

Zob.prototype.keys = Zob.prototype.getkeysasarray = function () {
  return _.keys(this);
};

Zob.prototype.haskey = function (v) {
  return _.has(this, v);
};

Zob.prototype.hasval = Zob.prototype.hasavalueinitsetto = function (v) {
  return [...this.getvaluesasarray()].includes(v);
};

Zob.prototype.deepsearchforpropwhere = function (obj) {
  return _.isMatch(this, obj);
};

Zob.prototype.flip = Zob.prototype.invert = Zob.prototype.viceversa = Zob.prototype.switchkeysandvalues = Zob.prototype.keysvaluesandvaluesaskeys = Zob.prototype.convertkeysintovaluesandviceversa = function () {
  return _.invert(this);
};

Zob.prototype.returnkeywherevalueis = Zob.prototype.findkeynamewherevalueis = function (
  val
) {
  return _.findKey(this, (x) => x == val);
};

//TODO: is this mutable?
Zob.prototype.mergewithobj = function (obj) {
  return new Zob(R.mergeAll([this, obj]));
};

//==============================================

//==============================================

Number.prototype.isin = Number.prototype.isinarray = function (arr) {
  return arr.indexOf(this.valueOf()) !== -1;
};

Number.prototype.removeallingreedy = function (arr) {
  arr.removeall(this.valueOf());
  return arr;
};

Number.prototype.issetinobj = Number.prototype.isset = function (obj) {
  return _.has(obj, this.valueOf());
};

Number.prototype.countnumberofoccurencesin = function (arr) {
  return arr
    .map((e, i) => (e == this.toString() ? i : ""))
    .filter((x) => x !== "").length;
};

Number.prototype.insertintoarrayatindex = String.prototype.insertintoarrayatindex = function (
  idx,
  arr
) {
  arr.splice(0, arr.length, ...R.insert(idx, this.valueOf(), arr));
};

Number.prototype.allindexesin = Number.prototype.alllocationsin = Number.prototype.allindexesinside = Number.prototype.alloccurrenceindexesin = Number.prototype.getallindiceswherevalinarray = Number.prototype.findalloccurencesinarrayandgetarrayindices = function (
  arr
) {
  return arr
    .map((e, i) => (e === this.valueOf() ? i : ""))
    .filter((x) => x !== "");
};

Number.prototype.isakeyin = Number.prototype.isakeyinsideobj = Number.prototype.existsaskeyinobj = function (
  obj
) {
  return _.keys(obj).includes(this.toString());
};

Number.prototype.isinanobjasvalue = function (obj) {
  return _.values(obj).includes(this.valueOf());
};

Number.prototype.abs = function () {
  return Math.abs(this.valueOf());
};

Number.prototype.str = function () {
  return this.toString();
};

Number.prototype.getindexofwhereitisavaluein = function (arr) {
  return arr.indexOf(this.toString());
};
//==============================================

//==============================================

String.prototype.num = function () {
  return parseInt(this.valueOf());
};

String.prototype.rep = function (what, wit) {
  let what2 = new RegExp(what, "g");
  return this.replace(what2, wit);
};

String.prototype.countnumberofoccurencesinarr = function (arr) {
  return arr
    .map((e, i) => (e == this.valueOf() ? i : ""))
    .filter((x) => x !== "").length;
};

String.prototype.has = function (v) {
  return this.valueOf().includes(v);
};

String.prototype.isakeyof = String.prototype.isakeyinsideobj = function (obj) {
  return _.keys(obj).includes(this.valueOf());
};

String.prototype.isinavalueobj = function (obj) {
  return _.values(obj).includes(this.valueOf());
};

String.prototype.isin = String.prototype.isinarray = function (v) {
  return v.includes(this.valueOf());
};

String.prototype.issetinobj = function (obj) {
  return _.has(obj, this.valueOf());
};

String.prototype.findinarrayandreturnindex = String.prototype.indexin = function (
  v
) {
  return v.indexOf(this.valueOf());
};

String.prototype.allindexesin = String.prototype.allindexesinside = String.prototype.getallindiceswherevalueinarray = String.prototype.findalloccurrencereturnindexarrayin = function (
  arr
) {
  return arr
    .map((e, i) => (e === this.valueOf() ? i : ""))
    .filter((x) => x !== "");
};

String.prototype.numberofoccurencesin = Number.prototype.numberofoccurencesin = String.prototype.countnumberofoccurencesin = function (
  arr
) {
  return arr.filter((x) => x == this.valueOf()).length;
};
//==============================================

//==============================================
const Arr = (arr) => {
  return new Zray(...arr);
};

const Obj = (ob) => {
  return new Zob(ob);
};

const ArrayHashMap = (arr) => {
  let hashmap = {};
  for (let c of arr) {
    hashmap[c] = (hashmap[c] || 0) + 1;
  }
  return new Zob(hashmap);
};

const replaceArray = function (arr, tmp) {
  arr.splice(0, arr.length, ...tmp);
  return;
};

let arr1 = Arr(["a", "b", "c", "d", 1, 2, 3, 4]);
let arr2 = Arr(["c", "d", 3]);
let numarray1 = Arr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 100, 200, 300]);
let numarray2 = Arr([5, 66, 22, 33, 44, 7, 88, 99, 10, 11, 2000]);
let obj1 = Obj({ a: 1, b: 2, c: 3, d: 4 });
let obj2 = Obj({ a: 2, e: 3, f: 4, g: 5, h: 6, i: 7 });
let json1 = Arr([
  { id: 12345, key2: "key2 json1 obj 1", key3: { a: 1, b: 2, c: 3 } },
  { id: 23456, key2: "key2 json1 obj 2", b: 2, c: 3, d: 4, e: 5 },
]);
let json2 = Arr([
  { key1: 12345, key2: "key2 json2 obj 1" },
  { key1: 23456, key2: [1, ["a", "b", "c"], 2, 3, 4, 5, 6] },
]);
let str1 = "asdf1";
let str2 = "asdf2";

module.exports = {
  Arr,
  Obj,
  Zob,
  Zray,
  ArrayHashMap,
  arr1,
  arr2,
  numarray1,
  numarray2,
  obj1,
  obj2,
  json1,
  json2,
  str1,
  str2,
};
