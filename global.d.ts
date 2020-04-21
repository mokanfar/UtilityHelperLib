declare global {
  class Zray<T> extends Array<T> {
  prototype.insertvalueofintoindex(val:number,idx:any);

  }
  class Zob<T> extends Object<T> {}
}

interface String {
  has();
  num();
  rep(what:string, with: any);
  isin();
  indexin();
  isakeyof();
  isinarray();
  issetinobj();
  insertinto();
  allindexesin();
  isinavalueobj();
  alllocationsin();
  isakeyinsideobj();
  allindexesinside();
  numberofoccurencesin();
  insertintoarrayatindex(idx: number, arr: any);
  findinarrayreturnindex();
  countnumberofoccurencesinarr();
  findalloccurrencereturnindexarrayin();
}

interface Number {
  abs();
  str();
  isin();
  isset();
  indexin();
  isakeyof();
  isinarray();
  issetinobj();
  insertinto();
  existsinobj();
  allindexesin();
  alllocationsin();
  isakeyinsideobj();
  allindexesinside();
  removeallingreedy();
  numberofoccurencesin();
  insertintoarrayatindex(idx: number, arr: any);
  alloccurrenceindexesin();
  isinavaluefoundinsideobj();
  countnumberofoccurencesinarr();
  findalloccurencesinarrayandreturnarrayindices();
}
