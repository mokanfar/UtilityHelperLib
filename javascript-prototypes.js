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

Zray.prototype.notin = Zray.prototype.missingfrom = Zray.prototype.returnvaluesmissingfromarray = Zray.prototype.whichvaluesarenotin = Zray.prototype.filternotin = function (
  arr
) {
  //filters from arr1 that is found in arr2
  const s = new Set(arr);
  return this.filter((x) => !s.has(x));
};

Zray.prototype.removethatareincomparedarraygreedy = Zray.prototype.removeallthatareingreedy = function (
  arr
) {
  arr.map((x) => this.removeall(x));
  return this;
};

Zray.prototype.missingthatsin = Zray.prototype.filterwhichvaluesmissingfromthisarray = function (
  arr
) {
  const s = new Set(this);
  return arr.filter((x) => !s.has(x));
};

Zray.prototype.sub = Zray.prototype.rep = function (val, substitution = "") {
  let idx = this.indexOf(val);
  this.splice(idx, 1, substitution);
  return this;
};

Zray.prototype.remove = function (val) {
  let idx = this.indexOf(val);
  this.splice(idx, 1);
  return this;
};

Zray.prototype.removeall = Zray.prototype.greedyremoveall = Zray.prototype.removeallwherevalueis = Zray.prototype.removeevery = function (
  val
) {
  let idx = this.indexOf(val);
  if (idx !== -1) {
    this.splice(idx, 1);
    this.removeall(val);
  }
  return this;
};

