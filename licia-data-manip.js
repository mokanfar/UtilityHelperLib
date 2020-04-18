// compact combine defaults find findKey findLastIdx invert intersect isMatch 
// has HashTable keys allKeys format lazyRequire matcher mapObj omit pairs pick 
// pluck remove safeDel safeGet safeSet sortKeys splitPath swap union values waterfall wrap

//extendDeep -- merge parts of an object deeply into main obj
//!compact   -- [0, 1, false, 2, '', 3] // -> [1, 2, 3]
//defaults   -- fill in default key/value information when instantiating objects  that you dont provide initially.
//find       -- find whole object where key.value = [input] -- useful for json return entire list of skus that match
//findKey    -- find the key where value = [input]
//!invert    -- useful keys become values and vice versa object { a: 'b', c: 'd', e: 'f' } // -> {b: 'a', d: 'c', f: 'e'}
//!intersect -- self explanatory, [arr1 not in arr2 and arr2 not in arr1, can be up to arrN] [1, 2, 3, 4], [2, 1, 10] // -> [1, 2]
//isMatch    -- matches object notation needle in a big haystack obj { a: 1, b: 2 }, { a: 1 } // -> true
//has        -- boolean return if an obj has key set for needle input { one: 1 }, 'one' // -> true has key entry
//keys       -- get keys as array from an obj { a: 1, b: 2 } // -> ['a','b']
//!!!values  -- like keys, but returns in array all values of all keys encountered.
//format     -- '%s_%s', 'foo', 'bar' // -> 'foo_bar'
//!matcher   -- [FIND WHERE SKU = FOO AND COLOR = BAR] finds within json obj things that match multiple key conditions filter(objects, matcher({ a: 4, c: 6 })); // -> [{a: 4, b: 5, c: 6}]
//!mapObj    -- map like array but for object values -- useful for hashmap
//omit       -- return an object (non-mutated) without certain keys  that are specified
//pairs      -- { a: 1, b: 2 } // -> [['a', 1], ['b', 2]]
//pick       -- like omit but you specify only the ones you want to display as opposed to ones you want to omit
//pluck      -- like pick, but in entire json object and output as array based on key entry provided.
//!remove    -- mutates array similar to like filter, but mutating
//!safeGet   -- if not set, will not through error, just undefined. useful for mistakes in ramda arthur scripts
//!safeSet   -- very useful, deep creation without error thrown if parent branch of obj not exist
//!safeDel   -- can pass array, nested dot notation a.aa.aaa and it will deep delete
//swap       -- mutating array, little mix of splice and slice, swap values in index
//!!!union   -- combines arrays up to arrN, discards duplicate occurences in each array
//?unzip     -- weird but has ability to turn rows into columns of array arr0[arr1[i][j],arr2[j][j]] = arr0[arr3[arr1[i],arr2[j]]...]

//todo
// Object mergewithobj                                                     // extendDeep -- merge parts of an object deeply into main obj -- mergewithobj
// Array removegarbage                                                     // !compact   -- [0, 1, false, 2, '', 3]                                                                                                                           // -> [1, 2, 3] --removegarbage
// Array jsonfindwherekeyvalueis                                         // find       -- find first occ where whole object where key.value = [input]  -- findfirstwherekeyvalueis -- useful for json return entire list of skus that match
// Object findkeynamewhereval                                              // findKey    -- find the key where value = [input] -- findkeynamewhereavalueis
// Object invert -- convertkeysintovaluesandviceversa -- viceversa -- flip // !invert    -- useful keys become values and vice versa object { a: 'b', c: 'd', e: 'f' }                                                                        // -> {b: 'a', d: 'c', f: 'e'}
// Array intersectwith -- combineandfilteroutdupes                         // !intersect -- self explanatory, [arr1 not in arr2 and arr2 not in arr1, can be up to arrN] [1, 2, 3, 4], [2, 1, 10]                                             // -> [1, 2]
// Object deepsearchforpropwhere                                           // isMatch    -- matches object notation needle in a big haystack obj { a: 1, b: 2 }, { a: 1 }                                                                     // -> true
// Object haskeyset                                                        // has        -- boolean return if an obj has key set for needle input { one: 1 }, 'one'                                                                           // -> true has key entry -- haskeyset
// Object getkeysasarray                                                   // keys       -- get keys as array from an obj { a: 1, b: 2 }                                                                                                      // -> ['a','b'] -- getkeys
// Object getvalsasarray                                                   // !!!values  -- like keys, but returns in array all values of all keys encountered. -- getvalues
// Array  getalljsonvalueswhere -- getalljsonrecords -- findalljsonrecordsthatmatch      // !matcher   -- [FIND WHERE SKU = FOO AND COLOR = BAR] finds within json obj things that match multiple key conditions filter(objects, matcher({ a: 4, c: 6 }));  // -> [{a: 4, b: 5, c: 6}] -- getallvalueswhere -- getallrecords -- findallthatmatch
// Object without                                                          // omit       -- return an object (non-mutated) without certain keys  that are specified -- without
// Object filtereverythingexcept                                           // pick       -- like omit but you specify only the ones you want to display as opposed to ones you want to omit -- filterouteverythingexcept
// Array filterallinjsonobexcept                                      // pluck      -- like pick, but in entire json object and output as array based on key entry provided. -- filterouteverythingexcept
// Array removewhere                                                       // !remove    -- mutates array similar to like filter, but mutating
// Object getprop                                                          // !safeGet   -- if not set, will not through error, just undefined. useful for mistakes in ramda arthur scripts getval
// Object setprop                                                          // !safeSet   -- very useful, deep creation without error thrown if parent branch of obj not exist -- setval
// Object deleteprop                                                       // !safeDel   -- can pass array, nested dot notation a.aa.aaa and it will deep delete -- delval
// Array combinewithandremovedupes -- union                                // !!!union   -- combines arrays up to arrN, discards duplicate occurences in each array -- combinewithandremovedupes


