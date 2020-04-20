_ = require("./licia-data-manip.js");
R = require("./ramda.custom.js");

class Zray extends Array {
  constructor(...args) {
    super(...args);
  }
}
Zray.prototype.sum = function () {
  var total = 0;
  for (var i = 0; i < this.length; i++) {
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
  var self = this.sort();
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

Zray.prototype.filterfromthisarraythatismissinginarray = Zray.prototype.notin = Zray.prototype.missingfrom = Zray.prototype.returnvaluesmissingfromarray = Zray.prototype.whichvaluesarenotin = Zray.prototype.filternotin = function (
  arr
) {
  //filters from arr1 that is found in arr2
  const s = new Set(arr);
  return this.filter((x) => !s.has(x));
};

Zray.prototype.removegreedyfromthisarraythatareinarray = Zray.prototype.removeallthatareingreedy = function (
  arr
) {
  arr.map((x) => this.removeall(x));
  return this;
};
// Zray.prototype.jsonliftvalasindexofobjentry = function (id) {
//   return R.indexBy((x) => this[0]["a"], this);
// };

Zray.prototype.findmissingthatsinarray = Zray.prototype.missingthatsin = Zray.prototype.filtermissingvaluesfromthisarray = Zray.prototype.findallmissingvaluesfromthisarray = function (
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

Zray.prototype.removeallwherevalis = Zray.prototype.removeall = Zray.prototype.greedyremoveall = Zray.prototype.removeallwherevalueis = Zray.prototype.removeevery = function (
  val
) {
  let idx = this.indexOf(val);
  if (idx !== -1) {
    this.splice(idx, 1);
    this.removeall(val);
  }
  return this;
};

Zray.prototype.filternongreedy = Zray.prototype.filteroutnotgreedythatsin = Zray.prototype.filter1by1iterablyfrom = Zray.prototype.filterouteachonebyone = Zray.prototype.filtersafeoutfromarrayvalsof = Zray.prototype.removefromarray = function (
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

Zray.prototype.removeallfromarrayofindexes = Zray.prototype.removefromlistofindexes = Zray.prototype.removebyindexesnongreedy = Zray.prototype.removebyindexfromarray = function (
  arr
) {
  arr.map((x) => this.splice(x, 1, "#DELETED"));
  this.removeall("#DELETED");
  return this;
};

Zray.prototype.removenongreedyiterablyfrom = Zray.prototype.remove1by1iterablyfrom = Zray.prototype.removenongreedyfromvalsinarr = Zray.prototype.removefromarray = function (
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

Zray.prototype.replacealloccurrencesofvalue = Zray.prototype.suball = Zray.prototype.substituteallthatmatchvalue = Zray.prototype.substitutealloccurencesofvalue = function (
  val
) {
  let idx = this.indexOf(val);
  if (idx !== -1) {
    this.splice(idx, 1, "");
    this.sub(val);
  }
  return this;
};

Zray.prototype.getsamevaluefromarray = Zray.prototype.samein = Zray.prototype.filtersamevaluesinarray = Zray.prototype.filterallthathassamein = Zray.prototype.filtersamevaluesthatsin = Zray.prototype.hasthesamein = function (
  arr
) {
  //filters from arr1 that are found in arr2
  const s = new Set(arr);
  return this.filter((x) => s.has(x));
};
Zray.prototype.getmissingfromthisandarray = Zray.prototype.filtermissingeither = Zray.prototype.filtermissingboth = Zray.prototype.filtermissingfromboth = Zray.prototype.filtersymmetricdifference = Zray.prototype.missinginboth = Zray.prototype.filtermissingineitherorarray = function (
  arr
) {
  //removes from arr1 that is found in arr2
  const s = new Set(arr);
  return this.filter((x) => !s.has(x));
};

Zray.prototype.finduniqueinself = Zray.prototype.getunique = Zray.prototype.unique = function () {
  let a = [...new Set(this)];
  return a[0];
};

Zray.prototype.srt = function (direction = null) {
  if (direction) {
    return this.sort((a, b) => b - a);
  }

  return this.sort((a, b) => a - b);
};
Zray.prototype.filterdifferencewitharray = Zray.prototype.uniquewithcomparedarray = Zray.prototype.diff = Zray.prototype.diffwith = Zray.prototype.filtermissing = Zray.prototype.difference = function (
  arr
) {
  return [
    ...new Set([
      ...this.filter((v) => !arr.includes(v)),
      ...arr.filter((v) => !this.includes(v)),
    ]),
  ];
};

Zray.prototype.addmissing = Zray.prototype.adduniquefromarr = Zray.prototype.addmissingfromarray = function (
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
Zray.prototype.movevalueatindextoindex = Zray.prototype.movestartidxendidx = Zray.prototype.shiftvaluefromindextoindex = Zray.prototype.shiftstartidxendidx = Zray.prototype.shiftindexfromto = function (
  start,
  end
) {
  let tmp = R.move(start, end, this);
  replaceArray(this, arr);
  return this;
};

Zray.prototype.getduplicates = Zray.prototype.showdupes = Zray.prototype.duplicates = Zray.prototype.dupe = Zray.prototype.findduplicates = Zray.prototype.showdupes = Zray.prototype.filterduplicates = Zray.prototype.dupes = function () {
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

Zray.prototype.has = Zray.prototype.contains = function (v) {
  return Zray.prototype.indexOf.call(this, v) !== -1;
};

Zray.prototype.srt = function (direction = null) {
  if (direction) {
    return this.sort((a, b) => b - a);
  }
  return this.sort((a, b) => a - b);
};

Zray.prototype.countnumberofoccurencesof = function (v) {
  return this.filter((x) => x == v).length;
};

Zray.prototype.getvaluesmissingfromarray = Zray.prototype.notin = Zray.prototype.missingfromarray = Zray.prototype.whichvaluesarenotin = Zray.prototype.filternotinarray = function (
  arr
) {
  //filters from arr1 that is found in arr2
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

Zray.prototype.removeduplicates = Zray.prototype.removedupes = Zray.prototype.deletedupe = function () {
  let tmp = new Set(this);
  replaceArray(this, tmp);
  return this;
};
Zray.prototype.jsongetallvalueswhere = Zray.prototype.getalljsonrecords = Zray.prototype.findalljsonrecordsthatmatch = function () {
  return _.filter(this, matcher(obj));
};
Zray.prototype.jsonfilterallexcept = function (arr) {
  return _.pick(this, arr);
};
Zray.prototype.insertvalueofintoindex = function (val, idx) {
  let tmp = R.insert(idx, val, this);
  this.splice(0, this.length, ...tmp);
};

Zray.prototype.removewherebasedonfunctioninput = function (fn) {
  _.remove(this, fn);
  return this;
};

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
Zob.prototype.filtereverythingexcept = function (v) {
  return _.pick(this, v);
};

Zob.prototype.without = function (v) {
  return _.omit(this, v);
};

Zob.prototype.values = Zob.prototype.getvaluesasarray = function () {
  return _.values(this);
};

Zob.prototype.getprop = Zob.prototype.get = Zob.prototype.getvalueof = Zob.prototype.getkey = function (
  v
) {
  return _.safeGet(this, v);
};

Zob.prototype.setprop = Zob.prototype.add = Zob.prototype.set = function (
  ...v
) {
  return _.safeSet(this, ...v);
};

Zob.prototype.delete = Zob.prototype.del = Zob.prototype.removekey = Zob.prototype.deleteprop = function (
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

Zob.prototype.convertkeysintovaluesandviceversa = Zob.prototype.viceversa = Zob.prototype.flip = Zob.prototype.keysvaluesandvaluesaskeys = Zob.prototype.switchkeysandvalues = Zob.prototype.invert = function () {
  return _.invert(this);
};

Zob.prototype.findkeynamewhereval = Zob.prototype.returnkeywherevalueis = function (
  val
) {
  return _.findKey(this, (x) => x == val);
};

Zob.prototype.mergewithobj = function (obj) {
  return R.mergeAll([this, obj]);
};

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
Number.prototype.countnumberofoccurencesinarr = function (arr) {
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
String.prototype.countnumberofoccurencesinarr = function (arr) {
  return arr
    .map((e, i) => (e == this.valueOf() ? i : ""))
    .filter((x) => x !== "").length;
};

Number.prototype.findalloccurencesinarrayandreturnarrayindices = Number.prototype.alllocationsin = Number.prototype.alloccurrenceindexesin = Number.prototype.allindexesinside = Number.prototype.allindexesin = function (
  arr
) {
  return arr
    .map((e, i) => (e === this.valueOf() ? i : ""))
    .filter((x) => x !== "");
};
String.prototype.has = function (v) {
  return this.valueOf().includes(v);
};

String.prototype.isakeyof = String.prototype.isakeyinsideobj = function (obj) {
  return _.keys(obj).includes(this.valueOf());
};

Number.prototype.existsinobj = Number.prototype.isakeyof = Number.prototype.isakeyinsideobj = function (
  obj
) {
  return _.keys(obj).includes(this.toString());
};

String.prototype.isinavalueobj = function (obj) {
  return _.values(obj).includes(this.valueOf());
};

Number.prototype.isinavaluefoundinsideobj = function (obj) {
  return _.values(obj).includes(this.valueOf());
};

String.prototype.isin = String.prototype.isinarray = function (v) {
  return v.includes(this.valueOf());
};
String.prototype.issetinobj = function (obj) {
  return _.has(obj, this.valueOf());
};

String.prototype.findinarrayreturnindex = String.prototype.indexin = function (
  v
) {
  return v.indexOf(this.valueOf());
};

String.prototype.alllocationsin = String.prototype.findalloccurrencereturnindexarrayin = String.prototype.allindexesinside = String.prototype.allindexesin = function (
  arr
) {
  return arr
    .map((e, i) => (e === this.valueOf() ? i : ""))
    .filter((x) => x !== "");
};

String.prototype.num = function () {
  return parseInt(this.valueOf());
};

Number.prototype.abs = function () {
  return Math.abs(this.valueOf());
};

Number.prototype.str = function () {
  return this.toString();
};

Number.prototype.indexin = function (arr) {
  return arr.indexOf(this.toString());
};

String.prototype.rep = function (what, wit) {
  let what2 = new RegExp(what, "g");
  return this.replace(what2, wit);
};

String.prototype.numberofoccurencesin = Number.prototype.numberofoccurencesin = function (
  arr
) {
  return arr.filter((x) => x == this.valueOf()).length;
};

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
  return hashmap;
};

const replaceArray = function (arr, tmp) {
  arr.splice(0, arr.length, ...tmp);
  return;
};
module.exports = {
  Arr,
  Obj,
  Zob,
  Zray,
  ArrayHashMap,
};
