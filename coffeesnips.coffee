###
all_properties = (obj) => {
  return Object.getOwnPropertyNames(obj.prototype);
};

console.log(all_properties(Number));
console.log(all_properties(String));
console.log(all_properties(Zob));
console.log(all_properties(Zray));

all_properties = (obj) ->
  return Object.getOwnPropertyNames(obj.prototype)
  c all_properties(Zray)
  c all_properties(Zob)
  c all_properties(Number)
  c all_properties(String)
###

###
  'min' 'rep' 'sub' 'srt' 'idx' 'pos' 'has' 'get' 'set'
  'add' 'del' 'abs' 'str' 'last' 'diff' 'dupe' 'flip' 'isin' 'first' 'range' 'notin' 'dupes' 'isset' 'match' 'slice' 'split' 'remove' 'suball' 'samein' 'unique' 'getkey' 'delete' 'haskey' 'hasval' 'length' 'concat' 'repeat' 'substr' 'average' 'isempty' 'without' 'getprop' 'setprop' 'valueOf' 'toFixed' 'indexin' 'indexOf' 'replace' 'diffwith' 'position' 'contains' 'getvalue' 'toString' 'isakeyof' 'endsWith' 'includes' 'matchAll' 'removeall' 'addunique' 'showdupes' 'removekey' 'viceversa' 'isinarray' 'substring' 'difference' 'uniquewith' 'addmissing' 'duplicates' 'deletedupe' 'deleteprop' 'issetinobj' 'filternotin' 'missingfrom' 'removeevery' 'removedupes' 'removewhere' 'toPrecision' 'existsinobj' 'lastIndexOf' 'hasthesamein' 'mergewithobj' 'allindexesin' 'missinginboth' 'filtermissing' 'removegarbage' 'toExponential' 'missingthatsin' 'findduplicates' 'getkeysasarray' 'toLocaleString' 'alllocationsin' 'greedyremoveall' 'removefromarray' 'filternongreedy' 'isakeyinsideobj' 'filterduplicates' 'filternotinarray' 'missingfromarray' 'filteroutgarbage' 'removeduplicates' 'getvaluesasarray' 'allindexesinside' 'filtermissingboth' 'getalljsonrecords' 'removeallingreedy' 'filtereachonebyone' 'whichvaluesarenotin' 'removeallwherevalis' 'filtermissingeither' 'addmissingfromarray' 'switchkeysandvalues' 'findkeynamewhereval' 'isavalfoundinsideobj' 'numberofoccurencesin' 'removeallwherevalueis' 'getsamevaluefromarray' 'filtermissingfromboth' 'getalljsonvalueswhere' 'filter1by1iterablyfrom' 'removebyindexfromarray' 'remove1by1iterablyfrom' 'filterallthathassamein' 'filtereverythingexcept' 'deepsearchforpropwhere' 'alloccurrenceindexesin' 'removefromlistofindexes' 'filtersamevaluesthatsin' 'filtersamevaluesinarray' 'removeallthatareingreedy' 'removebyindexesnongreedy' 'removeiterativelyfromarr' 'filterallinjsonobjexcept' 'countnumberofoccurencesof' 'combinewithandremovedupes' 'keysvaluesandvaluesaskeys' 'filteroutthatsinnonegreedy' 'filteralsomissingfromarray' 'removenongreedyiterablyfrom' 'findalljsonrecordsthatmatch' 'returnvaluesmissingfromarray' 'filtersafeoutfromarrayvalsof' 'filtermissingineitherorarray' 'jsonfindfirstwherekeyvalueis' 'countnumberofoccurencesinarr' 'substitutealloccurencesofvalue' 'removeallindexeswherevaluesarein' 'convertkeysintovaluesandviceversa' 'removethatareincomparedarraygreedy' 'filterwhichvaluesmissingfromthisarray'
###