(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root._ = factory(); }
}(this, function ()
{
    /* eslint-disable */

    var _ = {};

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ types ------------------------------ */

    var types = _.types = (function (exports) {
        /* Used for typescript definitions only.
         */

        /* typescript
         * export declare namespace types {
         *     interface Collection<T> {}
         *     interface List<T> extends Collection<T> {
         *         [index: number]: T;
         *         length: number;
         *     }
         *     interface ListIterator<T, TResult> {
         *         (value: T, index: number, list: List<T>): TResult;
         *     }
         *     interface Dictionary<T> extends Collection<T> {
         *         [index: string]: T;
         *     }
         *     interface ObjectIterator<T, TResult> {
         *         (element: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     interface MemoIterator<T, TResult> {
         *         (prev: TResult, curr: T, index: number, list: List<T>): TResult;
         *     }
         *     interface MemoObjectIterator<T, TResult> {
         *         (prev: TResult, curr: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     type Fn<T> = (...args: any[]) => T;
         *     type AnyFn = Fn<any>;
         * }
         * export declare const types: {};
         */
        exports = {};

        return exports;
    })({});

    /* ------------------------------ str//h ------------------------------ */

    var strHash = _.strHash = (function (exports) {
        /* String hash function using djb2.
         *
         * |Name  |Desc          |
         * |------|--------------|
         * |str   |String to hash|
         * |return|Hash result   |
         */

        /* example
         * strHash('test'); // -> 2090770981
         */

        /* typescript
         * export declare function strHash(str: string): number;
         */
        exports = function(str) {
            var hash = 5381;
            var i = str.length;

            while (i) {
                hash = (hash << 5) + hash + str.charCodeAt(--i);
            }

            return hash >>> 0; // Make sure it's always positive.
        };

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var haskeyset = has = _.has = (function (exports) {
        /* Checks if key is a direct property.
         *
         * |Name  |Desc                            |
         * |------|--------------------------------|
         * |obj   |Object to query                 |
         * |key   |Path to check                   |
         * |return|True if key is a direct property|
         */

        /* example
         * has({ one: 1 }, 'one'); // -> true
         */

        /* typescript
         * export declare function has(obj: {}, key: string): boolean;
         */
        var hasOwnProp = Object.prototype.hasOwnProperty;

        exports = function(obj, key) {
            return hasOwnProp.call(obj, key);
        };

        return exports;
    })({});

    /* ------------------------------ keys ------------------------------ */

   var getkeysasarray =  keys = _.keys = (function (exports) {
        /* Create an array of the own enumerable property names of object.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |obj   |Object to query        |
         * |return|Array of property names|
         */

        /* example
         * keys({ a: 1 }); // -> ['a']
         */

        /* typescript
         * export declare function keys(obj: any): string[];
         */

        /* dependencies
         * has 
         */

        if (Object.keys && !false) {
            exports = Object.keys;
        } else {
            exports = function(obj) {
                var ret = [];

                for (var key in obj) {
                    if (has(obj, key)) ret.push(key);
                }

                return ret;
            };
        }

        return exports;
    })({});

    /* ------------------------------ combine ------------------------------ */
   var combine =  _.combine = (function (exports) {
        /* Create an array by using one array for keys and another for its values.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |keys  |Keys to be used  |
         * |values|Values to be used|
         * |return|Created object   |
         */

        /* example
         * combine(['a', 'b', 'c'], [1, 2, 3]); // -> {a: 1, b: 2, c: 3}
         */

        /* typescript
         * export declare function combine(keys: string[], values: any[]): any;
         */
        exports = function(keys, values) {
            var ret = {};

            for (var i = 0, len = keys.length; i < len; i++) {
                ret[keys[i]] = values[i];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ idxOf ------------------------------ */

    var idxOf = _.idxOf = (function (exports) {
        /* Get the index at which the first occurrence of value.
         *
         * |Name     |Desc                |
         * |---------|--------------------|
         * |arr      |Array to search     |
         * |val      |Value to search for |
         * |fromIdx=0|Index to search from|
         * |return   |Value index         |
         */

        /* example
         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
         */

        /* typescript
         * export declare function idxOf(arr: any[], val: any, fromIdx?: number): number;
         */
        exports = function(arr, val, fromIdx) {
            return Array.prototype.indexOf.call(arr, val, fromIdx);
        };

        return exports;
    })({});

    /* ------------------------------ isObj ------------------------------ */

    var isObj = _.isObj = (function (exports) {
        /* Check if value is the language type of Object.
         *
         * |Name  |Desc                      |
         * |------|--------------------------|
         * |val   |Value to check            |
         * |return|True if value is an object|
         *
         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
         */

        /* example
         * isObj({}); // -> true
         * isObj([]); // -> true
         */

        /* typescript
         * export declare function isObj(val: any): boolean;
         */
        exports = function(val) {
            var type = typeof val;
            return !!val && (type === 'function' || type === 'object');
        };

        return exports;
    })({});

    /* ------------------------------ create ------------------------------ */

    var create = _.create = (function (exports) {
        /* Create new object using given object as prototype.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |proto |Prototype of new object|
         * |return|Created object         |
         */

        /* example
         * const obj = create({ a: 1 });
         * console.log(obj.a); // -> 1
         */

        /* typescript
         * export declare function create(proto?: object): any;
         */

        /* dependencies
         * isObj 
         */

        exports = function(proto) {
            if (!isObj(proto)) return {};
            if (objCreate && !false) return objCreate(proto);

            function noop() {}

            noop.prototype = proto;
            return new noop();
        };

        var objCreate = Object.create;

        return exports;
    })({});

    /* ------------------------------ inherits ------------------------------ */

    var inherits = _.inherits = (function (exports) {
        /* Inherit the prototype methods from one constructor into another.
         *
         * |Name      |Desc       |
         * |----------|-----------|
         * |Class     |Child Class|
         * |SuperClass|Super Class|
         */

        /* example
         * function People(name) {
         *     this._name = name;
         * }
         * People.prototype = {
         *     getName: function() {
         *         return this._name;
         *     }
         * };
         * function Student(name) {
         *     this._name = name;
         * }
         * inherits(Student, People);
         * const s = new Student('RedHood');
         * s.getName(); // -> 'RedHood'
         */

        /* typescript
         * export declare function inherits(
         *     Class: types.AnyFn,
         *     SuperClass: types.AnyFn
         * ): void;
         */

        /* dependencies
         * create types 
         */

        exports = function(Class, SuperClass) {
            Class.prototype = create(SuperClass.prototype);
        };

        return exports;
    })({});

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef = _.isUndef = (function (exports) {
        /* Check if value is undefined.
         *
         * |Name  |Desc                      |
         * |------|--------------------------|
         * |val   |Value to check            |
         * |return|True if value is undefined|
         */

        /* example
         * isUndef(void 0); // -> true
         * isUndef(null); // -> false
         */

        /* typescript
         * export declare function isUndef(val: any): boolean;
         */
        exports = function(val) {
            return val === void 0;
        };

        return exports;
    })({});

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb = _.optimizeCb = (function (exports) {
        /* Used for function context binding.
         */

        /* typescript
         * export declare function optimizeCb(
         *     fn: types.AnyFn,
         *     ctx: any,
         *     argCount?: number
         * ): types.AnyFn;
         */

        /* dependencies
         * isUndef types 
         */

        exports = function(fn, ctx, argCount) {
            if (isUndef(ctx)) return fn;

            switch (argCount == null ? 3 : argCount) {
                case 1:
                    return function(val) {
                        return fn.call(ctx, val);
                    };

                case 3:
                    return function(val, idx, collection) {
                        return fn.call(ctx, val, idx, collection);
                    };

                case 4:
                    return function(accumulator, val, idx, collection) {
                        return fn.call(ctx, accumulator, val, idx, collection);
                    };
            }

            return function() {
                return fn.apply(ctx, arguments);
            };
        };

        return exports;
    })({});

    /* ------------------------------ restArgs ------------------------------ */

    var restArgs = _.restArgs = (function (exports) {
        /* This accumulates the arguments passed into an array, after a given index.
         *
         * |Name      |Desc                                   |
         * |----------|---------------------------------------|
         * |function  |Function that needs rest parameters    |
         * |startIndex|The start index to accumulates         |
         * |return    |Generated function with rest parameters|
         */

        /* example
         * const paramArr = restArgs(function(rest) {
         *     return rest;
         * });
         * paramArr(1, 2, 3, 4); // -> [1, 2, 3, 4]
         */

        /* typescript
         * export declare function restArgs(
         *     fn: types.AnyFn,
         *     startIndex?: number
         * ): types.AnyFn;
         */

        /* dependencies
         * types 
         */

        exports = function(fn, startIdx) {
            startIdx = startIdx == null ? fn.length - 1 : +startIdx;
            return function() {
                var len = Math.max(arguments.length - startIdx, 0);
                var rest = new Array(len);
                var i;

                for (i = 0; i < len; i++) {
                    rest[i] = arguments[i + startIdx];
                } // Call runs faster than apply.

                switch (startIdx) {
                    case 0:
                        return fn.call(this, rest);

                    case 1:
                        return fn.call(this, arguments[0], rest);

                    case 2:
                        return fn.call(this, arguments[0], arguments[1], rest);
                }

                var args = new Array(startIdx + 1);

                for (i = 0; i < startIdx; i++) {
                    args[i] = arguments[i];
                }

                args[startIdx] = rest;
                return fn.apply(this, args);
            };
        };

        return exports;
    })({});

    /* ------------------------------ toStr ------------------------------ */

    var toStr = _.toStr = (function (exports) {
        /* Convert value to a string.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |val   |Value to convert|
         * |return|Result string   |
         */

        /* example
         * toStr(null); // -> ''
         * toStr(1); // -> '1'
         * toStr(false); // -> 'false'
         * toStr([1, 2, 3]); // -> '1,2,3'
         */

        /* typescript
         * export declare function toStr(val: any): string;
         */
        exports = function(val) {
            return val == null ? '' : val.toString();
        };

        return exports;
    })({});

    /* ------------------------------ identity ------------------------------ */

    var identity = _.identity = (function (exports) {
        /* Return the first argument given.
         *
         * |Name  |Desc       |
         * |------|-----------|
         * |val   |Any value  |
         * |return|Given value|
         */

        /* example
         * identity('a'); // -> 'a'
         */

        /* typescript
         * export declare function identity<T>(val: T): T;
         */
        exports = function(val) {
            return val;
        };

        return exports;
    })({});

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function (exports) {
        /* Alias of Object.prototype.toString.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |val   |Source value                        |
         * |return|String representation of given value|
         */

        /* example
         * objToStr(5); // -> '[object Number]'
         */

        /* typescript
         * export declare function objToStr(val: any): string;
         */
        var ObjToStr = Object.prototype.toString;

        exports = function(val) {
            return ObjToStr.call(val);
        };

        return exports;
    })({});

    /* ------------------------------ isArr ------------------------------ */

    var isArr = _.isArr = (function (exports) {
        /* Check if value is an `Array` object.
         *
         * |Name  |Desc                              |
         * |------|----------------------------------|
         * |val   |Value to check                    |
         * |return|True if value is an `Array` object|
         */

        /* example
         * isArr([]); // -> true
         * isArr({}); // -> false
         */

        /* typescript
         * export declare function isArr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        if (Array.isArray && !false) {
            exports = Array.isArray;
        } else {
            exports = function(val) {
                return objToStr(val) === '[object Array]';
            };
        }

        return exports;
    })({});

    /* ------------------------------ castPath ------------------------------ */

    var castPath = _.castPath = (function (exports) {
        /* Cast value into a property path array.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |path  |Value to inspect   |
         * |obj   |Object to query    |
         * |return|Property path array|
         */

        /* example
         * castPath('a.b.c'); // -> ['a', 'b', 'c']
         * castPath(['a']); // -> ['a']
         * castPath('a[0].b'); // -> ['a', '0', 'b']
         * castPath('a.b.c', { 'a.b.c': true }); // -> ['a.b.c']
         */

        /* typescript
         * export declare function castPath(path: string | string[], obj?: any): string[];
         */

        /* dependencies
         * has isArr 
         */

        exports = function(str, obj) {
            if (isArr(str)) return str;
            if (obj && has(obj, str)) return [str];
            var ret = [];
            str.replace(regPropName, function(match, number, quote, str) {
                ret.push(quote ? str.replace(regEscapeChar, '$1') : number || match);
            });
            return ret;
        }; // Lodash _stringToPath

        var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var regEscapeChar = /\\(\\)?/g;

        return exports;
    })({});

    /* ------------------------------ safeGet ------------------------------ */

    var safeGet = getprop =  _.safeGet = (function (exports) {
        /* Get object property, don't throw undefined error.
         *
         * |Name  |Desc                     |
         * |------|-------------------------|
         * |obj   |Object to query          |
         * |path  |Path of property to get  |
         * |return|Target value or undefined|
         */

        /* example
         * const obj = { a: { aa: { aaa: 1 } } };
         * safeGet(obj, 'a.aa.aaa'); // -> 1
         * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
         * safeGet(obj, 'a.b'); // -> undefined
         */

        /* typescript
         * export declare function safeGet(obj: any, path: string | string[]): any;
         */

        /* dependencies
         * isUndef castPath 
         */

        exports = function(obj, path) {
            path = castPath(path, obj);
            var prop;
            prop = path.shift();

            while (!isUndef(prop)) {
                obj = obj[prop];
                if (obj == null) return;
                prop = path.shift();
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ flatten ------------------------------ */

    var flatten = _.flatten = (function (exports) {
        /* Recursively flatten an array.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |arr   |Array to flatten   |
         * |return|New flattened array|
         */

        /* example
         * flatten(['a', ['b', ['c']], 'd', ['e']]); // -> ['a', 'b', 'c', 'd', 'e']
         */

        /* typescript
         * export declare function flatten(arr: any[]): any[];
         */

        /* dependencies
         * isArr 
         */

        exports = function(arr) {
            return flat(arr, []);
        };

        function flat(arr, res) {
            var len = arr.length,
                i = -1,
                cur;

            while (len--) {
                cur = arr[++i];
                isArr(cur) ? flat(cur, res) : res.push(cur);
            }

            return res;
        }

        return exports;
    })({});

    /* ------------------------------ isFn ------------------------------ */

    var isFn = _.isFn = (function (exports) {
        /* Check if value is a function.
         *
         * |Name  |Desc                       |
         * |------|---------------------------|
         * |val   |Value to check             |
         * |return|True if value is a function|
         *
         * Generator function is also classified as true.
         */

        /* example
         * isFn(function() {}); // -> true
         * isFn(function*() {}); // -> true
         * isFn(async function() {}); // -> true
         */

        /* typescript
         * export declare function isFn(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            var objStr = objToStr(val);
            return (
                objStr === '[object Function]' ||
                objStr === '[object GeneratorFunction]' ||
                objStr === '[object AsyncFunction]'
            );
        };

        return exports;
    })({});

    /* ------------------------------ getProto ------------------------------ */

    var getProto = _.getProto = (function (exports) {
        /* Get prototype of an object.
         *
         * |Name  |Desc                                         |
         * |------|---------------------------------------------|
         * |obj   |Target object                                |
         * |return|Prototype of given object, null if not exists|
         */

        /* example
         * const a = {};
         * getProto(Object.create(a)); // -> a
         */

        /* typescript
         * export declare function getProto(obj: any): any;
         */

        /* dependencies
         * isObj isFn 
         */

        var getPrototypeOf = Object.getPrototypeOf;
        var ObjectCtr = {}.constructor;

        exports = function(obj) {
            if (!isObj(obj)) return;
            if (getPrototypeOf && !false) return getPrototypeOf(obj);
            var proto = obj.__proto__;
            if (proto || proto === null) return proto;
            if (isFn(obj.constructor)) return obj.constructor.prototype;
            if (obj instanceof ObjectCtr) return ObjectCtr.prototype;
        };

        return exports;
    })({});

    /* ------------------------------ isMiniProgram ------------------------------ */

    var isMiniProgram = _.isMiniProgram = (function (exports) {
        /* Check if running in wechat mini program.
         */

        /* example
         * console.log(isMiniProgram); // -> true if running in mini program.
         */

        /* typescript
         * export declare const isMiniProgram: boolean;
         */

        /* dependencies
         * isFn 
         */
        /* eslint-disable no-undef */

        exports = typeof wx !== 'undefined' && isFn(wx.openLocation);

        return exports;
    })({});

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function (exports) {
        /* Check if value is a string primitive.
         *
         * |Name  |Desc                               |
         * |------|-----------------------------------|
         * |val   |Value to check                     |
         * |return|True if value is a string primitive|
         */

        /* example
         * isStr('licia'); // -> true
         */

        /* typescript
         * export declare function isStr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object String]';
        };

        return exports;
    })({});

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function (exports) {
        /* Check if value is classified as a Number primitive or object.
         *
         * |Name  |Desc                                 |
         * |------|-------------------------------------|
         * |val   |Value to check                       |
         * |return|True if value is correctly classified|
         */

        /* example
         * isNum(5); // -> true
         * isNum(5.1); // -> true
         * isNum({}); // -> false
         */

        /* typescript
         * export declare function isNum(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object Number]';
        };

        return exports;
    })({});

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function (exports) {
        /* Check if value is array-like.
         *
         * |Name  |Desc                       |
         * |------|---------------------------|
         * |val   |Value to check             |
         * |return|True if value is array like|
         *
         * Function returns false.
         */

        /* example
         * isArrLike('test'); // -> true
         * isArrLike(document.body.children); // -> true;
         * isArrLike([1, 2, 3]); // -> true
         */

        /* typescript
         * export declare function isArrLike(val: any): boolean;
         */

        /* dependencies
         * isNum isFn 
         */

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function(val) {
            if (!val) return false;
            var len = val.length;
            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
        };

        return exports;
    })({});

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function (exports) {
        /* Iterate over elements of collection and invokes iterator for each element.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |obj     |Collection to iterate over    |
         * |iterator|Function invoked per iteration|
         * |ctx     |Function context              |
         */

        /* example
         * each({ a: 1, b: 2 }, function(val, key) {});
         */

        /* typescript
         * export declare function each<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, void>,
         *     ctx?: any
         * ): types.List<T>;
         * export declare function each<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, void>,
         *     ctx?: any
         * ): types.Collection<T>;
         */

        /* dependencies
         * isArrLike keys optimizeCb types 
         */

        exports = function(obj, iterator, ctx) {
            iterator = optimizeCb(iterator, ctx);
            var i, len;

            if (isArrLike(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    iterator(obj[i], i, obj);
                }
            } else {
                var _keys = keys(obj);

                for (i = 0, len = _keys.length; i < len; i++) {
                    iterator(obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ createAssigner ------------------------------ */

    var createAssigner = _.createAssigner = (function (exports) {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |keysFn  |Function to get object keys   |
         * |defaults|No override when set to true  |
         * |return  |Result function, extend...    |
         */

        /* typescript
         * export declare function createAssigner(
         *     keysFn: types.AnyFn,
         *     defaults: boolean
         * ): types.AnyFn;
         */

        /* dependencies
         * isUndef each types 
         */

        exports = function(keysFn, defaults) {
            return function(obj) {
                each(arguments, function(src, idx) {
                    if (idx === 0) return;
                    var keys = keysFn(src);
                    each(keys, function(key) {
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    });
                });
                return obj;
            };
        };

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports) {
        /* Like extend, but only copies own properties over to the destination object.
         *
         * |Name       |Desc              |
         * |-----------|------------------|
         * |destination|Destination object|
         * |...sources |Sources objects   |
         * |return     |Destination object|
         */

        /* example
         * extendOwn({ name: 'RedHood' }, { age: 24 }); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function extendOwn(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * keys createAssigner 
         */

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ invert ------------------------------ */
    var convertkeysintovaluesandviceversa = viceversa = flip = _.invert = (function (exports) {
        /* Create an object composed of the inverted keys and values of object.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |obj   |Object to invert   |
         * |return|New inverted object|
         *
         * If object contains duplicate values, subsequent values overwrite property assignments of previous values.
         */

        /* example
         * invert({ a: 'b', c: 'd', e: 'f' }); // -> {b: 'a', d: 'c', f: 'e'}
         */

        /* typescript
         * export declare function invert(obj: any): any;
         */

        /* dependencies
         * each 
         */

        exports = function(obj) {
            var ret = {};
            each(obj, function(val, key) {
                ret[val] = key;
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var getvalsasarray = values = _.values = (function (exports) {
        /* Create an array of the own enumerable property values of object.
         *
         * |Name  |Desc                    |
         * |------|------------------------|
         * |obj   |Object to query         |
         * |return|Array of property values|
         */

        /* example
         * values({ one: 1, two: 2 }); // -> [1, 2]
         */

        /* typescript
         * export declare function values(obj: any): any[];
         */

        /* dependencies
         * each 
         */

        exports = function(obj) {
            var ret = [];
            each(obj, function(val) {
                ret.push(val);
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ contain ------------------------------ */

    var contain = _.contain = (function (exports) {
        /* Check if the value is present in the list.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |target|Target object                       |
         * |val   |Value to check                      |
         * |return|True if value is present in the list|
         */

        /* example
         * contain([1, 2, 3], 1); // -> true
         * contain({ a: 1, b: 2 }, 1); // -> true
         * contain('abc', 'a'); // -> true
         */

        /* typescript
         * export declare function contain(arr: any[] | {} | string, val: any): boolean;
         */

        /* dependencies
         * idxOf isStr isArrLike values 
         */

        exports = function(arr, val) {
            if (isStr(arr)) return arr.indexOf(val) > -1;
            if (!isArrLike(arr)) arr = values(arr);
            return idxOf(arr, val) >= 0;
        };

        return exports;
    })({});

    /* ------------------------------ toNum ------------------------------ */

    var toNum = _.toNum = (function (exports) {
        /* Convert value to a number.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |val   |Value to process|
         * |return|Result number   |
         */

        /* example
         * toNum('5'); // -> 5
         */

        /* typescript
         * export declare function toNum(val: any): number;
         */

        /* dependencies
         * isNum isObj isFn isStr 
         */

        exports = function(val) {
            if (isNum(val)) return val;

            if (isObj(val)) {
                var temp = isFn(val.valueOf) ? val.valueOf() : val;
                val = isObj(temp) ? temp + '' : temp;
            }

            if (!isStr(val)) return val === 0 ? val : +val;
            return +val;
        };

        return exports;
    })({});

    /* ------------------------------ toInt ------------------------------ */

    var toInt = _.toInt = (function (exports) {
        /* Convert value to an integer.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |val   |Value to convert |
         * |return|Converted integer|
         */

        /* example
         * toInt(1.1); // -> 1
         * toInt(undefined); // -> 0
         */

        /* typescript
         * export declare function toInt(val: any): number;
         */

        /* dependencies
         * toNum 
         */

        exports = function(val) {
            if (!val) return val === 0 ? val : 0;
            val = toNum(val);
            return val - (val % 1);
        };

        return exports;
    })({});

    /* ------------------------------ format ------------------------------ */
    _.format = (function (exports) {
        /* Format string in a printf-like format.
         *
         * |Name     |Desc                               |
         * |---------|-----------------------------------|
         * |str      |String to format                   |
         * |...values|Values to replace format specifiers|
         * |return   |Formatted string                   |
         *
         * ### Format Specifiers
         *
         * |Specifier|Desc                |
         * |---------|--------------------|
         * |%s       |String              |
         * |%d, %i   |Integer             |
         * |%f       |Floating point value|
         * |%o       |Object              |
         */

        /* example
         * format('%s_%s', 'foo', 'bar'); // -> 'foo_bar'
         */

        /* typescript
         * export declare function format(str: string, ...values: any[]): string;
         */

        /* dependencies
         * restArgs toInt toNum toStr 
         */

        exports = restArgs(function(str, values) {
            var ret = '';

            for (var i = 0, len = str.length; i < len; i++) {
                var c = str[i];

                if (c !== '%' || values.length === 0) {
                    ret += c;
                    continue;
                }

                i++;
                var val = values.shift();

                switch (str[i]) {
                    case 'i':
                    case 'd':
                        ret += toInt(val);
                        break;

                    case 'f':
                        ret += toNum(val);
                        break;

                    case 's':
                        ret += toStr(val);
                        break;

                    case 'o':
                        ret += tryStringify(val);
                        break;

                    default:
                        i--;
                        values.unshift(val);
                        ret += c;
                }
            }

            return ret;
        });

        function tryStringify(obj) {
            try {
                return JSON.stringify(obj);
            } catch (err) {
                return '[Error Stringify]';
            }
        }

        return exports;
    })({});
     var mapObj = _.mapObj = (function (exports) {
        /* Map for objects.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |object  |Object to iterate over        |
         * |iterator|Function invoked per iteration|
         * |context |Function context              |
         * |return  |New mapped object             |
         */

        /* example
         * mapObj({ a: 1, b: 2 }, function(val, key) {
         *     return val + 1;
         * }); // -> {a: 2, b: 3}
         */

        /* typescript
         * export declare function mapObj<T, TResult>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, TResult>,
         *     context?: any
         * ): types.Dictionary<TResult>;
         */

        /* dependencies
         * safeCb keys types 
         */

        exports = function(obj, iterator, ctx) {
            iterator = safeCb(iterator, ctx);

            var _keys = keys(obj);

            var len = _keys.length;
            var ret = {};

            for (var i = 0; i < len; i++) {
                var curKey = _keys[i];
                ret[curKey] = iterator(obj[curKey], curKey, obj);
            }

            return ret;
        };

        return exports;
    })({});



    var cloneDeep = _.cloneDeep = (function (exports) {
        /* Recursively clone value.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |val   |Value to clone   |
         * |return|Deep cloned Value|
         */

        /* example
         * const obj = [{ a: 1 }, { a: 2 }];
         * const obj2 = cloneDeep(obj);
         * console.log(obj[0] === obj2[1]); // -> false
         */

        /* typescript
         * export declare function cloneDeep<T>(val: T): T;
         */

        /* dependencies
         * isObj isFn isArr mapObj 
         */

        exports = function(obj) {
            if (isArr(obj)) {
                return obj.map(function(val) {
                    return exports(val);
                });
            }

            if (isObj(obj) && !isFn(obj)) {
                return mapObj(obj, function(val) {
                    return exports(val);
                });
            }

            return obj;
        };

        return exports;
    })({});

    var isPlainObj = _.isPlainObj = (function (exports) {
        /* Check if value is an object created by Object constructor.
         *
         * |Name  |Desc                           |
         * |------|-------------------------------|
         * |val   |Value to check                 |
         * |return|True if value is a plain object|
         */

        /* example
         * isPlainObj({}); // -> true
         * isPlainObj([]); // -> false
         * isPlainObj(function() {}); // -> false
         */

        /* typescript
         * export declare function isPlainObj(val: any): boolean;
         */

        /* dependencies
         * isObj isArr isFn has 
         */

        exports = function(val) {
            if (!isObj(val)) return false;
            var ctor = val.constructor;
            if (!isFn(ctor)) return false;
            if (!has(ctor.prototype, 'isPrototypeOf')) return false;
            return !isArr(val) && !isFn(val);
        };

        return exports;
    })({});



    /* ------------------------------ isMatch ------------------------------ */

   var deepsearchforpropwhere  =  isMatch = _.isMatch = (function (exports) {
        /* Check if keys and values in src are contained in obj.
         *
         * |Name  |Desc                              |
         * |------|----------------------------------|
         * |obj   |Object to inspect                 |
         * |src   |Object of property values to match|
         * |return|True if object is match           |
         */

        /* example
         * isMatch({ a: 1, b: 2 }, { a: 1 }); // -> true
         */

        /* typescript
         * export declare function isMatch(obj: any, src: any): boolean;
         */

        /* dependencies
         * keys 
         */

        exports = function(obj, src) {
            var _keys = keys(src);

            var len = _keys.length;
            if (obj == null) return !len;
            obj = Object(obj);

            for (var i = 0; i < len; i++) {
                var key = _keys[i];
                if (src[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        return exports;
    })({});

    /* ------------------------------ isSorted ------------------------------ */

    var isSorted = _.isSorted = (function (exports) {
        /* Check if an array is sorted.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |arr   |Array to check         |
         * |cmp   |Comparator             |
         * |return|True if array is sorted|
         */

        /* example
         * isSorted([1, 2, 3]); // -> true
         * isSorted([3, 2, 1]); // -> false
         */

        /* typescript
         * export declare function isSorted(arr: any[], cmp?: types.AnyFn): boolean;
         */

        /* dependencies
         * types 
         */

        exports = function(arr) {
            var cmp =
                arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : exports.defComparator;

            for (var i = 0, len = arr.length; i < len - 1; i++) {
                if (cmp(arr[i], arr[i + 1]) > 0) return false;
            }

            return true;
        };

        exports.defComparator = function(a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        };

        return exports;
    })({});

    /* ------------------------------ lazyRequire ------------------------------ */
    _.lazyRequire = (function (exports) {
        /* Require modules lazily.
         */

        /* example
         * const r = lazyRequire(require);
         *
         * const _ = r('underscore');
         *
         * // underscore is required only when _ is called.
         * _().isNumber(5);
         */

        /* typescript
         * export declare function lazyRequire(requireFn: types.AnyFn): types.AnyFn;
         */

        /* dependencies
         * types 
         */

        exports = function(requireFn) {
            const cache = {};

            return function(name) {
                return function() {
                    return cache[name] || (cache[name] = requireFn(name));
                };
            };
        };

        return exports;
    })({});

    /* ------------------------------ matcher ------------------------------ */

     var getalljsonvalueswhere =  getalljsonrecords = findalljsonrecordsthatmatch =  matcher = _.matcher = (function (exports) {
        /* Return a predicate function that checks if attrs are contained in an object.
         *
         * |Name  |Desc                              |
         * |------|----------------------------------|
         * |attrs |Object of property values to match|
         * |return|New predicate function            |
         */

        /* example
         * const filter = require('licia/filter');
         *
         * const objects = [
         *     { a: 1, b: 2, c: 3 },
         *     { a: 4, b: 5, c: 6 }
         * ];
         * filter(objects, matcher({ a: 4, c: 6 })); // -> [{a: 4, b: 5, c: 6}]
         */

        /* typescript
         * export declare function matcher(attrs: any): types.AnyFn;
         */

        /* dependencies
         * extendOwn isMatch types 
         */

        exports = function(attrs) {
            attrs = extendOwn({}, attrs);
            return function(obj) {
                return isMatch(obj, attrs);
            };
        };

        return exports;
    })({});

    /* ------------------------------ nextTick ------------------------------ */

    var nextTick = _.nextTick = (function (exports) {
        /* Next tick for both node and browser.
         *
         * |Name|Desc            |
         * |----|----------------|
         * |cb  |Function to call|
         *
         * Use process.nextTick if available.
         *
         * Otherwise setImmediate or setTimeout is used as fallback.
         */

        /* example
         * nextTick(function() {
         *     // Do something...
         * });
         */

        /* typescript
         * export declare function nextTick(cb: types.AnyFn): void;
         */

        /* dependencies
         * types 
         */

        if (typeof process === 'object' && process.nextTick && !false) {
            exports = process.nextTick;
        } else if (typeof setImmediate === 'function') {
            exports = function(cb) {
                setImmediate(ensureCallable(cb));
            };
        } else {
            exports = function(cb) {
                setTimeout(ensureCallable(cb), 0);
            };
        }

        function ensureCallable(fn) {
            if (typeof fn !== 'function')
                throw new TypeError(fn + ' is not a function');
            return fn;
        }

        return exports;
    })({});

    /* ------------------------------ noop ------------------------------ */

    var noop = _.noop = (function (exports) {
        /* A no-operation function.
         */

        /* example
         * noop(); // Does nothing
         */

        /* typescript
         * export declare function noop(): void;
         */
        exports = function() {};

        return exports;
    })({});

    /* ------------------------------ pick ------------------------------ */

    var pick =  filtereverythingexcept = _.pick = (function (exports) {
        /* Return a filtered copy of an object.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |object|Source object  |
         * |filter|Object filter  |
         * |return|Filtered object|
         */

        /* example
         * pick({ a: 1, b: 2 }, 'a'); // -> {a: 1}
         * pick({ a: 1, b: 2, c: 3 }, ['b', 'c']); // -> {b: 2, c: 3}
         * pick({ a: 1, b: 2, c: 3, d: 4 }, function(val, key) {
         *     return val % 2;
         * }); // -> {a: 1, c: 3}
         */

        /* typescript
         * export declare function pick(
         *     object: any,
         *     filter: string | string[] | Function
         * ): any;
         */

        /* dependencies
         * isStr isArr contain each 
         */

        exports = function(obj, filter, omit) {
            if (isStr(filter)) filter = [filter];

            if (isArr(filter)) {
                var keys = filter;

                filter = function(val, key) {
                    return contain(keys, key);
                };
            }

            var ret = {};

            var iteratee = function(val, key) {
                if (filter(val, key)) ret[key] = val;
            };

            if (omit) {
                iteratee = function(val, key) {
                    if (!filter(val, key)) ret[key] = val;
                };
            }

            each(obj, iteratee);
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ omit ------------------------------ */
    var without = _.omit = (function (exports) {
        /* Opposite of pick.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |obj   |Source object  |
         * |filter|Object filter  |
         * |return|Filtered object|
         */

        /* example
         * omit({ a: 1, b: 2 }, 'a'); // -> {b: 2}
         * omit({ a: 1, b: 2, c: 3 }, ['b', 'c']); // -> {a: 1}
         * omit({ a: 1, b: 2, c: 3, d: 4 }, function(val, key) {
         *     return val % 2;
         * }); // -> {b: 2, d: 4}
         */

        /* typescript
         * export declare function omit(
         *     obj: any,
         *     filter: string | string[] | Function
         * ): any;
         */

        /* dependencies
         * pick 
         */

        exports = function(obj, filter) {
            return pick(obj, filter, true);
        };

        return exports;
    })({});

    /* ------------------------------ pairs ------------------------------ */
    _.pairs = (function (exports) {
        /* Convert an object into a list of [key, value] pairs.
         *
         * |Name  |Desc                      |
         * |------|--------------------------|
         * |obj   |Object to convert         |
         * |return|List of [key, value] pairs|
         */

        /* example
         * pairs({ a: 1, b: 2 }); // -> [['a', 1], ['b', 2]]
         */

        /* typescript
         * export declare function pairs(obj: any): Array<any[]>;
         */

        /* dependencies
         * keys 
         */

        exports = function(obj) {
            var _keys = keys(obj);

            var len = _keys.length;
            var ret = Array(len);

            for (var i = 0; i < len; i++) {
                ret[i] = [_keys[i], obj[_keys[i]]];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ property ------------------------------ */

    var property = _.property = (function (exports) {
        /* Return a function that will itself return the key property of any passed-in object.
         *
         * |Name  |Desc                       |
         * |------|---------------------------|
         * |path  |Path of the property to get|
         * |return|New accessor function      |
         */

        /* example
         * const obj = { a: { b: 1 } };
         * property('a')(obj); // -> {b: 1}
         * property(['a', 'b'])(obj); // -> 1
         */

        /* typescript
         * export declare function property(path: string | string[]): types.AnyFn;
         */

        /* dependencies
         * isArr safeGet types 
         */

        exports = function(path) {
            if (!isArr(path)) return shallowProperty(path);
            return function(obj) {
                return safeGet(obj, path);
            };
        };

        function shallowProperty(key) {
            return function(obj) {
                return obj == null ? void 0 : obj[key];
            };
        }

        return exports;
    })({});

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb = _.safeCb = (function (exports) {
        /* Create callback based on input value.
         */

        /* typescript
         * export declare function safeCb(
         *     val?: any,
         *     ctx?: any,
         *     argCount?: number
         * ): types.AnyFn;
         */

        /* dependencies
         * isFn isObj isArr optimizeCb matcher identity types property 
         */

        exports = function(val, ctx, argCount) {
            if (val == null) return identity;
            if (isFn(val)) return optimizeCb(val, ctx, argCount);
            if (isObj(val) && !isArr(val)) return matcher(val);
            return property(val);
        };

        return exports;
    })({});

    /* ------------------------------ filter ------------------------------ */

    var filter = _.filter = (function (exports) {
        /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
         *
         * |Name     |Desc                                   |
         * |---------|---------------------------------------|
         * |obj      |Collection to iterate over             |
         * |predicate|Function invoked per iteration         |
         * |ctx      |Predicate context                      |
         * |return   |Array of all values that pass predicate|
         */

        /* example
         * filter([1, 2, 3, 4, 5], function(val) {
         *     return val % 2 === 0;
         * }); // -> [2, 4]
         */

        /* typescript
         * export declare function filter<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): T[];
         * export declare function filter<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): T[];
         */

        /* dependencies
         * safeCb each types 
         */

        exports = function(obj, predicate, ctx) {
            var ret = [];
            predicate = safeCb(predicate, ctx);
            each(obj, function(val, idx, list) {
                if (predicate(val, idx, list)) ret.push(val);
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ compact ------------------------------ */
    removegarbage = _.compact = (function (exports) {
        /* Return a copy of the array with all falsy values removed.
         *
         * The values false, null, 0, "", undefined, and NaN are falsey.
         *
         * |Name  |Desc                        |
         * |------|----------------------------|
         * |arr   |Array to compact            |
         * |return|New array of filtered values|
         */

        /* example
         * compact([0, 1, false, 2, '', 3]); // -> [1, 2, 3]
         */

        /* typescript
         * export declare function compact(arr: any[]): any[];
         */

        /* dependencies
         * filter 
         */

        exports = function(arr) {
            return filter(arr, function(val) {
                return !!val;
            });
        };

        return exports;
    })({});

    /* ------------------------------ unique ------------------------------ */

    var unique = _.unique = (function (exports) {
        /* Create duplicate-free version of an array.
         *
         * |Name  |Desc                         |
         * |------|-----------------------------|
         * |arr   |Array to inspect             |
         * |cmp   |Function for comparing values|
         * |return|New duplicate free array     |
         */

        /* example
         * unique([1, 2, 3, 1]); // -> [1, 2, 3]
         */

        /* typescript
         * export declare function unique(
         *     arr: any[],
         *     cmp?: (a: any, b: any) => boolean | number
         * ): any[];
         */

        /* dependencies
         * filter 
         */

        exports = function(arr, cmp) {
            cmp = cmp || isEqual;
            return filter(arr, function(item, idx, arr) {
                var len = arr.length;

                while (++idx < len) {
                    if (cmp(item, arr[idx])) return false;
                }

                return true;
            });
        };

        function isEqual(a, b) {
            return a === b;
        }

        return exports;
    })({});

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function (exports) {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name   |Desc                       |
         * |-------|---------------------------|
         * |obj    |Object to query            |
         * |options|Options                    |
         * |return |Array of all property names|
         *
         * Available options:
         *
         * |Name              |Desc                     |
         * |------------------|-------------------------|
         * |prototype=true    |Include prototype keys   |
         * |unenumerable=false|Include unenumerable keys|
         * |symbol=false      |Include symbol keys      |
         *
         * Members of Object's prototype won't be retrieved.
         */

        /* example
         * const obj = Object.create({ zero: 0 });
         * obj.one = 1;
         * allKeys(obj); // -> ['zero', 'one']
         */

        /* typescript
         * export declare namespace allKeys {
         *     interface IOptions {
         *         prototype?: boolean;
         *         unenumerable?: boolean;
         *     }
         * }
         * export declare function allKeys(
         *     obj: any,
         *     options: { symbol: true } & allKeys.IOptions
         * ): Array<string | Symbol>;
         * export declare function allKeys(
         *     obj: any,
         *     options?: ({ symbol: false } & allKeys.IOptions) | allKeys.IOptions
         * ): string[];
         */

        /* dependencies
         * keys getProto unique 
         */

        var getOwnPropertyNames = Object.getOwnPropertyNames;
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;

        exports = function(obj) {
            var _ref =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref$prototype = _ref.prototype,
                prototype = _ref$prototype === void 0 ? true : _ref$prototype,
                _ref$unenumerable = _ref.unenumerable,
                unenumerable = _ref$unenumerable === void 0 ? false : _ref$unenumerable,
                _ref$symbol = _ref.symbol,
                symbol = _ref$symbol === void 0 ? false : _ref$symbol;

            var ret = [];

            if ((unenumerable || symbol) && getOwnPropertyNames) {
                var getKeys = keys;
                if (unenumerable && getOwnPropertyNames) getKeys = getOwnPropertyNames;

                do {
                    ret = ret.concat(getKeys(obj));

                    if (symbol && getOwnPropertySymbols) {
                        ret = ret.concat(getOwnPropertySymbols(obj));
                    }
                } while (
                    prototype &&
                    (obj = getProto(obj)) &&
                    obj !== Object.prototype
                );

                ret = unique(ret);
            } else {
                if (prototype) {
                    for (var key in obj) {
                        ret.push(key);
                    }
                } else {
                    ret = keys(obj);
                }
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ defaults ------------------------------ */

    var defaults = _.defaults = (function (exports) {
        /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |obj   |Destination object|
         * |...src|Sources objects   |
         * |return|Destination object|
         */

        /* example
         * defaults({ name: 'RedHood' }, { name: 'Unknown', age: 24 }); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function defaults(obj: any, ...src: any[]): any;
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys, true);

        return exports;
    })({});

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports) {
        /* Copy all of the properties in the source objects over to the destination object.
         *
         * |Name       |Desc              |
         * |-----------|------------------|
         * |destination|Destination object|
         * |...sources |Sources objects   |
         * |return     |Destination object|
         */

        /* example
         * extend({ name: 'RedHood' }, { age: 24 }); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function extend(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ findIdx ------------------------------ */

    var findIdx = _.findIdx = (function (exports) {
        /* Return the first index where the predicate truth test passes.
         *
         * |Name     |Desc                          |
         * |---------|------------------------------|
         * |arr      |Array to search               |
         * |predicate|Function invoked per iteration|
         * |return   |Index of matched element      |
         */

        /* example
         * findIdx(
         *     [
         *         {
         *             name: 'john',
         *             age: 24
         *         },
         *         {
         *             name: 'jane',
         *             age: 23
         *         }
         *     ],
         *     function(val) {
         *         return val.age === 23;
         *     }
         * ); // -> 1
         */

        /* typescript
         * export declare function findIdx(arr: any[], predicate: types.AnyFn): number;
         */

        /* dependencies
         * safeCb types 
         */

        exports = function(arr, predicate, ctx, dir) {
            dir = dir || 1;
            predicate = safeCb(predicate, ctx);
            var len = arr.length;
            var i = dir > 0 ? 0 : len - 1;

            while (i >= 0 && i < len) {
                if (predicate(arr[i], i, arr)) return i;
                i += dir;
            }

            return -1;
        };

        return exports;
    })({});

    /* ------------------------------ findLastIdx ------------------------------ */
    _.findLastIdx = (function (exports) {
        /* Return the last index where the predicate truth test passes.
         *
         * |Name     |Desc                          |
         * |---------|------------------------------|
         * |arr      |Array to search               |
         * |predicate|Function invoked per iteration|
         * |return   |Last index of matched element |
         */

        /* example
         * findLastIdx(
         *     [
         *         {
         *             name: 'john',
         *             age: 24
         *         },
         *         {
         *             name: 'jane',
         *             age: 23
         *         },
         *         {
         *             name: 'kitty',
         *             age: 24
         *         }
         *     ],
         *     function(val) {
         *         return val.age === 24;
         *     }
         * ); // -> 2
         */

        /* typescript
         * export declare function findLastIdx(arr: any[], predicate: types.AnyFn): number;
         */

        /* dependencies
         * findIdx types 
         */

        exports = function(arr, predicate, ctx) {
            return findIdx(arr, predicate, ctx, -1);
        };

        return exports;
    })({});

    /* ------------------------------ findKey ------------------------------ */

    var findkeynamewhereval =  findKey = _.findKey = (function (exports) {
        /* Return the first key where the predicate truth test passes.
         *
         * |Name     |Desc                          |
         * |---------|------------------------------|
         * |obj      |Object to search              |
         * |predicate|Function invoked per iteration|
         * |ctx      |Predicate context             |
         * |return   |Key of matched element        |
         */

        /* example
         * findKey({ a: 1, b: 2 }, function(val) {
         *     return val === 1;
         * }); // -> a
         */

        /* typescript
         * export declare function findKey(
         *     obj: any,
         *     predicate: types.AnyFn,
         *     ctx?: any
         * ): string | void;
         */

        /* dependencies
         * safeCb keys types 
         */

        exports = function(obj, predicate, ctx) {
            predicate = safeCb(predicate, ctx);

            var _keys = keys(obj);

            var key;

            for (var i = 0, len = _keys.length; i < len; i++) {
                key = _keys[i];
                if (predicate(obj[key], key, obj)) return key;
            }
        };

        return exports;
    })({});

    /* ------------------------------ find ------------------------------ */
    var jsonfindwherekeyvalueis = _.find = (function (exports) {
        /* Find the first value that passes a truth test in a collection.
         *
         * |Name    |Desc                             |
         * |--------|---------------------------------|
         * |object  |Collection to iterate over       |
         * |iterator|Function invoked per iteration   |
         * |context |Predicate context                |
         * |return  |First value that passes predicate|
         */

        /* example
         * find(
         *     [
         *         {
         *             name: 'john',
         *             age: 24
         *         },
         *         {
         *             name: 'jane',
         *             age: 23
         *         }
         *     ],
         *     function(val) {
         *         return val.age === 23;
         *     }
         * ); // -> {name: 'jane', age: 23}
         */

        /* typescript
         * export declare function find<T>(
         *     object: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): T | undefined;
         * export declare function find<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): T | undefined;
         */

        /* dependencies
         * findKey findIdx isArrLike isUndef types 
         */

        exports = function(obj, predicate, ctx) {
            var keyFinder = isArrLike(obj) ? findIdx : findKey;
            var key = keyFinder(obj, predicate, ctx);
            if (!isUndef(key) && key !== -1) return obj[key];
        };

        return exports;
    })({});

    /* ------------------------------ map ------------------------------ */

    var map = _.map = (function (exports) {
        /* Create an array of values by running each element in collection through iteratee.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |object  |Collection to iterate over    |
         * |iterator|Function invoked per iteration|
         * |context |Function context              |
         * |return  |New mapped array              |
         */

        /* example
         * map([4, 8], function(n) {
         *     return n * n;
         * }); // -> [16, 64]
         */

        /* typescript
         * export declare function map<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, TResult>,
         *     context?: any
         * ): TResult[];
         * export declare function map<T, TResult>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, TResult>,
         *     context?: any
         * ): TResult[];
         */

        /* dependencies
         * safeCb keys isArrLike types 
         */

        exports = function(obj, iterator, ctx) {
            iterator = safeCb(iterator, ctx);

            var _keys = !isArrLike(obj) && keys(obj);

            var len = (_keys || obj).length;
            var results = Array(len);

            for (var i = 0; i < len; i++) {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iterator(obj[curKey], curKey, obj);
            }

            return results;
        };

        return exports;
    })({});

    /* ------------------------------ pluck ------------------------------ */
   var filterallinjsonobexcept  =  _.pluck = (function (exports) {
        /* Extract a list of property values.
         *
         * |Name  |Desc                           |
         * |------|-------------------------------|
         * |obj   |Collection to iterate over     |
         * |key   |Property path                  |
         * |return|New array of specified property|
         */

        /* example
         * const stooges = [
         *     { name: 'moe', age: 40 },
         *     { name: 'larry', age: 50 },
         *     { name: 'curly', age: 60 }
         * ];
         * pluck(stooges, 'name'); // -> ['moe', 'larry', 'curly']
         */

        /* typescript
         * export declare function pluck(object: any, key: string | string[]): any[];
         */

        /* dependencies
         * map property 
         */

        exports = function(obj, key) {
            return map(obj, property(key));
        };

        return exports;
    })({});

    /* ------------------------------ toArr ------------------------------ */

    var toArr = _.toArr = (function (exports) {
        /* Convert value to an array.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |val   |Value to convert|
         * |return|Converted array |
         */

        /* example
         * toArr({ a: 1, b: 2 }); // -> [{a: 1, b: 2}]
         * toArr('abc'); // -> ['abc']
         * toArr(1); // -> [1]
         * toArr(null); // -> []
         */

        /* typescript
         * export declare function toArr(val: any): any[];
         */

        /* dependencies
         * isArrLike map isArr isStr 
         */

        exports = function(val) {
            if (!val) return [];
            if (isArr(val)) return val;
            if (isArrLike(val) && !isStr(val)) return map(val);
            return [val];
        };

        return exports;
    })({});

    /* ------------------------------ Class ------------------------------ */

    var Class = _.Class = (function (exports) {
        /* Create JavaScript class.
         *
         * |Name   |Desc                             |
         * |-------|---------------------------------|
         * |methods|Public methods                   |
         * [statics|Static methods                   |
         * |return |Function used to create instances|
         */

        /* example
         * const People = Class({
         *     initialize: function People(name, age) {
         *         this.name = name;
         *         this.age = age;
         *     },
         *     introduce: function() {
         *         return 'I am ' + this.name + ', ' + this.age + ' years old.';
         *     }
         * });
         *
         * const Student = People.extend(
         *     {
         *         initialize: function Student(name, age, school) {
         *             this.callSuper(People, 'initialize', arguments);
         *
         *             this.school = school;
         *         },
         *         introduce: function() {
         *             return (
         *                 this.callSuper(People, 'introduce') +
         *                 '\n I study at ' +
         *                 this.school +
         *                 '.'
         *             );
         *         }
         *     },
         *     {
         *         is: function(obj) {
         *             return obj instanceof Student;
         *         }
         *     }
         * );
         *
         * const a = new Student('allen', 17, 'Hogwarts');
         * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
         * Student.is(a); // -> true
         */

        /* typescript
         * export declare namespace Class {
         *     class Base {
         *         toString(): string;
         *     }
         *     class IConstructor extends Base {
         *         constructor(...args: any[]);
         *         static extend(methods: any, statics: any): IConstructor;
         *         static inherits(Class: types.AnyFn): void;
         *         static methods(methods: any): IConstructor;
         *         static statics(statics: any): IConstructor;
         *         [method: string]: any;
         *     }
         * }
         * export declare function Class(methods: any, statics?: any): Class.IConstructor;
         */

        /* dependencies
         * extend toArr inherits safeGet isMiniProgram types 
         */

        exports = function(methods, statics) {
            return Base.extend(methods, statics);
        };

        function makeClass(parent, methods, statics) {
            statics = statics || {};
            var className =
                methods.className || safeGet(methods, 'initialize.name') || '';
            delete methods.className;
            var ctor;

            if (isMiniProgram) {
                ctor = function() {
                    var args = toArr(arguments);
                    return this.initialize
                        ? this.initialize.apply(this, args) || this
                        : this;
                };
            } else {
                ctor = new Function(
                    'toArr',
                    'return function ' +
                        className +
                        '()' +
                        '{' +
                        'var args = toArr(arguments);' +
                        'return this.initialize ? this.initialize.apply(this, args) || this : this;' +
                        '};'
                )(toArr);
            }

            inherits(ctor, parent);
            ctor.prototype.constructor = ctor;

            ctor.extend = function(methods, statics) {
                return makeClass(ctor, methods, statics);
            };

            ctor.inherits = function(Class) {
                inherits(ctor, Class);
            };

            ctor.methods = function(methods) {
                extend(ctor.prototype, methods);
                return ctor;
            };

            ctor.statics = function(statics) {
                extend(ctor, statics);
                return ctor;
            };

            ctor.methods(methods).statics(statics);
            return ctor;
        }

        var Base = (exports.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function(parent, name, args) {
                var superMethod = parent.prototype[name];
                return superMethod.apply(this, args);
            },
            toString: function() {
                return this.constructor.name;
            }
        }));

        return exports;
    })({});

    /* ------------------------------ LinkedList ------------------------------ */

    var LinkedList = _.LinkedList = (function (exports) {
        /* Doubly-linked list implementation.
         *
         * ### size
         *
         * List size.
         *
         * ### head.
         *
         * First node.
         *
         * ### tail
         *
         * Last node.
         *
         * ### push
         *
         * Add an value to the end of the list.
         *
         * |Name  |Desc         |
         * |------|-------------|
         * |val   |Value to push|
         * |return|Current size |
         *
         * ### pop
         *
         * Get the last value of the list.
         *
         * ### unshift
         *
         * Add an value to the head of the list.
         *
         * ### shift
         *
         * Get the first value of the list.
         *
         * ### rmNode
         *
         * Remove node.
         *
         * ### find
         *
         * Find node.
         *
         * |Name  |Desc                             |
         * |------|---------------------------------|
         * |fn    |Function invoked per iteration   |
         * |return|First value that passes predicate|
         *
         * ### forEach
         *
         * Iterate over the list.
         *
         * ### toArr
         *
         * Convert the list to a JavaScript array.
         */

        /* example
         * const linkedList = new LinkedList();
         * linkedList.push(5);
         * linkedList.pop(); // -> 5
         */

        /* typescript
         * export declare namespace LinkedList {
         *     class Node {
         *         value: any;
         *         prev: Node | null;
         *         next: Node | null;
         *     }
         * }
         * export declare class LinkedList {
         *     size: number;
         *     head: LinkedList.Node;
         *     tail: LinkedList.Node;
         *     push(val: any): number;
         *     pop(): any;
         *     unshift(val: any): number;
         *     shift(): any;
         *     find(fn: types.AnyFn): LinkedList.Node | void;
         *     delNode(node: LinkedList.Node): void;
         *     forEach(iterator: types.AnyFn, ctx?: any);
         *     toArr(): any[];
         * }
         */

        /* dependencies
         * Class types 
         */

        exports = Class({
            initialize: function LinkedList() {
                this.tail = null;
                this.head = null;
                this.size = 0;
            },
            push: function(val) {
                var node = new Node(val, this.tail, null, this);
                this.tail = node;
                this.head = this.head || node;
                this.size++;
                return this.size;
            },
            pop: function() {
                if (!this.tail) return;
                var node = this.tail;
                this.tail = node.prev;

                if (this.tail) {
                    this.tail.next = null;
                } else {
                    this.head = null;
                }

                this.size--;
                return node.value;
            },
            unshift: function(val) {
                var node = new Node(val, null, this.head, this);
                this.head = node;
                this.tail = this.tail || node;
                this.size++;
                return this.size;
            },
            shift: function() {
                if (!this.head) return;
                var node = this.head;
                this.head = node.next;

                if (this.head) {
                    this.head.prev = null;
                } else {
                    this.tail = null;
                }

                this.size--;
                return node.value;
            },
            rmNode: function(node) {
                if (node.list !== this) {
                    throw Error('Node does not belong to this list');
                }

                var next = node.next,
                    prev = node.prev;

                if (next) {
                    next.prev = prev;
                }

                if (prev) {
                    prev.next = next;
                }

                if (node === this.head) {
                    this.head = next;
                }

                if (node === this.tail) {
                    this.tail = prev;
                }

                node.list = null;
                node.prev = null;
                node.next = null;
                this.size--;
            },
            find: function(fn) {
                for (var i = 0, current = this.head; current !== null; i++) {
                    if (fn(current.value)) {
                        return current;
                    }

                    current = current.next;
                }
            },
            forEach: function(iterator, ctx) {
                ctx = arguments.length > 1 ? ctx : this;

                for (var i = 0, current = this.head; current !== null; i++) {
                    iterator.call(ctx, current.value, i, this);
                    current = current.next;
                }
            },
            toArr: function() {
                var arr = new Array(this.size);

                for (var i = 0, current = this.head; current !== null; i++) {
                    arr[i] = current.value;
                    current = current.next;
                }

                return arr;
            }
        });
        var Node = (exports.Node = Class({
            initialize: function Node(val, prev, next, list) {
                this.value = val;
                this.list = list;

                if (prev) {
                    prev.next = this;
                    this.prev = prev;
                } else {
                    this.prev = null;
                }

                if (next) {
                    next.prev = this;
                    this.next = next;
                } else {
                    this.next = null;
                }
            }
        }));

        return exports;
    })({});

    /* ------------------------------ HashTable ------------------------------ */
    _.HashTable = (function (exports) {
        /* Hash table implementation.
         *
         * ### constructor
         *
         * |Name   |Desc       |
         * |-------|-----------|
         * |size=32|Bucket size|
         *
         * ### set
         *
         * Set value.
         *
         * |Name|Desc        |
         * |----|------------|
         * |key |Value key   |
         * |val |Value to set|
         *
         * ### get
         *
         * Get value.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |key   |Value key         |
         * |return|Value of given key|
         *
         * ### has
         *
         * Check if has value.
         *
         * |Name  |Desc                |
         * |------|--------------------|
         * |key   |Value key           |
         * |return|True if value exists|
         *
         * ### delete
         *
         * Delete value.
         */

        /* example
         * const hashTable = new HashTable(128);
         * hashTable.set('name', 'redhoodsu');
         * hashTable.get('name'); // -> 'redhoodsu'
         * hashTable.has('name'); // -> true
         * hashTable.delete('name');
         * hashTable.has('name'); // -> false
         */

        /* typescript
         * export declare class HashTable {
         *     constructor(size?: number);
         *     set(key: string, val: any): void;
         *     get(key: string): any;
         *     has(key: string): boolean;
         *     delete(key: string): void;
         * }
         */

        /* dependencies
         * Class LinkedList map strHash has 
         */

        exports = Class({
            initialize: function HashTable() {
                var size =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : 32;
                this._buckets = map(Array(size), function() {
                    return new LinkedList();
                });
                this._keys = {};
            },
            set: function(key, val) {
                var keyHash = this._hash(key);

                this._keys[key] = keyHash;
                var linkedList = this._buckets[keyHash];
                var node = linkedList.find(function(val) {
                    return val.key === key;
                });

                if (!node) {
                    linkedList.push({
                        key: key,
                        value: val
                    });
                } else {
                    node.value.value = val;
                }
            },
            get: function(key) {
                var linkedList = this._buckets[this._hash(key)];

                var node = linkedList.find(function(val) {
                    return val.key === key;
                });

                if (node) {
                    return node.value.value;
                }
            },
            has: function(key) {
                return has(this._keys, key);
            },
            delete: function(key) {
                var keyHash = this._hash(key);

                delete this._keys[key];
                var linkedList = this._buckets[keyHash];
                var node = linkedList.find(function(val) {
                    return val.key === key;
                });

                if (node) {
                    linkedList.rmNode(node);
                }
            },
            _hash: function(key) {
                return strHash(key) % this._buckets.length;
            }
        });

        return exports;
    })({});

    /* ------------------------------ intersect ------------------------------ */
   var intersect =  intersectwith =  _.intersect = (function (exports) {
        /* Compute the list of values that are the intersection of all the arrays.
         *
         * |Name  |Desc                          |
         * |------|------------------------------|
         * |...arr|Arrays to inspect             |
         * |return|New array of inspecting values|
         */

        /* example
         * intersect([1, 2, 3, 4], [2, 1, 10], [2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function intersect(...arr: Array<any[]>): any[];
         */

        /* dependencies
         * contain toArr 
         */

        exports = function(arr) {
            var ret = [];
            var args = toArr(arguments);
            var argsLen = args.length;

            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                if (contain(ret, item)) continue;
                var j = 1;

                for (; j < argsLen; j++) {
                    if (!contain(args[j], item)) break;
                }

                if (j === argsLen) ret.push(item);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ partial ------------------------------ */

    var partial = _.partial = (function (exports) {
        /* Partially apply a function by filling in given arguments.
         *
         * |Name       |Desc                                    |
         * |-----------|----------------------------------------|
         * |fn         |Function to partially apply arguments to|
         * |...partials|Arguments to be partially applied       |
         * |return     |New partially applied function          |
         */

        /* example
         * const sub5 = partial(function(a, b) {
         *     return b - a;
         * }, 5);
         * sub5(20); // -> 15
         */

        /* typescript
         * export declare function partial(
         *     fn: types.AnyFn,
         *     ...partials: any[]
         * ): types.AnyFn;
         */

        /* dependencies
         * restArgs toArr types 
         */

        exports = restArgs(function(fn, partials) {
            return function() {
                var args = [];
                args = args.concat(partials);
                args = args.concat(toArr(arguments));
                return fn.apply(this, args);
            };
        });

        return exports;
    })({});

    /* ------------------------------ mapObj ------------------------------ */
    _.mapObj = (function (exports) {
        /* Map for objects.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |object  |Object to iterate over        |
         * |iterator|Function invoked per iteration|
         * |context |Function context              |
         * |return  |New mapped object             |
         */

        /* example
         * mapObj({ a: 1, b: 2 }, function(val, key) {
         *     return val + 1;
         * }); // -> {a: 2, b: 3}
         */

        /* typescript
         * export declare function mapObj<T, TResult>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, TResult>,
         *     context?: any
         * ): types.Dictionary<TResult>;
         */

        /* dependencies
         * safeCb keys types 
         */

        exports = function(obj, iterator, ctx) {
            iterator = safeCb(iterator, ctx);

            var _keys = keys(obj);

            var len = _keys.length;
            var ret = {};

            for (var i = 0; i < len; i++) {
                var curKey = _keys[i];
                ret[curKey] = iterator(obj[curKey], curKey, obj);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ remove ------------------------------ */
   var removewhere = _.remove = (function (exports) {
        /* Remove all elements from array that predicate returns truthy for and return an array of the removed elements.
         *
         * Unlike filter, this method mutates array.
         *
         * |Name    |Desc                                |
         * |--------|------------------------------------|
         * |list    |Collection to iterate over          |
         * |iterator|Function invoked per iteration      |
         * |context |Predicate context                   |
         * |return  |Array of all values that are removed|
         */

        /* example
         * const arr = [1, 2, 3, 4, 5];
         * const evens = remove(arr, function(val) {
         *     return val % 2 === 0;
         * });
         * console.log(arr); // -> [1, 3, 5]
         * console.log(evens); // -> [2, 4]
         */

        /* typescript
         * export declare function remove<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): TResult[];
         */

        /* dependencies
         * safeCb types 
         */

        exports = function(arr, iterator, ctx) {
            var ret = [];
            iterator = safeCb(iterator, ctx);
            var i = -1;
            var len = arr.length;

            while (++i < len) {
                var val = arr[i];

                if (iterator(val, i, arr)) {
                    ret.push(val);
                    arr.splice(i, 1);
                }
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ safeDel ------------------------------ */
    var safeDel = deleteprop  = _.safeDel = (function (exports) {
        /* Delete object property.
         *
         * |Name  |Desc                      |
         * |------|--------------------------|
         * |obj   |Object to query           |
         * |path  |Path of property to delete|
         * |return|Deleted value or undefined|
         */

        /* example
         * const obj = { a: { aa: { aaa: 1 } } };
         * safeDel(obj, 'a.aa.aaa'); // -> 1
         * safeDel(obj, ['a', 'aa']); // -> {}
         * safeDel(obj, 'a.b'); // -> undefined
         */

        /* typescript
         * export declare function safeDel(obj: any, path: string | string[]): any;
         */

        /* dependencies
         * isUndef castPath 
         */

        exports = function(obj, path) {
            path = castPath(path, obj);
            var prop, ret;
            /* eslint-disable no-cond-assign */

            while ((prop = path.shift())) {
                ret = obj[prop];
                if (path.length === 0) delete obj[prop];
                obj = ret;
                if (isUndef(obj)) return;
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ safeSet ------------------------------ */
    var safeSet = setprop = _.safeSet = (function (exports) {
        /* Set value at path of object.
         *
         * If a portion of path doesn't exist, it's created.
         *
         * |Name|Desc                   |
         * |----|-----------------------|
         * |obj |Object to modify       |
         * |path|Path of property to set|
         * |val |Value to set           |
         */

        /* example
         * const obj = {};
         * safeSet(obj, 'a.aa.aaa', 1); // obj = {a: {aa: {aaa: 1}}}
         * safeSet(obj, ['a', 'aa'], 2); // obj = {a: {aa: 2}}
         * safeSet(obj, 'a.b', 3); // obj = {a: {aa: 2, b: 3}}
         */

        /* typescript
         * export declare function safeSet(
         *     obj: any,
         *     path: string | string[],
         *     val: any
         * ): void;
         */

        /* dependencies
         * castPath isUndef 
         */

        exports = function(obj, path, val) {
            path = castPath(path, obj);
            var lastProp = path.pop();
            var prop;
            prop = path.shift();

            while (!isUndef(prop)) {
                if (!obj[prop]) obj[prop] = {};
                obj = obj[prop];
                prop = path.shift();
            }

            obj[lastProp] = val;
        };

        return exports;
    })({});

    /* ------------------------------ sortKeys ------------------------------ */
    _.sortKeys = (function (exports) {
        /* Sort keys of an object.
         *
         * |Name   |Desc                   |
         * |-------|-----------------------|
         * |obj    |Object to sort         |
         * |options|Sort options           |
         * |return |Object with sorted keys|
         *
         * Available options:
         *
         * |Name      |Desc                 |
         * |----------|---------------------|
         * |deep=false|Sort keys recursively|
         * |comparator|Comparator           |
         */

        /* example
         * sortKeys(
         *     { b: { d: 2, c: 1 }, a: 0 },
         *     {
         *         deep: true
         *     }
         * ); // -> {a: 0, b: {c: 1, d: 2}}
         */

        /* typescript
         * export declare function sortKeys(
         *     obj: object,
         *     options?: {
         *         deep?: boolean;
         *         comparator?: types.AnyFn;
         *     }
         * ): object;
         */

        /* dependencies
         * isSorted defaults keys isArr isObj types 
         */

        exports = function(obj) {
            var options =
                arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            defaults(options, defOpts);
            var deep = options.deep,
                comparator = options.comparator;
            var visited = [];
            var visitedResult = [];

            function sort(obj) {
                var idx = visited.indexOf(obj);

                if (idx > -1) {
                    return visitedResult[idx];
                }

                var result;

                if (isArr(obj)) {
                    result = [];
                    visited.push(obj);
                    visitedResult.push(result);

                    for (var i = 0, len = obj.length; i < len; i++) {
                        var value = obj[i];

                        if (deep && isObj(value)) {
                            result[i] = sort(value);
                        } else {
                            result[i] = value;
                        }
                    }
                } else {
                    result = {};
                    visited.push(obj);
                    visitedResult.push(result);

                    var _keys = keys(obj).sort(comparator);

                    for (var _i = 0, _len = _keys.length; _i < _len; _i++) {
                        var key = _keys[_i];
                        var _value = obj[key];

                        if (deep && isObj(_value)) {
                            result[key] = sort(_value);
                        } else {
                            result[key] = _value;
                        }
                    }
                }

                return result;
            }

            return sort(obj);
        };

        var defOpts = {
            deep: false,
            comparator: isSorted.defComparator
        };

        return exports;
    })({});

    /* ------------------------------ splitPath ------------------------------ */
    _.splitPath = (function (exports) {
        /* Split path into dir, name and ext.
         *
         * |Name  |Desc                               |
         * |------|-----------------------------------|
         * |path  |Path to split                      |
         * |return|Object containing dir, name and ext|
         */

        /* example
         * splitPath('f:/foo/bar.txt'); // -> {dir: 'f:/foo/', name: 'bar.txt', ext: '.txt'}
         * splitPath('/home/foo/bar.txt'); // -> {dir: '/home/foo/', name: 'bar.txt', ext: '.txt'}
         */

        /* typescript
         * export declare function splitPath(
         *     path: string
         * ): {
         *     dir: string;
         *     name: string;
         *     ext: string;
         * };
         */
        exports = function(path) {
            var match = path.match(regSplit);
            return {
                dir: match[1],
                name: match[2],
                ext: match[3]
            };
        };

        var regSplit = /^([\s\S]*?)((?:\.{1,2}|[^\\/]+?|)(\.[^./\\]*|))(?:[\\/]*)$/;

        return exports;
    })({});

    /* ------------------------------ swap ------------------------------ */
    _.swap = (function (exports) {
        /* Swap two items in an array.
         *
         * |Name  |Desc         |
         * |------|-------------|
         * |arr   |Array to swap|
         * |a     |First index  |
         * |b     |Second index |
         * |return|Array given  |
         */

        /* example
         * const arr = [1, 2];
         * swap(arr, 0, 1); // -> [2, 1]
         */

        /* typescript
         * export declare function swap(arr: any[], a: number, b: number): any[];
         */
        exports = function(arr, a, b) {
            var tmp = arr[a];
            arr[a] = arr[b];
            arr[b] = tmp;
            return arr;
        };

        return exports;
    })({});

    /* ------------------------------ union ------------------------------ */
    var union = _.union = (function (exports) {
        /* Create an array of unique values, in order, from all given arrays.
         *
         * |Name  |Desc                        |
         * |------|----------------------------|
         * |...arr|Arrays to inspect           |
         * |return|New array of combined values|
         */

        /* example
         * union([2, 1], [4, 2], [1, 2]); // -> [2, 1, 4]
         */

        /* typescript
         * export declare function union(...arr: Array<any[]>): any[];
         */

        /* dependencies
         * restArgs unique flatten 
         */

        exports = restArgs(function(arrays) {
            return unique(flatten(arrays));
        });

        return exports;
    })({});

    /* ------------------------------ waterfall ------------------------------ */
    _.waterfall = (function (exports) {
        /* Run an array of functions in series.
         *
         * |Name |Desc                   |
         * |-----|-----------------------|
         * |tasks|Array of functions     |
         * |cb   |Callback once completed|
         */

        /* example
         * waterfall(
         *     [
         *         function(cb) {
         *             cb(null, 'one');
         *         },
         *         function(arg1, cb) {
         *             // arg1 -> 'one'
         *             cb(null, 'done');
         *         }
         *     ],
         *     function(err, result) {
         *         // result -> 'done'
         *     }
         * );
         */

        /* typescript
         * export declare function waterfall(tasks: types.AnyFn[], cb?: types.AnyFn): void;
         */

        /* dependencies
         * noop nextTick restArgs types 
         */

        exports = function(tasks, cb) {
            cb = cb || noop;
            var current = 0;
            var taskCb = restArgs(function(err, args) {
                if (++current >= tasks.length || err) {
                    args.unshift(err);
                    nextTick(function() {
                        cb.apply(null, args);
                    });
                } else {
                    args.push(taskCb);
                    tasks[current].apply(null, args);
                }
            });

            if (tasks.length) {
                tasks[0](taskCb);
            } else {
                nextTick(function() {
                    cb();
                });
            }
        };

        return exports;
    })({});

    /* ------------------------------ wrap ------------------------------ */
    _.wrap = (function (exports) {
        /* Wrap the function inside a wrapper function, passing it as the first argument.
         *
         * |Name   |Desc            |
         * |-------|----------------|
         * |fn     |Function to wrap|
         * |wrapper|Wrapper function|
         * |return |New function    |
         */

        /* example
         * const p = wrap(escape, function(fn, text) {
         *     return '<p>' + fn(text) + '</p>';
         * });
         * p('You & Me'); // -> '<p>You &amp; Me</p>'
         */

        /* typescript
         * export declare function wrap(
         *     fn: types.AnyFn,
         *     wrapper: types.AnyFn
         * ): types.AnyFn;
         */

        /* dependencies
         * partial types 
         */

        exports = function(fn, wrapper) {
            return partial(wrapper, fn);
        };

        return exports;
    })({});

      /* ------------------------------ extendDeep ------------------------------ */
    var mergwithobj = _.extendDeep = (function (exports) {
        /* Recursive object extending.
         *
         * |Name       |Desc              |
         * |-----------|------------------|
         * |destination|Destination object|
         * |...sources |Sources objects   |
         * |return     |Destination object|
         */

        /* example
         * extendDeep(
         *     {
         *         name: 'RedHood',
         *         family: {
         *             mother: 'Jane',
         *             father: 'Jack'
         *         }
         *     },
         *     {
         *         family: {
         *             brother: 'Bruce'
         *         }
         *     }
         * );
         * // -> {name: 'RedHood', family: {mother: 'Jane', father: 'Jack', brother: 'Bruce'}}
         */

        /* typescript
         * export declare function extendDeep(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * isPlainObj each cloneDeep 
         */

        exports = function(obj) {
            var i = 0;
            var ret = obj;
            var len = arguments.length;

            while (++i < len) {
                obj = arguments[i];

                if (isPlainObj(ret) && isPlainObj(obj)) {
                    each(obj, function(val, key) {
                        if (key === '__proto__') return;
                        ret[key] = exports(ret[key], obj[key]);
                    });
                } else {
                    ret = cloneDeep(obj);
                }
            }

            return ret;
        };

        return exports;
    })({});

    return _;
}));