declare global {
  class Zray<T> extends Array<T> {}
  class Zob<T> extends Object<T> {}
}

interface String {
  has();
  num();
  rep();
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
  insertintoarrayatindex();
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
  insertintoarrayatindex();
  alloccurrenceindexesin();
  isinavaluefoundinsideobj();
  countnumberofoccurencesinarr();
  findalloccurencesinarrayandreturnarrayindices();
}