Zray.prototype.filternongreedy = Zray.prototype.filteroutthatsinnonegreedy = Zray.prototype.filter1by1iterablyfrom = Zray.prototype.filtereachonebyone = Zray.prototype.filtersafeoutfromarrayvalsof = Zray.prototype.removefromarray = function (
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

Zray.prototype.removeallindexeswherevaluesarein = Zray.prototype.removefromlistofindexes = Zray.prototype.removebyindexesnongreedy = Zray.prototype.removebyindexfromarray = function (
  arr
) {
  arr.map((x) => this.splice(x, 1, "#DELETED"));
  this.removeall("#DELETED");
  return this;
};

Zray.prototype.removenongreedyiterablyfrom = Zray.prototype.remove1by1iterablyfrom = Zray.prototype.removeiterativelyfromarr = Zray.prototype.removefromarray = function (
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

Zray.prototype.suball = Zray.prototype.substitutealloccurencesofvalue = function (
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

Zray.prototype.filtermissingeither = Zray.prototype.filtermissingboth = Zray.prototype.filtermissingfromboth = Zray.prototype.filteralsomissingfromarray = Zray.prototype.missinginboth = Zray.prototype.filtermissingineitherorarray = function (
  arr
) {
  //removes from arr1 that is found in arr2
  const s = new Set(arr);
  return this.filter((x) => !s.has(x));
};

Zray.prototype.unique = function () {
  let a = [...new Set(this)];
  return a[0];
};

Zray.prototype.srt = function (direction = null) {
  if (direction) {
    return this.sort((a, b) => b - a);
  }

  return this.sort((a, b) => a - b);
};

Zray.prototype.uniquewith = Zray.prototype.diff = Zray.prototype.diffwith = Zray.prototype.filtermissing = Zray.prototype.difference = function (
  arr
) {
  return [
    ...new Set([
      ...this.filter((v) => !arr.includes(v)),
      ...arr.filter((v) => !this.includes(v)),
    ]),
  ];
};

Zray.prototype.addmissing = Zray.prototype.addunique = Zray.prototype.addmissingfromarray = function (
  arr
) {
  const s = new Set(this);
  this.push(...arr.filter((x) => !s.has(x)));
  return this;
};

Zray.prototype.duplicates = Zray.prototype.dupe = Zray.prototype.findduplicates = Zray.prototype.showdupes = Zray.prototype.filterduplicates = Zray.prototype.dupes = function () {
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

Zray.prototype.notin = Zray.prototype.missingfromarray = Zray.prototype.whichvaluesarenotin = Zray.prototype.filternotinarray = function (
  arr
) {
  //filters from arr1 that is found in arr2
  const s = new Set(arr);
  return this.filter((x) => !s.has(x));
};

Number.prototype.isin = function (arr) {
  return arr.indexOf(this.valueOf()) !== -1;
};

Number.prototype.removeallingreedy = function (arr) {
  arr.removeall(this.valueOf());
  return arr;
};
Number.prototype.isset = function (obj) {
  return _.has(obj, this.valueOf());
};
Number.prototype.alllocationsin = Number.prototype.alloccurrenceindexesin = Number.prototype.allindexesinside = Number.prototype.allindexesin = function (
  arr
) {
  return arr
    .map((e, i) => (e === this.valueOf() ? i : ""))
    .filter((x) => x !== "");
};

String.prototype.isin = String.prototype.has = function (v) {
  return v.includes(this.valueOf());
};
String.prototype.isset = function (obj) {
  return _.has(obj, this.valueOf());
};
String.prototype.locationof = function (v) {
  return v.indexOf(this.valueOf());
};

String.prototype.alllocationsin = String.prototype.alloccurrenceindexesin = String.prototype.allindexesinside = String.prototype.allindexesin = function (
  arr
) {
  return arr.map((e, i) => (e === value ? i : "")).filter(this.valueOf());
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

String.prototype.rep = function (what, wit) {
  let what2 = new RegExp(what, "g");
  return this.replace(what2, wit);
};

String.prototype.numberofoccurencesin = Number.prototype.numberofoccurencesin = function (
  arr
) {
  return arr.filter((x) => x == this.valueOf()).length;
};

Zray.prototype.filteroutgarbage = function () {
  return _.compact(this);
};

Zray.prototype.jsonfindfirstwherekeyvalueis = function (fn) {
  return _.find(this, fn);
};

Zray.prototype.combinewithandremovedupes = function (...arr) {
  return _.union(this, ...arr);
};

Zray.prototype.removeduplicates = Zray.prototype.removedupes = Zray.prototype.deletedupe = function () {
  this.splice(0, this.length, ...new Set(this));
  return this;
};
Zray.prototype.getalljsonvalueswhere = Zray.prototype.getalljsonrecords = Zray.prototype.findalljsonrecordsthatmatch = function () {
  return _.filter(this, matcher(obj));
};
Zray.prototype.filterallinjsonobjexcept = function (arr) {
  return _.pick(this, arr);
};

Zray.prototype.removewhere = function (fn) {
  _.remove(this, fn);
  return this;
};

class Zob extends Object {
  constructor(name) {
    super();
  }
}

Zob.prototype.filtereverythingexcept = function (v) {
  return _.pick(this, v);
};

Zob.prototype.without = function (v) {
  return _.omit(this, v);
};

Zob.prototype.getvaluesasarray = function () {
  return _.values(this);
};

Zob.prototype.getprop = Zob.prototype.get = Zob.prototype.getvalue = Zob.prototype.getkey = function (
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

Zob.prototype.getkeysasarray = function () {
  return _.keys(this);
};

Zob.prototype.haskey = function (v) {
  return _.has(this, v);
};

Zob.prototype.hasval = function (v) {
  return [...this.getvaluesasarray()].includes(v);
};
Zob.prototype.valueOf = function (v) {
  return [...this.getvaluesasarray()].includes(v);
};

Zob.prototype.deepsearchforpropwhere = function (obj) {
  return _.isMatch(this, obj);
};

Zob.prototype.convertkeysintovaluesandviceversa = Zob.prototype.viceversa = Zob.prototype.flip = Zob.prototype.keysvaluesandvaluesaskeys = Zob.prototype.switchkeysandvalues = function () {
  return _.invert(this);
};

Zob.prototype.findkeynamewhereval = function (val) {
  return _.findKey(this, (val) => val === 1);
};

Zob.prototype.mergewithobj = function (obj) {
  return _.extendDeep(this, obj);
};
