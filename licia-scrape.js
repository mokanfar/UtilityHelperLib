// Built by eustia.
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

    /* ------------------------------ last ------------------------------ */

    var last = _.last = (function (exports) {
        /* Get the last element of array.
         *
         * |Name  |Desc                     |
         * |------|-------------------------|
         * |arr   |The array to query       |
         * |return|The last element of array|
         */

        /* example
         * last([1, 2]); // -> 2
         */

        /* typescript
         * export declare function last(arr: any[]): any;
         */
        exports = function(arr) {
            var len = arr ? arr.length : 0;
            if (len) return arr[len - 1];
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

    /* ------------------------------ reverse ------------------------------ */

    var reverse = _.reverse = (function (exports) {
        /* Reverse array without mutating it.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |arr   |Array to modify|
         * |return|Reversed array |
         */

        /* example
         * reverse([1, 2, 3]); // -> [3, 2, 1]
         */

        /* typescript
         * export declare function reverse(arr: any[]): any[];
         */
        exports = function(arr) {
            var len = arr.length;
            var ret = Array(len);
            len--;

            for (var i = 0; i <= len; i++) {
                ret[len - i] = arr[i];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ isBrowser ------------------------------ */

    var isBrowser = _.isBrowser = (function (exports) {
        /* Check if running in a browser.
         */

        /* example
         * console.log(isBrowser); // -> true if running in a browser
         */

        /* typescript
         * export declare const isBrowser: boolean;
         */
        exports =
            typeof window === 'object' &&
            typeof document === 'object' &&
            document.nodeType === 9;

        return exports;
    })({});

    /* ------------------------------ splitCase ------------------------------ */

    var splitCase = _.splitCase = (function (exports) {
        /* Split different string case to an array.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |str   |String to split|
         * |return|Result array   |
         */

        /* example
         * splitCase('foo-bar'); // -> ['foo', 'bar']
         * splitCase('foo bar'); // -> ['foo', 'bar']
         * splitCase('foo_bar'); // -> ['foo', 'bar']
         * splitCase('foo.bar'); // -> ['foo', 'bar']
         * splitCase('fooBar'); // -> ['foo', 'bar']
         * splitCase('foo-Bar'); // -> ['foo', 'bar']
         */

        /* typescript
         * export declare function splitCase(str: string): string[];
         */
        var regUpperCase = /([A-Z])/g;
        var regSeparator = /[_.\- ]+/g;
        var regTrim = /(^-)|(-$)/g;

        exports = function(str) {
            str = str
                .replace(regUpperCase, '-$1')
                .toLowerCase()
                .replace(regSeparator, '-')
                .replace(regTrim, '');
            return str.split('-');
        };

        return exports;
    })({});

    /* ------------------------------ camelCase ------------------------------ */

    var camelCase = _.camelCase = (function (exports) {
        /* Convert string to "camelCase".
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to convert |
         * |return|Camel cased string|
         */

        /* example
         * camelCase('foo-bar'); // -> fooBar
         * camelCase('foo bar'); // -> fooBar
         * camelCase('foo_bar'); // -> fooBar
         * camelCase('foo.bar'); // -> fooBar
         */

        /* typescript
         * export declare function camelCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function(str) {
            var arr = splitCase(str);
            var ret = arr[0];
            arr.shift();
            arr.forEach(capitalize, arr);
            ret += arr.join('');
            return ret;
        };

        function capitalize(val, idx) {
            this[idx] = val.replace(/\w/, function(match) {
                return match.toUpperCase();
            });
        }

        return exports;
    })({});

    /* ------------------------------ kebabCase ------------------------------ */

    var kebabCase = _.kebabCase = (function (exports) {
        /* Convert string to "kebabCase".
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to convert |
         * |return|Kebab cased string|
         */

        /* example
         * kebabCase('fooBar'); // -> foo-bar
         * kebabCase('foo bar'); // -> foo-bar
         * kebabCase('foo_bar'); // -> foo-bar
         * kebabCase('foo.bar'); // -> foo-bar
         */

        /* typescript
         * export declare function kebabCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function(str) {
            return splitCase(str).join('-');
        };

        return exports;
    })({});

    /* ------------------------------ capitalize ------------------------------ */

    var capitalize = _.capitalize = (function (exports) {
        /* Convert the first character to upper case and the remaining to lower case.
         *
         * |Name  |Desc                |
         * |------|--------------------|
         * |str   |String to capitalize|
         * |return|Capitalized string  |
         */

        /* example
         * capitalize('rED'); // -> Red
         */

        /* typescript
         * export declare function capitalize(str: string): string;
         */
        exports = function(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        };

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var has = _.has = (function (exports) {
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

    var keys = _.keys = (function (exports) {
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

    /* ------------------------------ debounce ------------------------------ */

    var debounce = _.debounce = (function (exports) {
        /* Return a new debounced version of the passed function.
         *
         * |Name  |Desc                           |
         * |------|-------------------------------|
         * |fn    |Function to debounce           |
         * |wait  |Number of milliseconds to delay|
         * |return|New debounced function         |
         */

        /* example
         * const calLayout = debounce(function() {}, 300);
         * // $(window).resize(calLayout);
         */

        /* typescript
         * export declare function debounce<T extends types.AnyFn>(fn: T, wait: number): T;
         */

        /* dependencies
         * types 
         */

        exports = function(fn, wait, immediate) {
            var timeout;
            return function() {
                var ctx = this;
                var args = arguments;

                var throttler = function() {
                    timeout = null;
                    fn.apply(ctx, args);
                };

                if (!immediate) clearTimeout(timeout);
                if (!immediate || !timeout) timeout = setTimeout(throttler, wait);
            };
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

    /* ------------------------------ escapeRegExp ------------------------------ */

    var escapeRegExp = _.escapeRegExp = (function (exports) {
        /* Escape special chars to be used as literals in RegExp constructors.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |str   |String to escape|
         * |return|Escaped string  |
         */

        /* example
         * escapeRegExp('[licia]'); // -> '\\[licia\\]'
         */

        /* typescript
         * export declare function escapeRegExp(str: string): string;
         */
        exports = function(str) {
            return str.replace(/\W/g, '\\$&');
        };

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

    /* ------------------------------ root ------------------------------ */

    var root = _.root = (function (exports) {
        /* Root object reference, `global` in nodeJs, `window` in browser. */

        /* typescript
         * export declare const root: any;
         */

        /* dependencies
         * isBrowser 
         */

        exports = isBrowser ? window : global;

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

    /* ------------------------------ isAbsoluteUrl ------------------------------ */
    _.isAbsoluteUrl = (function (exports) {
        /* Check if an url is absolute.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |url   |Url to check           |
         * |return|True if url is absolute|
         */

        /* example
         * isAbsoluteUrl('http://www.surunzi.com'); // -> true
         * isAbsoluteUrl('//www.surunzi.com'); // -> false
         * isAbsoluteUrl('surunzi.com'); // -> false
         */

        /* typescript
         * export declare function isAbsoluteUrl(url: string): boolean;
         */
        exports = function(url) {
            return regAbsolute.test(url);
        };

        var regAbsolute = /^[a-z][a-z0-9+.-]*:/;

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

    /* ------------------------------ isArgs ------------------------------ */

    var isArgs = _.isArgs = (function (exports) {
        /* Check if value is classified as an arguments object.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |val   |Value to check                      |
         * |return|True if value is an arguments object|
         */

        /* example
         * (function() {
         *     isArgs(arguments); // -> true
         * })();
         */

        /* typescript
         * export declare function isArgs(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object Arguments]';
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

    var safeGet = _.safeGet = (function (exports) {
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

    /* ------------------------------ arrToMap ------------------------------ */

    var arrToMap = _.arrToMap = (function (exports) {
        /* Make an object map using array of strings.
         *
         * |Name    |Desc            |
         * |--------|----------------|
         * |arr     |Array of strings|
         * |val=true|Key value       |
         * |return  |Object map      |
         */

        /* example
         * const needPx = arrToMap([
         *     'column-count',
         *     'columns',
         *     'font-weight',
         *     'line-weight',
         *     'opacity',
         *     'z-index',
         *     'zoom'
         * ]);
         * const key = 'column-count';
         * let val = '5';
         * if (needPx[key]) val += 'px';
         * console.log(val); // -> '5px'
         */

        /* typescript
         * export declare function arrToMap<T>(
         *     arr: string[],
         *     val?: T
         * ): { [key: string]: T };
         */

        /* dependencies
         * each isUndef isFn 
         */

        exports = function(arr, val) {
            if (isUndef(val)) val = true;

            var _isFn = isFn(val);

            var ret = {};
            each(arr, function(key) {
                ret[key] = _isFn ? val(key) : val;
            });
            return ret;
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

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function (exports) {
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

    /* ------------------------------ isEmpty ------------------------------ */

    var isEmpty = _.isEmpty = (function (exports) {
        /* Check if value is an empty object or array.
         *
         * |Name  |Desc                  |
         * |------|----------------------|
         * |val   |Value to check        |
         * |return|True if value is empty|
         */

        /* example
         * isEmpty([]); // -> true
         * isEmpty({}); // -> true
         * isEmpty(''); // -> true
         */

        /* typescript
         * export declare function isEmpty(val: any): boolean;
         */

        /* dependencies
         * isArrLike isArr isStr isArgs keys 
         */

        exports = function(val) {
            if (val == null) return true;

            if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val))) {
                return val.length === 0;
            }

            return keys(val).length === 0;
        };

        return exports;
    })({});

    /* ------------------------------ isEl ------------------------------ */
    _.isEl = (function (exports) {
        /* Check if value is a DOM element.
         *
         * |Name  |Desc                          |
         * |------|------------------------------|
         * |val   |Value to check                |
         * |return|True if value is a DOM element|
         */

        /* example
         * isEl(document.body); // -> true
         */

        /* typescript
         * export declare function isEl(val: any): boolean;
         */
        exports = function(val) {
            return !!(val && val.nodeType === 1);
        };

        return exports;
    })({});

    /* ------------------------------ isHidden ------------------------------ */
    _.isHidden = (function (exports) {
        /* Check if element is hidden.
         *
         * |Name   |Desc                     |
         * |-------|-------------------------|
         * |el     |Target element           |
         * |options|Check options            |
         * |return |True if element is hidden|
         *
         * Available options:
         *
         * |Name            |Desc                         |
         * |----------------|-----------------------------|
         * |display=true    |Check if it is displayed     |
         * |visibility=false|Check visibility css property|
         * |opacity=false   |Check opacity css property   |
         * |size=false      |Check width and height       |
         * |viewport=false  |Check if it is in viewport   |
         * |overflow=false  |Check if hidden in overflow  |
         */

        /* example
         * isHidden(document.createElement('div')); // -> true
         */

        /* typescript
         * export declare function isHidden(
         *     el: Element,
         *     options?: {
         *         display?: boolean;
         *         visibility?: boolean;
         *         opacity?: boolean;
         *         size?: boolean;
         *         viewport?: boolean;
         *         overflow?: boolean;
         *     }
         * ): boolean;
         */

        /* dependencies
         * root 
         */

        var getComputedStyle = root.getComputedStyle;
        var document = root.document;

        exports = function(el) {
            var _ref =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref$display = _ref.display,
                display = _ref$display === void 0 ? true : _ref$display,
                _ref$visibility = _ref.visibility,
                visibility = _ref$visibility === void 0 ? false : _ref$visibility,
                _ref$opacity = _ref.opacity,
                opacity = _ref$opacity === void 0 ? false : _ref$opacity,
                _ref$size = _ref.size,
                size = _ref$size === void 0 ? false : _ref$size,
                _ref$viewport = _ref.viewport,
                viewport = _ref$viewport === void 0 ? false : _ref$viewport,
                _ref$overflow = _ref.overflow,
                overflow = _ref$overflow === void 0 ? false : _ref$overflow;

            if (display) {
                return el.offsetParent === null;
            }

            var computedStyle = getComputedStyle(el);

            if (visibility && computedStyle.visibility === 'hidden') {
                return true;
            }

            if (opacity) {
                if (computedStyle.opacity === '0') {
                    return true;
                } else {
                    var cur = el;

                    while ((cur = cur.parentElement)) {
                        var _computedStyle = getComputedStyle(cur);

                        if (_computedStyle.opacity === '0') {
                            return true;
                        }
                    }
                }
            }

            var clientRect = el.getBoundingClientRect();

            if (size && (clientRect.width === 0 || clientRect.height === 0)) {
                return true;
            }

            if (viewport) {
                var containerRect = {
                    top: 0,
                    left: 0,
                    right: document.documentElement.clientWidth,
                    bottom: document.documentElement.clientHeight
                };
                return isOutside(clientRect, containerRect);
            }

            if (overflow) {
                var _cur = el;

                while ((_cur = _cur.parentElement)) {
                    var _computedStyle2 = getComputedStyle(_cur);

                    var _overflow = _computedStyle2.overflow;

                    if (_overflow === 'scroll' || _overflow === 'hidden') {
                        var curRect = _cur.getBoundingClientRect();

                        if (isOutside(clientRect, curRect)) return true;
                    }
                }
            }

            return false;
        };

        function isOutside(clientRect, containerRect) {
            return (
                clientRect.right < containerRect.left ||
                clientRect.left > containerRect.right ||
                clientRect.bottom < containerRect.top ||
                clientRect.top > containerRect.bottom
            );
        }

        return exports;
    })({});

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function (exports) {
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

    /* ------------------------------ isUrl ------------------------------ */
    _.isUrl = (function (exports) {
        /* Loosely validate an url.
         *
         * |Name  |Desc                               |
         * |------|-----------------------------------|
         * |val   |Value to check                     |
         * |return|True if value is an url like string|
         */

        /* example
         * isUrl('http://www.example.com?foo=bar&param=test'); // -> true
         */

        /* typescript
         * export declare function isUrl(val: string): boolean;
         */
        exports = function(val) {
            return regUrl.test(val);
        };

        var regUrl = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

        return exports;
    })({});

    /* ------------------------------ isWindows ------------------------------ */

    var isWindows = _.isWindows = (function (exports) {
        /* Check if platform is windows.
         */

        /* example
         * console.log(isWindows); // -> true if running on windows
         */

        /* typescript
         * export declare const isWindows: boolean;
         */

        exports = false;

        if (typeof process !== 'undefined') {
            exports =
                process.platform === 'win32' ||
                process.env.OSTYPE === 'cygwin' ||
                process.env.OSTYPE === 'msys';
        }

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

    /* ------------------------------ lowerCase ------------------------------ */

    var lowerCase = _.lowerCase = (function (exports) {
        /* Convert string to lower case.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to convert |
         * |return|Lower cased string|
         */

        /* example
         * lowerCase('TEST'); // -> 'test'
         */

        /* typescript
         * export declare function lowerCase(str: string): string;
         */

        /* dependencies
         * toStr 
         */

        exports = function(str) {
            return toStr(str).toLocaleLowerCase();
        };

        return exports;
    })({});

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim = _.ltrim = (function (exports) {
        /* Remove chars or white-spaces from beginning of string.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to trim    |
         * |chars |Characters to trim|
         * |return|Trimmed string    |
         */

        /* example
         * ltrim(' abc  '); // -> 'abc  '
         * ltrim('_abc_', '_'); // -> 'abc_'
         * ltrim('_abc_', ['a', '_']); // -> 'bc_'
         */

        /* typescript
         * export declare function ltrim(str: string, chars?: string | string[]): string;
         */
        var regSpace = /^\s+/;

        exports = function(str, chars) {
            if (chars == null) return str.replace(regSpace, '');
            var start = 0;
            var len = str.length;
            var charLen = chars.length;
            var found = true;
            var i;
            var c;

            while (found && start < len) {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen) {
                    if (c === chars[i]) {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return start >= len ? '' : str.substr(start, len);
        };

        return exports;
    })({});

    /* ------------------------------ matcher ------------------------------ */

    var matcher = _.matcher = (function (exports) {
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

    /* ------------------------------ memoize ------------------------------ */

    var memoize = _.memoize = (function (exports) {
        /* Memoize a given function by caching the computed result.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |fn    |Function to have its output memoized|
         * |hashFn|Function to create cache key        |
         * |return|New memoized function               |
         */

        /* example
         * const fibonacci = memoize(function(n) {
         *     return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
         * });
         */

        /* typescript
         * export declare function memoize(
         *     fn: types.AnyFn,
         *     hashFn?: types.AnyFn
         * ): types.AnyFn;
         */

        /* dependencies
         * has types 
         */

        exports = function(fn, hashFn) {
            var memoize = function(key) {
                var cache = memoize.cache;
                var address = '' + (hashFn ? hashFn.apply(this, arguments) : key);
                if (!has(cache, address)) cache[address] = fn.apply(this, arguments);
                return cache[address];
            };

            memoize.cache = {};
            return memoize;
        };

        return exports;
    })({});

    /* ------------------------------ open ------------------------------ */
    _.open = (function (exports) {
        /* Open stuff like url, files.
         *
         * |Name  |Desc         |
         * |------|-------------|
         * |target|Stuff to open|
         * |return|Child process|
         */

        /* example
         * open('https://eustia.liriliri.io/');
         */

        /* typescript
         * export declare function open(target: string): any;
         */

        /* dependencies
         * isWindows 
         */

        const childProcess = require('child_process');

        exports = function(target) {
            let cmd;
            const args = [];

            if (isWindows) {
                cmd = 'cmd';
                args.push('/c', 'start', '""', '/b');
            } else {
                cmd = 'open';
            }

            args.push(target);

            const cp = childProcess.spawn(cmd, args);
            cp.unref();

            return cp;
        };

        return exports;
    })({});

    /* ------------------------------ startWith ------------------------------ */

    var startWith = _.startWith = (function (exports) {
        /* Check if string starts with the given target string.
         *
         * |Name  |Desc                             |
         * |------|---------------------------------|
         * |str   |String to search                 |
         * |prefix|String prefix                    |
         * |return|True if string starts with prefix|
         */

        /* example
         * startWith('ab', 'a'); // -> true
         */

        /* typescript
         * export declare function startWith(str: string, prefix: string): boolean;
         */
        exports = function(str, prefix) {
            return str.indexOf(prefix) === 0;
        };

        return exports;
    })({});

    /* ------------------------------ parseHtml ------------------------------ */

    var parseHtml = _.parseHtml = (function (exports) {
        /* Simple html parser.
         *
         * |Name   |Desc         |
         * |-------|-------------|
         * |html   |Html to parse|
         * |handler|Handlers     |
         */

        /* example
         * parseHtml('<div>licia</div>', {
         *     start: (tag, attrs, unary) => {},
         *     end: tag => {},
         *     comment: text => {},
         *     text: text => {}
         * });
         */

        /* typescript
         * export declare function parseHtml(
         *     html: string,
         *     handlers: {
         *         start?: (tag: string, attrs: any, unary: boolean) => void;
         *         end?: (tag: string) => void;
         *         comment?: (text: string) => void;
         *         text?: (text: string) => void;
         *     }
         * ): void;
         */

        /* dependencies
         * last arrToMap startWith lowerCase 
         */ // https://johnresig.com/files/htmlparser.js

        exports = function(html, handler) {
            var stack = [];
            var text;
            var lastHtml = html;

            while (html) {
                text = true;

                if (!last(stack) || !SPECIAL[last(stack)]) {
                    if (startWith(html, '<!--')) {
                        var endIdx = html.indexOf('-->');

                        if (endIdx >= 0) {
                            if (handler.comment) {
                                handler.comment(html.substring(4, endIdx));
                            }

                            html = html.substring(endIdx + 3);
                            text = false;
                        }
                    } else if (startWith(html, '<!')) {
                        var match = html.match(regDoctype);

                        if (match) {
                            if (handler.text)
                                handler.text(html.substring(0, match[0].length));
                            html = html.substring(match[0].length);
                            text = false;
                        }
                    } else if (startWith(html, '</')) {
                        var _match = html.match(regEndTag);

                        if (_match) {
                            html = html.substring(_match[0].length);

                            _match[0].replace(regEndTag, parseEndTag);

                            text = false;
                        }
                    } else if (startWith(html, '<')) {
                        var _match2 = html.match(regStartTag);

                        if (_match2) {
                            html = html.substring(_match2[0].length);

                            _match2[0].replace(regStartTag, parseStartTag);

                            text = false;
                        }
                    }

                    if (text) {
                        var _endIdx = html.indexOf('<');

                        var _text = _endIdx < 0 ? html : html.substring(0, _endIdx);

                        html = _endIdx < 0 ? '' : html.substring(_endIdx);
                        if (handler.text) handler.text(_text);
                    }
                } else {
                    var execRes = new RegExp('</'.concat(last(stack), '[^>]*>')).exec(
                        html
                    );

                    if (execRes) {
                        var _text2 = html.substring(0, execRes.index);

                        html = html.substring(execRes.index + execRes[0].length);
                        if (_text2 && handler.text) handler.text(_text2);
                    }

                    parseEndTag('', last(stack));
                }

                if (lastHtml === html) {
                    throw Error('Parse Error: ' + html);
                }

                lastHtml = html;
            }

            parseEndTag();

            function parseStartTag(tag, tagName, rest, unary) {
                tagName = lowerCase(tagName);
                unary = !!unary;
                if (!unary) stack.push(tagName);

                if (handler.start) {
                    var attrs = {};
                    rest.replace(regAttr, function(all, $1, $2, $3, $4) {
                        attrs[$1] = $2 || $3 || $4;
                    });
                    handler.start(tagName, attrs, unary);
                }
            }

            function parseEndTag(tag, tagName) {
                tagName = lowerCase(tagName);
                var pos;

                if (!tagName) {
                    pos = 0;
                } else {
                    for (pos = stack.length - 1; pos >= 0; pos--) {
                        if (stack[pos] === tagName) break;
                    }
                }

                if (pos >= 0) {
                    for (var i = stack.length - 1; i >= pos; i--) {
                        if (handler.end) handler.end(stack[i]);
                    }

                    stack.length = pos;
                }
            }
        };

        var regDoctype = /^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i;
        var regEndTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
        var regStartTag = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i;
        var regAttr = /([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // https://www.w3.org/TR/html/syntax.html#raw-text

        var SPECIAL = arrToMap('script,style'.split(','));

        return exports;
    })({});

    /* ------------------------------ upperFirst ------------------------------ */

    var upperFirst = _.upperFirst = (function (exports) {
        /* Convert the first character of string to upper case.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |str   |String to convert|
         * |return|Converted string |
         */

        /* example
         * upperFirst('red'); // -> Red
         */

        /* typescript
         * export declare function upperFirst(str: string): string;
         */
        exports = function(str) {
            if (str.length < 1) return str;
            return str[0].toUpperCase() + str.slice(1);
        };

        return exports;
    })({});

    /* ------------------------------ prefix ------------------------------ */

    var prefix = _.prefix = (function (exports) {
        /* Add vendor prefixes to a CSS attribute.
         *
         * |Name  |Desc                  |
         * |------|----------------------|
         * |name  |Property name         |
         * |return|Prefixed property name|
         *
         * ### dash
         *
         * Create a dasherize version.
         */

        /* example
         * prefix('text-emphasis'); // -> 'WebkitTextEmphasis'
         * prefix.dash('text-emphasis'); // -> '-webkit-text-emphasis'
         * prefix('color'); // -> 'color'
         */

        /* typescript
         * export declare namespace prefix {
         *     function dash(name: string): string;
         * }
         * export declare function prefix(name: string): string;
         */

        /* dependencies
         * memoize camelCase upperFirst has kebabCase 
         */

        exports = memoize(function(name) {
            name = name.replace(regPrefixes, '');
            name = camelCase(name);
            if (has(style, name)) return name;
            var i = prefixes.length;

            while (i--) {
                var prefixName = prefixes[i] + upperFirst(name);
                if (has(style, prefixName)) return prefixName;
            }

            return name;
        });
        exports.dash = memoize(function(name) {
            var camelCaseResult = exports(name);
            return (
                (regPrefixes.test(camelCaseResult) ? '-' : '') +
                kebabCase(camelCaseResult)
            );
        });
        var prefixes = ['O', 'ms', 'Moz', 'Webkit'];
        var regPrefixes = /^(O)|(ms)|(Moz)|(Webkit)|(-o-)|(-ms-)|(-moz-)|(-webkit-)/g;
        var style = document.createElement('p').style;

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

    /* ------------------------------ fetch ------------------------------ */
    _.fetch = (function (exports) {
        /* Turn XMLHttpRequest into promise like.
         *
         * Note: This is not a complete fetch pollyfill.
         *
         * |Name   |Desc           |
         * |-------|---------------|
         * |url    |Request url    |
         * |options|Request options|
         * |return |Request promise|
         */

        /* example
         * fetch('test.json', {
         *     method: 'GET',
         *     timeout: 3000,
         *     headers: {},
         *     body: ''
         * })
         *     .then(function(res) {
         *         return res.json();
         *     })
         *     .then(function(data) {
         *         console.log(data);
         *     });
         */

        /* typescript
         * export declare namespace fetch {
         *     interface IResult {
         *         ok: boolean;
         *         status: number;
         *         statusText: string;
         *         url: string;
         *         clone(): IResult;
         *         text(): Promise<string>;
         *         json(): Promise<any>;
         *         xml(): Promise<Document | null>;
         *         blob(): Promise<Blob>;
         *         headers: {
         *             keys(): string[];
         *             entries(): Array<string[]>;
         *             get(name: string): string;
         *             has(name: string): boolean;
         *         };
         *     }
         * }
         * export declare function fetch(
         *     url: string,
         *     options?: {
         *         method?: string;
         *         timeout?: number;
         *         headers?: { [name: string]: string };
         *         body?: any;
         *     }
         * ): Promise<fetch.IResult>;
         */

        /* dependencies
         * each defaults noop has root 
         */

        var Promise = root.Promise;

        exports = function(url, options) {
            options = options || {};
            defaults(options, exports.setting);
            return new Promise(function(resolve, reject) {
                var xhr = options.xhr();
                var headers = options.headers;
                var body = options.body;
                var timeout = options.timeout;
                var abortTimer;
                xhr.withCredentials = options.credentials == 'include';

                xhr.onload = function() {
                    clearTimeout(abortTimer);
                    resolve(getRes(xhr));
                };

                xhr.onerror = reject;
                xhr.open(options.method, url, true);
                each(headers, function(val, key) {
                    xhr.setRequestHeader(key, val);
                });

                if (timeout > 0) {
                    setTimeout(function() {
                        xhr.onload = noop;
                        xhr.abort();
                        reject(Error('timeout'));
                    }, timeout);
                }

                xhr.send(body);
            });
        };

        var regHeaders = /^(.*?):\s*([\s\S]*?)$/gm;

        function getRes(xhr) {
            var keys = [];
            var all = [];
            var headers = {};
            var header;
            xhr.getAllResponseHeaders().replace(regHeaders, function(m, key, val) {
                key = key.toLowerCase();
                keys.push(key); // Duplicated headers is possible.

                all.push([key, val]);
                header = headers[key];
                headers[key] = header ? header + ',' + val : val;
            });
            return {
                ok: xhr.status >= 200 && xhr.status < 400,
                status: xhr.status,
                statusText: xhr.statusText,
                url: xhr.responseURL,
                clone: function() {
                    return getRes(xhr);
                },
                text: function() {
                    return Promise.resolve(xhr.responseText);
                },
                json: function() {
                    return Promise.resolve(xhr.responseText).then(JSON.parse);
                },
                xml: function() {
                    return Promise.resolve(xhr.responseXML);
                },
                blob: function() {
                    return Promise.resolve(new Blob([xhr.response]));
                },
                headers: {
                    keys: function() {
                        return keys;
                    },
                    entries: function() {
                        return all;
                    },
                    get: function(name) {
                        return headers[name.toLowerCase()];
                    },
                    has: function(name) {
                        return has(headers, name);
                    }
                }
            };
        }

        exports.setting = {
            method: 'GET',
            headers: {},
            timeout: 0,
            xhr: function() {
                return new XMLHttpRequest();
            }
        };

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

    /* ------------------------------ normalizeHeader ------------------------------ */
    _.normalizeHeader = (function (exports) {
        /* Normalize http header name.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |header|Header to normalize|
         * |return|Normalized header  |
         */

        /* example
         * normalizeHeader('content-type'); // -> 'Content-Type'
         * normalizeHeader('etag'); // -> 'ETag'
         */

        /* typescript
         * export declare function normalizeHeader(header: string): string;
         */

        /* dependencies
         * map capitalize 
         */

        exports = function(header) {
            var ret = specialHeaders[header.toLowerCase()];

            if (!ret) {
                ret = map(header.split('-'), capitalize).join('-');
            }

            return ret;
        };

        var specialHeaders = {
            'content-md5': 'Content-MD5',
            dnt: 'DNT',
            etag: 'ETag',
            'last-event-id': 'Last-Event-ID',
            tcn: 'TCN',
            te: 'TE',
            'www-authenticate': 'WWW-Authenticate',
            'x-dnsprefetch-control': 'X-DNSPrefetch-Control'
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

    /* ------------------------------ Select ------------------------------ */

    var Select = _.Select = (function (exports) {
        /* Simple wrapper of querySelectorAll to make dom selection easier.
         *
         * ### constructor
         *
         * |Name    |Desc               |
         * |--------|-------------------|
         * |selector|Dom selector string|
         *
         * ### find
         *
         * Get desdendants of current matched elements.
         *
         * |Name    |Desc               |
         * |--------|-------------------|
         * |selector|Dom selector string|
         *
         * ### each
         *
         * Iterate over matched elements.
         *
         * |Name|Desc                                |
         * |----|------------------------------------|
         * |fn  |Function to execute for each element|
         */

        /* example
         * const $test = new Select('#test');
         * $test.find('.test').each(function(idx, element) {
         *     // Manipulate dom nodes
         * });
         */

        /* typescript
         * export declare class Select {
         *     constructor(selector: string | Element);
         *     find(selector: string): Select;
         *     each(fn: types.AnyFn): Select;
         * }
         */

        /* dependencies
         * Class isStr each types 
         */

        exports = Class({
            className: 'Select',
            initialize: function(selector) {
                this.length = 0;
                if (!selector) return this;
                if (isStr(selector)) return rootSelect.find(selector);

                if (selector.nodeType) {
                    this[0] = selector;
                    this.length = 1;
                }
            },
            find: function(selector) {
                var ret = new exports();
                this.each(function() {
                    mergeArr(ret, this.querySelectorAll(selector));
                });
                return ret;
            },
            each: function(fn) {
                each(this, function(element, idx) {
                    fn.call(element, idx, element);
                });
                return this;
            }
        });
        var rootSelect = new exports(document);

        function mergeArr(first, second) {
            var len = second.length;
            var i = first.length;

            for (var j = 0; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;
            return first;
        }

        return exports;
    })({});

    /* ------------------------------ $safeEls ------------------------------ */

    var $safeEls = _.$safeEls = (function (exports) {
        /* Convert value into an array, if it's a string, do querySelector.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |val   |Value to convert |
         * |return|Array of elements|
         */

        /* example
         * $safeEls(document.querySelector('.test'));
         * $safeEls(document.querySelectorAll('.test'));
         * $safeEls('.test'); // -> Array of elements with test class
         */

        /* typescript
         * export declare namespace $safeEls {
         *     type El = Element | Element[] | NodeListOf<Element> | string;
         * }
         * export declare function $safeEls(val: $safeEls.El): Element[];
         */

        /* dependencies
         * isStr toArr Select 
         */

        exports = function(val) {
            return toArr(isStr(val) ? new Select(val) : val);
        };

        return exports;
    })({});

    /* ------------------------------ $attr ------------------------------ */

    var $attr = _.$attr = (function (exports) {
        /* Element attribute manipulation.
         *
         * Get the value of an attribute for the first element in the set of matched elements.
         *
         * |Name   |Desc                            |
         * |-------|--------------------------------|
         * |element|Elements to manipulate          |
         * |name   |Attribute name                  |
         * |return |Attribute value of first element|
         *
         * Set one or more attributes for the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Attribute name        |
         * |val    |Attribute value       |
         *
         * |Name      |Desc                                  |
         * |----------|--------------------------------------|
         * |element   |Elements to manipulate                |
         * |attributes|Object of attribute-value pairs to set|
         *
         * ### remove
         *
         * Remove an attribute from each element in the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Attribute name        |
         */

        /* example
         * $attr('#test', 'attr1', 'test');
         * $attr('#test', 'attr1'); // -> test
         * $attr.remove('#test', 'attr1');
         * $attr('#test', {
         *     attr1: 'test',
         *     attr2: 'test'
         * });
         */

        /* typescript
         * export declare namespace $attr {
         *     function remove(element: $safeEls.El, name: string): void;
         * }
         * export declare function $attr(
         *     element: $safeEls.El,
         *     name: string,
         *     value: string
         * ): void;
         * export declare function $attr(
         *     element: $safeEls.El,
         *     attributes: { [name: string]: string }
         * ): void;
         * export declare function $attr(element: $safeEls.El, name: string): string;
         */

        /* dependencies
         * toArr isObj isStr each isUndef $safeEls 
         */

        exports = function(els, name, val) {
            els = $safeEls(els);
            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getAttr(els[0], name);
            var attrs = name;

            if (!isObj(attrs)) {
                attrs = {};
                attrs[name] = val;
            }

            setAttr(els, attrs);
        };

        exports.remove = function(els, names) {
            els = $safeEls(els);
            names = toArr(names);
            each(els, function(node) {
                each(names, function(name) {
                    node.removeAttribute(name);
                });
            });
        };

        function getAttr(el, name) {
            return el.getAttribute(name);
        }

        function setAttr(els, attrs) {
            each(els, function(el) {
                each(attrs, function(val, name) {
                    el.setAttribute(name, val);
                });
            });
        }

        return exports;
    })({});

    /* ------------------------------ $css ------------------------------ */

    var $css = _.$css = (function (exports) {
        /* Element css manipulation.
         *
         * Get the computed style properties for the first element in the set of matched elements.
         *
         * |Name   |Desc                      |
         * |-------|--------------------------|
         * |element|Elements to manipulate    |
         * |name   |Property name             |
         * |return |Css value of first element|
         *
         * Set one or more CSS properties for the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Property name         |
         * |val    |Css value             |
         *
         * |Name      |Desc                            |
         * |----------|--------------------------------|
         * |element   |Elements to manipulate          |
         * |properties|Object of css-value pairs to set|
         */

        /* example
         * $css('#test', {
         *     color: '#fff',
         *     background: 'black'
         * });
         * $css('#test', 'display', 'block');
         * $css('#test', 'color'); // -> #fff
         */

        /* typescript
         * export declare function $css(element: $safeEls.El, name: string): string;
         * export declare function $css(
         *     element: $safeEls.El,
         *     name: string,
         *     val: string
         * ): void;
         * export declare function $css(
         *     element: $safeEls.El,
         *     properties: { [name: string]: string }
         * ): void;
         */

        /* dependencies
         * isStr isObj kebabCase isUndef contain isNum $safeEls prefix each 
         */

        exports = function(nodes, name, val) {
            nodes = $safeEls(nodes);
            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getCss(nodes[0], name);
            var css = name;

            if (!isObj(css)) {
                css = {};
                css[name] = val;
            }

            setCss(nodes, css);
        };

        function getCss(node, name) {
            return (
                node.style[prefix(name)] ||
                getComputedStyle(node, '').getPropertyValue(name)
            );
        }

        function setCss(nodes, css) {
            each(nodes, function(node) {
                var cssText = ';';
                each(css, function(val, key) {
                    key = prefix.dash(key);
                    cssText += key + ':' + addPx(key, val) + ';';
                });
                node.style.cssText += cssText;
            });
        }

        var cssNumProps = [
            'column-count',
            'columns',
            'font-weight',
            'line-weight',
            'opacity',
            'z-index',
            'zoom'
        ];

        function addPx(key, val) {
            var needPx = isNum(val) && !contain(cssNumProps, kebabCase(key));
            return needPx ? val + 'px' : val;
        }

        return exports;
    })({});

    /* ------------------------------ $data ------------------------------ */

    var $data = _.$data = (function (exports) {
        /* Wrapper of $attr, adds data- prefix to keys.
         */

        /* example
         * $data('#test', 'attr1', 'eustia');
         */

        /* typescript
         * export declare function $data(
         *     element: $safeEls.El,
         *     name: string,
         *     value: string
         * ): void;
         * export declare function $data(
         *     element: $safeEls.El,
         *     attributes: { [name: string]: string }
         * ): void;
         * export declare function $data(element: $safeEls.El, name: string): string;
         */

        /* eslint-disable no-unused-vars */

        /* dependencies
         * $attr isStr isObj each $safeEls 
         */

        exports = function(nodes, name, val) {
            var dataName = name;
            if (isStr(name)) dataName = 'data-' + name;

            if (isObj(name)) {
                dataName = {};
                each(name, function(val, key) {
                    dataName['data-' + key] = val;
                });
            }

            return $attr(nodes, dataName, val);
        };

        return exports;
    })({});

    /* ------------------------------ $insert ------------------------------ */

    var $insert = _.$insert = (function (exports) {
        /* Insert html on different position.
         *
         * ### before
         *
         * Insert content before elements.
         *
         * ### after
         *
         * Insert content after elements.
         *
         * ### prepend
         *
         * Insert content to the beginning of elements.
         *
         * ### append
         *
         * Insert content to the end of elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |content|Html strings          |
         */

        /* example
         * // <div id="test"><div class="mark"></div></div>
         * $insert.before('#test', '<div>licia</div>');
         * // -> <div>licia</div><div id="test"><div class="mark"></div></div>
         * $insert.after('#test', '<div>licia</div>');
         * // -> <div id="test"><div class="mark"></div></div><div>licia</div>
         * $insert.prepend('#test', '<div>licia</div>');
         * // -> <div id="test"><div>licia</div><div class="mark"></div></div>
         * $insert.append('#test', '<div>licia</div>');
         * // -> <div id="test"><div class="mark"></div><div>licia</div></div>
         */

        /* typescript
         * export declare namespace $insert {
         *     type IInsert = (element: $safeEls.El, content: string) => void;
         * }
         * export declare const $insert: {
         *     before: $insert.IInsert;
         *     after: $insert.IInsert;
         *     append: $insert.IInsert;
         *     prepend: $insert.IInsert;
         * };
         */

        /* dependencies
         * each $safeEls 
         */

        exports = {
            before: insertFactory('beforebegin'),
            after: insertFactory('afterend'),
            append: insertFactory('beforeend'),
            prepend: insertFactory('afterbegin')
        };

        function insertFactory(type) {
            return function(nodes, val) {
                nodes = $safeEls(nodes);
                each(nodes, function(node) {
                    node.insertAdjacentHTML(type, val);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ $offset ------------------------------ */

    var $offset = _.$offset = (function (exports) {
        /* Get the position of the element in document.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to get offset|
         * |return |Element position      |
         */

        /* example
         * $offset('#test'); // -> {left: 0, top: 0, width: 0, height: 0}
         */

        /* typescript
         * export declare namespace $offset {
         *     interface IOffset {
         *         left: number;
         *         top: number;
         *         width: number;
         *         height: number;
         *     }
         * }
         * export declare function $offset(element: $safeEls.El): $offset.IOffset;
         */

        /* dependencies
         * $safeEls 
         */

        exports = function(els) {
            els = $safeEls(els);
            var el = els[0];
            var clientRect = el.getBoundingClientRect();
            return {
                left: clientRect.left + window.pageXOffset,
                top: clientRect.top + window.pageYOffset,
                width: Math.round(clientRect.width),
                height: Math.round(clientRect.height)
            };
        };

        return exports;
    })({});

    /* ------------------------------ $property ------------------------------ */

    var $property = _.$property = (function (exports) {
        /* Element property html, text, val getter and setter.
         *
         * ### html
         *
         * Get the HTML contents of the first element in the set of matched elements or
         * set the HTML contents of every matched element.
         *
         * ### text
         *
         * Get the combined text contents of each element in the set of matched
         * elements, including their descendants, or set the text contents of the
         * matched elements.
         *
         * ### val
         *
         * Get the current value of the first element in the set of matched elements or
         * set the value of every matched element.
         */

        /* example
         * $property.html('#test', 'licia');
         * $property.html('#test'); // -> licia
         */

        /* typescript
         * export declare namespace $property {
         *     interface IProperty {
         *         (element: $safeEls.El, value: string): void;
         *         (element: $safeEls.El): string;
         *     }
         * }
         * export declare const $property: {
         *     html: $property.IProperty;
         *     val: $property.IProperty;
         *     text: $property.IProperty;
         * };
         */

        /* dependencies
         * isUndef each $safeEls 
         */

        exports = {
            html: propFactory('innerHTML'),
            text: propFactory('textContent'),
            val: propFactory('value')
        };

        function propFactory(name) {
            return function(nodes, val) {
                nodes = $safeEls(nodes);
                var node = nodes[0];

                if (isUndef(val)) {
                    return node ? node[name] : '';
                }

                if (!node) return;
                each(nodes, function(node) {
                    node[name] = val;
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ $remove ------------------------------ */

    var $remove = _.$remove = (function (exports) {
        /* Remove the set of matched elements from the DOM.
         *
         * |Name   |Desc              |
         * |-------|------------------|
         * |element|Elements to delete|
         */

        /* example
         * $remove('#test');
         */

        /* typescript
         * export declare function $remove(element: $safeEls.El);
         */

        /* dependencies
         * each $safeEls 
         */

        exports = function(els) {
            els = $safeEls(els);
            each(els, function(el) {
                var parent = el.parentNode;
                if (parent) parent.removeChild(el);
            });
        };

        return exports;
    })({});

    /* ------------------------------ $show ------------------------------ */

    var $show = _.$show = (function (exports) {
        /* Show elements.
         *
         * |Name   |Desc            |
         * |-------|----------------|
         * |element|Elements to show|
         */

        /* example
         * $show('#test');
         */

        /* typescript
         * export declare function $show(element: $safeEls.El): void;
         */

        /* dependencies
         * each $safeEls 
         */

        exports = function(els) {
            els = $safeEls(els);
            each(els, function(el) {
                if (isHidden(el)) {
                    el.style.display = getDefDisplay(el.nodeName);
                }
            });
        };

        function isHidden(el) {
            return getComputedStyle(el, '').getPropertyValue('display') == 'none';
        }

        var elDisplay = {};

        function getDefDisplay(elName) {
            var el, display;

            if (!elDisplay[elName]) {
                el = document.createElement(elName);
                document.documentElement.appendChild(el);
                display = getComputedStyle(el, '').getPropertyValue('display');
                el.parentNode.removeChild(el);
                display == 'none' && (display = 'block');
                elDisplay[elName] = display;
            }

            return elDisplay[elName];
        }

        return exports;
    })({});

    /* ------------------------------ Stack ------------------------------ */

    var Stack = _.Stack = (function (exports) {
        /* Stack data structure.
         *
         * ### size
         *
         * Stack size.
         *
         * ### clear
         *
         * Clear the stack.
         *
         * ### push
         *
         * Add an item to the stack.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |item  |Item to add |
         * |return|Current size|
         *
         * ### pop
         *
         * Get the last item of the stack.
         *
         * ### peek
         *
         * Get the last item without removing it.
         *
         * ### forEach
         *
         * Iterate over the stack.
         *
         * |Name    |Desc                      |
         * |--------|--------------------------|
         * |iterator|Function invoked iteration|
         * |ctx     |Function context          |
         *
         * ### toArr
         *
         * Convert the stack to a JavaScript array.
         */

        /* example
         * const stack = new Stack();
         *
         * stack.push(2); // -> 1
         * stack.push(3); // -> 2
         * stack.pop(); // -> 3
         */

        /* typescript
         * export declare class Stack {
         *     size: number;
         *     clear(): void;
         *     push(item: any): number;
         *     pop(): any;
         *     peek(): any;
         *     forEach(iterator: types.AnyFn, context?: any): void;
         *     toArr(): any[];
         * }
         */

        /* dependencies
         * Class reverse types 
         */

        exports = Class({
            initialize: function Stack() {
                this.clear();
            },
            clear: function() {
                this._items = [];
                this.size = 0;
            },
            push: function(item) {
                this._items.push(item);

                return ++this.size;
            },
            pop: function() {
                if (!this.size) return;
                this.size--;
                return this._items.pop();
            },
            peek: function() {
                return this._items[this.size - 1];
            },
            forEach: function(iterator, ctx) {
                ctx = arguments.length > 1 ? ctx : this;
                var items = this._items;

                for (var i = this.size - 1, j = 0; i >= 0; i--, j++) {
                    iterator.call(ctx, items[i], j, this);
                }
            },
            toArr: function() {
                return reverse(this._items);
            }
        });

        return exports;
    })({});

    /* ------------------------------ delegate ------------------------------ */

    var delegate = _.delegate = (function (exports) {
        /* Event delegation.
         *
         * ### add
         *
         * Add event delegation.
         *
         * |Name    |Desc          |
         * |--------|--------------|
         * |el      |Parent element|
         * |type    |Event type    |
         * |selector|Match selector|
         * |cb      |Event callback|
         *
         * ### remove
         *
         * Remove event delegation.
         */

        /* example
         * const container = document.getElementById('container');
         * function clickHandler() {
         *     // Do something...
         * }
         * delegate.add(container, 'click', '.children', clickHandler);
         * delegate.remove(container, 'click', '.children', clickHandler);
         */

        /* typescript
         * export declare const delegate: {
         *     add(el: Element, type: string, selector: string, cb: types.AnyFn): void;
         *     remove(el: Element, type: string, selector: string, cb: types.AnyFn): void;
         * };
         */

        /* dependencies
         * Class contain types 
         */

        function retTrue() {
            return true;
        }

        function retFalse() {
            return false;
        }

        function trigger(e) {
            var handlers = this.events[e.type];
            var handler;
            var handlerQueue = formatHandlers.call(this, e, handlers);
            e = new exports.Event(e);
            var i = 0,
                j,
                matched,
                ret;

            while ((matched = handlerQueue[i++]) && !e.isPropagationStopped()) {
                e.curTarget = matched.el;
                j = 0;

                while (
                    (handler = matched.handlers[j++]) &&
                    !e.isImmediatePropagationStopped()
                ) {
                    ret = handler.handler.apply(matched.el, [e]);

                    if (ret === false) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }

        function formatHandlers(e, handlers) {
            var current = e.target;
            var ret = [];
            var delegateCount = handlers.delegateCount;
            var selector;
            var matches;
            var handler;
            var i;

            if (current.nodeType) {
                for (; current !== this; current = current.parentNode || this) {
                    matches = [];

                    for (i = 0; i < delegateCount; i++) {
                        handler = handlers[i];
                        selector = handler.selector + ' ';

                        if (matches[selector] === undefined) {
                            matches[selector] = contain(
                                this.querySelectorAll(selector),
                                current
                            );
                        }

                        if (matches[selector]) matches.push(handler);
                    }

                    if (matches.length)
                        ret.push({
                            el: current,
                            handlers: matches
                        });
                }
            }

            if (delegateCount < handlers.length) {
                ret.push({
                    el: this,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return ret;
        }

        exports = {
            add: function(el, type, selector, fn) {
                var handler = {
                    selector: selector,
                    handler: fn
                };
                var handlers;
                if (!el.events) el.events = {};

                if (!(handlers = el.events[type])) {
                    handlers = el.events[type] = [];
                    handlers.delegateCount = 0;
                    el.addEventListener(
                        type,
                        function() {
                            trigger.apply(el, arguments);
                        },
                        false
                    );
                }

                selector
                    ? handlers.splice(handlers.delegateCount++, 0, handler)
                    : handlers.push(handler);
            },
            remove: function(el, type, selector, fn) {
                var events = el.events;
                if (!events || !events[type]) return;
                var handlers = events[type];
                var i = handlers.length;
                var handler;

                while (i--) {
                    handler = handlers[i];

                    if (
                        (!selector || handler.selector == selector) &&
                        handler.handler == fn
                    ) {
                        handlers.splice(i, 1);

                        if (handler.selector) {
                            handlers.delegateCount--;
                        }
                    }
                }
            },
            Event: Class({
                className: 'Event',
                initialize: function Event(e) {
                    this.origEvent = e;
                },
                isDefaultPrevented: retFalse,
                isPropagationStopped: retFalse,
                isImmediatePropagationStopped: retFalse,
                preventDefault: function() {
                    var e = this.origEvent;
                    this.isDefaultPrevented = retTrue;
                    if (e && e.preventDefault) e.preventDefault();
                },
                stopPropagation: function() {
                    var e = this.origEvent;
                    this.isPropagationStopped = retTrue;
                    if (e && e.stopPropagation) e.stopPropagation();
                },
                stopImmediatePropagation: function() {
                    var e = this.origEvent;
                    this.isImmediatePropagationStopped = retTrue;
                    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
                    this.stopPropagation();
                }
            })
        };

        return exports;
    })({});

    /* ------------------------------ $event ------------------------------ */

    var $event = _.$event = (function (exports) {
        /* bind events to certain dom elements.
         */

        /* example
         * function clickHandler() {
         *     // Do something...
         * }
         * $event.on('#test', 'click', clickHandler);
         * $event.off('#test', 'click', clickHandler);
         */

        /* typescript
         * export declare const $event: {
         *     on(
         *         element: $safeEls.El,
         *         event: string,
         *         selector: string,
         *         handler: types.AnyFn
         *     ): void;
         *     on(element: $safeEls.El, event: string, handler: types.AnyFn): void;
         *     off(
         *         element: $safeEls.El,
         *         event: string,
         *         selector: string,
         *         handler: types.AnyFn
         *     ): void;
         *     off(element: $safeEls.El, event: string, handler: types.AnyFn): void;
         * };
         */

        /* dependencies
         * delegate isUndef $safeEls each types 
         */

        exports = {
            on: eventFactory('add'),
            off: eventFactory('remove')
        };

        function eventFactory(type) {
            return function(nodes, event, selector, handler) {
                nodes = $safeEls(nodes);

                if (isUndef(handler)) {
                    handler = selector;
                    selector = undefined;
                }

                each(nodes, function(node) {
                    delegate[type](node, event, selector, handler);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ mapObj ------------------------------ */

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

    /* ------------------------------ html ------------------------------ */
    _.html = (function (exports) {
        /* Html parser and serializer.
         *
         * ### parse
         *
         * Parse html string into js object.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |html  |Html string     |
         * |return|Parsed js object|
         *
         * ### stringify
         *
         * Stringify object into an html string.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |tree  |Object to stringify|
         * |return|Html string        |
         */

        /* example
         * const tree = html.parse('<div id="name">licia</div>');
         * // -> [{tag: 'div', attrs: {id: 'name'}, content: ['licia']}]
         * html.stringify(tree);
         */

        /* typescript
         * export declare const html: {
         *     parse(html: string): any[];
         *     stringify(tree: any[]): string;
         * };
         */

        /* dependencies
         * parseHtml Stack isArr each isStr mapObj 
         */

        function parse(html) {
            var ret = [];
            var stack = new Stack();
            parseHtml(html, {
                start: function(tag, attrs) {
                    attrs = mapObj(attrs, function(val) {
                        return unescapeQuote(val);
                    });
                    stack.push({
                        tag: tag,
                        attrs: attrs
                    });
                },
                end: function() {
                    var node = stack.pop();

                    if (!stack.size) {
                        ret.push(node);
                        return;
                    }

                    var lastNode = stack.peek();

                    if (!isArr(lastNode.content)) {
                        lastNode.content = [];
                    }

                    lastNode.content.push(node);
                },
                comment: function(text) {
                    var comment = '<!--'.concat(text, '-->');
                    var lastNode = stack.peek();

                    if (!lastNode) {
                        ret.push(comment);
                        return;
                    }

                    if (!lastNode.content) lastNode.content = [];
                    lastNode.content.push(comment);
                },
                text: function(text) {
                    var lastNode = stack.peek();

                    if (!lastNode) {
                        ret.push(text);
                        return;
                    }

                    if (!lastNode.content) lastNode.content = [];
                    lastNode.content.push(text);
                }
            });
            return ret;
        }

        function stringify(tree) {
            var ret = '';

            if (isArr(tree)) {
                each(tree, function(node) {
                    return (ret += stringify(node));
                });
            } else if (isStr(tree)) {
                ret = tree;
            } else {
                ret += '<'.concat(tree.tag);
                each(tree.attrs, function(val, key) {
                    return (ret += ' '.concat(key, '="').concat(escapeQuote(val), '"'));
                });
                ret += '>';
                if (tree.content) ret += stringify(tree.content);
                ret += '</'.concat(tree.tag, '>');
            }

            return ret;
        }

        var unescapeQuote = function(str) {
            return str.replace(/&quot;/g, '"');
        };

        var escapeQuote = function(str) {
            return str.replace(/"/g, '&quot;');
        };

        exports = {
            parse: parse,
            stringify: stringify
        };

        return exports;
    })({});

    /* ------------------------------ some ------------------------------ */

    var some = _.some = (function (exports) {
        /* Check if predicate return truthy for any element.
         *
         * |Name     |Desc                                          |
         * |---------|----------------------------------------------|
         * |obj      |Collection to iterate over                    |
         * |predicate|Function to invoked per iteration             |
         * |ctx      |Predicate context                             |
         * |return   |True if any element passes the predicate check|
         */

        /* example
         * some([2, 5], function(val) {
         *     return val % 2 === 0;
         * }); // -> true
         */

        /* typescript
         * export declare function some<T>(
         *     list: types.List<T>,
         *     iterator?: types.ListIterator<T, boolean>,
         *     context?: any
         * ): boolean;
         * export declare function some<T>(
         *     object: types.Dictionary<T>,
         *     iterator?: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): boolean;
         */

        /* dependencies
         * safeCb isArrLike keys types 
         */

        exports = function(obj, predicate, ctx) {
            predicate = safeCb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj);

            var len = (_keys || obj).length;

            for (var i = 0; i < len; i++) {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        return exports;
    })({});

    /* ------------------------------ $class ------------------------------ */

    var $class = _.$class = (function (exports) {
        /* Element class manipulations.
         *
         * ### add
         *
         * Add the specified class(es) to each element in the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |names  |Classes to add        |
         *
         * ### has
         *
         * Determine whether any of the matched elements are assigned the given class.
         *
         * |Name   |Desc                                 |
         * |-------|-------------------------------------|
         * |element|Elements to manipulate               |
         * |name   |Class name                           |
         * |return |True if elements has given class name|
         *
         * ### toggle
         *
         * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Class name to toggle  |
         *
         * ### remove
         *
         * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Class names to remove |
         */

        /* example
         * $class.add('#test', 'class1');
         * $class.add('#test', ['class1', 'class2']);
         * $class.has('#test', 'class1'); // -> true
         * $class.remove('#test', 'class1');
         * $class.has('#test', 'class1'); // -> false
         * $class.toggle('#test', 'class1');
         * $class.has('#test', 'class1'); // -> true
         */

        /* typescript
         * export declare const $class: {
         *     add(element: $safeEls.El, name: string | string[]): void;
         *     has(element: $safeEls.El, name: string): boolean;
         *     toggle(element: $safeEls.El, name: string): void;
         *     remove(element: $safeEls.El, name: string): void;
         * };
         */

        /* dependencies
         * toArr some $safeEls isStr each 
         */

        exports = {
            add: function(els, name) {
                els = $safeEls(els);
                var names = safeName(name);
                each(els, function(el) {
                    var classList = [];
                    each(names, function(name) {
                        if (!exports.has(el, name)) classList.push(name);
                    });

                    if (classList.length !== 0) {
                        el.className += (el.className ? ' ' : '') + classList.join(' ');
                    }
                });
            },
            has: function(els, name) {
                els = $safeEls(els);
                var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');
                return some(els, function(el) {
                    return regName.test(el.className);
                });
            },
            toggle: function(els, name) {
                els = $safeEls(els);
                each(els, function(el) {
                    if (!exports.has(el, name)) return exports.add(el, name);
                    exports.remove(el, name);
                });
            },
            remove: function(els, name) {
                els = $safeEls(els);
                var names = safeName(name);
                each(els, function(el) {
                    each(names, function(name) {
                        el.classList.remove(name);
                    });
                });
            }
        };

        function safeName(name) {
            return isStr(name) ? name.split(/\s+/) : toArr(name);
        }

        return exports;
    })({});

    /* ------------------------------ $ ------------------------------ */
    _.$ = (function (exports) {
        /* jQuery like style dom manipulator.
         *
         * ### Available methods
         *
         * offset, hide, show, first, last, get, eq, on, off, html, text, val, css, attr,
         * data, rmAttr, remove, addClass, rmClass, toggleClass, hasClass, append, prepend,
         * before, after
         */

        /* example
         * const $btn = $('#btn');
         * $btn.html('eustia');
         * $btn.addClass('btn');
         * $btn.show();
         * $btn.on('click', function() {
         *     // Do something...
         * });
         */

        /* typescript
         * export declare namespace $ {
         *     class $ extends Select {
         *         find(selector: string): $;
         *         each(fn: types.AnyFn): $;
         *         offset(): $offset.IOffset;
         *         hide(): $;
         *         show(): $;
         *         first(): $;
         *         last(): $;
         *         get(index: number): Element;
         *         eq(index: number): $;
         *         on(event: string, selector: string, handler: types.AnyFn): $;
         *         on(event: string, handler: types.AnyFn): $;
         *         off(event: string, selector: string, handler: types.AnyFn): $;
         *         off(event: string, handler: types.AnyFn): $;
         *         html(): string;
         *         html(value: string): $;
         *         text(): string;
         *         text(value: string): $;
         *         val(): string;
         *         val(value: string): $;
         *         css(name: string): string;
         *         css(name: string, value: string): $;
         *         css(properties: { [name: string]: string }): $;
         *         attr(name: string): string;
         *         attr(name: string, value: string): $;
         *         attr(attributes: { [name: string]: string }): $;
         *         data(name: string): string;
         *         data(name: string, value: string): $;
         *         data(attributes: { [name: string]: string }): $;
         *         rmAttr(name: string): $;
         *         remove(): $;
         *         addClass(name: string | string[]): $;
         *         rmClass(name: string): $;
         *         toggleClass(name: string): $;
         *         hasClass(name: string): boolean;
         *         parent(): $;
         *         append(content: string): $;
         *         prepend(content: string): $;
         *         before(content: string): $;
         *         after(content: string): $;
         *     }
         * }
         * declare function $(selector: string | Element): $.$;
         */

        /* dependencies
         * Select $offset $show $css $attr $property last $remove $data $event $class $insert isUndef isStr types 
         */

        exports = function(selector) {
            return new Select(selector);
        };

        Select.methods({
            offset: function() {
                return $offset(this);
            },
            hide: function() {
                return this.css('display', 'none');
            },
            show: function() {
                $show(this);
                return this;
            },
            first: function() {
                return exports(this[0]);
            },
            last: function() {
                return exports(last(this));
            },
            get: function(idx) {
                return this[idx];
            },
            eq: function(idx) {
                return exports(this[idx]);
            },
            on: function(event, selector, handler) {
                $event.on(this, event, selector, handler);
                return this;
            },
            off: function(event, selector, handler) {
                $event.off(this, event, selector, handler);
                return this;
            },
            html: function(val) {
                var result = $property.html(this, val);
                if (isUndef(val)) return result;
                return this;
            },
            text: function(val) {
                var result = $property.text(this, val);
                if (isUndef(val)) return result;
                return this;
            },
            val: function(val) {
                var result = $property.val(this, val);
                if (isUndef(val)) return result;
                return this;
            },
            css: function(name, val) {
                var result = $css(this, name, val);
                if (isGetter(name, val)) return result;
                return this;
            },
            attr: function(name, val) {
                var result = $attr(this, name, val);
                if (isGetter(name, val)) return result;
                return this;
            },
            data: function(name, val) {
                var result = $data(this, name, val);
                if (isGetter(name, val)) return result;
                return this;
            },
            rmAttr: function(name) {
                $attr.remove(this, name);
                return this;
            },
            remove: function() {
                $remove(this);
                return this;
            },
            addClass: function(name) {
                $class.add(this, name);
                return this;
            },
            rmClass: function(name) {
                $class.remove(this, name);
                return this;
            },
            toggleClass: function(name) {
                $class.toggle(this, name);
                return this;
            },
            hasClass: function(name) {
                return $class.has(this, name);
            },
            parent: function() {
                return exports(this[0].parentNode);
            },
            append: function(val) {
                $insert.append(this, val);
                return this;
            },
            prepend: function(val) {
                $insert.prepend(this, val);
                return this;
            },
            before: function(val) {
                $insert.before(this, val);
                return this;
            },
            after: function(val) {
                $insert.after(this, val);
                return this;
            }
        });

        var isGetter = function(name, val) {
            return isUndef(val) && isStr(name);
        };

        return exports;
    })({});

    /* ------------------------------ ready ------------------------------ */
    _.ready = (function (exports) {
        /* Invoke callback when dom is ready, similar to jQuery ready.
         *
         * |Name|Desc             |
         * |----|-----------------|
         * |fn  |Callback function|
         */

        /* example
         * ready(function() {
         *     // It's safe to manipulate dom here.
         * });
         */

        /* typescript
         * export declare function ready(fn: types.AnyFn): void;
         */

        /* dependencies
         * types 
         */

        var fns = [];
        var listener;
        var doc = document;
        var hack = doc.documentElement.doScroll;
        var domContentLoaded = 'DOMContentLoaded';
        var loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

        if (!loaded) {
            doc.addEventListener(
                domContentLoaded,
                (listener = function() {
                    doc.removeEventListener(domContentLoaded, listener);
                    loaded = 1;
                    /* eslint-disable no-cond-assign */

                    while ((listener = fns.shift())) {
                        listener();
                    }
                })
            );
        }

        exports = function(fn) {
            loaded ? setTimeout(fn, 0) : fns.push(fn);
        };

        return exports;
    })({});

    /* ------------------------------ reduce ------------------------------ */

    var reduce = _.reduce = (function (exports) {
        /* Turn a list of values into a single value.
         *
         * |Name             |Desc                          |
         * |-----------------|------------------------------|
         * |obj              |Collection to iterate over    |
         * |iterator=identity|Function invoked per iteration|
         * |initial          |Initial value                 |
         * |ctx              |Function context              |
         * |return           |Accumulated value             |
         */

        /* example
         * reduce(
         *     [1, 2, 3],
         *     function(sum, n) {
         *         return sum + n;
         *     },
         *     0
         * ); // -> 6
         */

        /* typescript
         * export declare function reduce<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.MemoIterator<T, TResult>,
         *     memo?: TResult,
         *     context?: any
         * ): TResult;
         * export declare function reduce<T, TResult>(
         *     list: types.Dictionary<T>,
         *     iterator: types.MemoObjectIterator<T, TResult>,
         *     memo?: TResult,
         *     context?: any
         * ): TResult;
         */

        /* dependencies
         * optimizeCb isArrLike isUndef keys types 
         */

        exports = createReduce(1);
        exports.create = createReduce;

        function createReduce(dir) {
            return function(obj, iterator, initial, ctx) {
                iterator = optimizeCb(iterator, ctx);
                var i, len, key;

                if (isArrLike(obj)) {
                    len = obj.length;
                    i = dir > 0 ? 0 : len - 1;

                    if (isUndef(initial)) {
                        initial = obj[i];
                        i += dir;
                    }

                    for (; i < len && i >= 0; i += dir) {
                        initial = iterator(initial, obj[i], i, obj);
                    }
                } else {
                    var _keys = keys(obj);

                    len = _keys.length;
                    i = dir > 0 ? 0 : len - 1;

                    if (isUndef(initial)) {
                        initial = obj[_keys[i]];
                        i += dir;
                    }

                    for (; i < len && i >= 0; i += dir) {
                        key = _keys[i];
                        initial = iterator(initial, obj[key], key, obj);
                    }
                }

                return initial;
            };
        }

        return exports;
    })({});

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim = _.rtrim = (function (exports) {
        /* Remove chars or white-spaces from end of string.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to trim    |
         * |chars |Characters to trim|
         * |return|Trimmed string    |
         */

        /* example
         * rtrim(' abc  '); // -> ' abc'
         * rtrim('_abc_', '_'); // -> '_abc'
         * rtrim('_abc_', ['c', '_']); // -> '_ab'
         */

        /* typescript
         * export declare function rtrim(str: string, chars?: string | string[]): string;
         */
        var regSpace = /\s+$/;

        exports = function(str, chars) {
            if (chars == null) return str.replace(regSpace, '');
            var end = str.length - 1;
            var charLen = chars.length;
            var found = true;
            var i;
            var c;

            while (found && end >= 0) {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen) {
                    if (c === chars[i]) {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return end >= 0 ? str.substring(0, end + 1) : '';
        };

        return exports;
    })({});

    /* ------------------------------ trim ------------------------------ */

    var trim = _.trim = (function (exports) {
        /* Remove chars or white-spaces from beginning end of string.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to trim    |
         * |chars |Characters to trim|
         * |return|Trimmed string    |
         */

        /* example
         * trim(' abc  '); // -> 'abc'
         * trim('_abc_', '_'); // -> 'abc'
         * trim('_abc_', ['a', 'c', '_']); // -> 'b'
         */

        /* typescript
         * export declare function trim(str: string, chars?: string | string[]): string;
         */

        /* dependencies
         * ltrim rtrim 
         */

        var regSpace = /^\s+|\s+$/g;

        exports = function(str, chars) {
            if (chars == null) return str.replace(regSpace, '');
            return ltrim(rtrim(str, chars), chars);
        };

        return exports;
    })({});

    /* ------------------------------ extractUrls ------------------------------ */

    var extractUrls = _.extractUrls = (function (exports) {
        /* Extract urls from plain text.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |str   |Text to extract|
         * |return|Url list       |
         */

        /* example
         * const str =
         *     '[Official site: http://eustia.liriliri.io](http://eustia.liriliri.io)';
         * extractUrls(str); // -> ['http://eustia.liriliri.io']
         */

        /* typescript
         * export declare function extractUrls(str: string): string[];
         */

        /* dependencies
         * unique trim map toArr 
         */

        exports = function(str) {
            var urlList = toArr(str.match(regUrl));
            return unique(
                map(urlList, function(url) {
                    return trim(url);
                })
            );
        };

        var regUrl = /((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;

        return exports;
    })({});

    /* ------------------------------ linkify ------------------------------ */
    _.linkify = (function (exports) {
        /* Hyperlink urls in a string.
         *
         * |Name     |Desc                     |
         * |---------|-------------------------|
         * |str      |String to hyperlink      |
         * |hyperlink|Function to hyperlink url|
         * |return   |Result string            |
         */

        /* example
         * const str = 'Official site: http://eustia.liriliri.io';
         * linkify(str); // -> 'Official site: <a href="http://eustia.liriliri.io">http://eustia.liriliri.io</a>'
         * linkify(str, function(url) {
         *     return '<a href="' + url + '" target="_blank">' + url + '</a>';
         * });
         */

        /* typescript
         * export declare function linkify(str: string, hyperlink?: types.AnyFn): string;
         */

        /* dependencies
         * extractUrls each escapeRegExp types 
         */

        exports = function(str, hyperlink) {
            hyperlink = hyperlink || defHyperlink;
            var urlList = extractUrls(str);
            each(urlList, function(url) {
                str = str.replace(new RegExp(escapeRegExp(url), 'g'), hyperlink);
            });
            return str;
        };

        function defHyperlink(url) {
            return '<a href="' + url + '">' + url + '</a>';
        }

        return exports;
    })({});

    /* ------------------------------ query ------------------------------ */

    var query = _.query = (function (exports) {
        /* Parse and stringify url query strings.
         *
         * ### parse
         *
         * Parse a query string into an object.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |str   |Query string|
         * |return|Query object|
         *
         * ### stringify
         *
         * Stringify an object into a query string.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |obj   |Query object|
         * |return|Query string|
         */

        /* example
         * query.parse('foo=bar&eruda=true'); // -> {foo: 'bar', eruda: 'true'}
         * query.stringify({ foo: 'bar', eruda: 'true' }); // -> 'foo=bar&eruda=true'
         * query.parse('name=eruda&name=eustia'); // -> {name: ['eruda', 'eustia']}
         */

        /* typescript
         * export declare const query: {
         *     parse(str: string): any;
         *     stringify(object: any): string;
         * };
         */

        /* dependencies
         * trim each isUndef isArr map isEmpty filter isObj 
         */

        exports = {
            parse: function(str) {
                var ret = {};
                str = trim(str).replace(regIllegalChars, '');
                each(str.split('&'), function(param) {
                    var parts = param.split('=');
                    var key = parts.shift(),
                        val = parts.length > 0 ? parts.join('=') : null;
                    key = decodeURIComponent(key);
                    val = decodeURIComponent(val);

                    if (isUndef(ret[key])) {
                        ret[key] = val;
                    } else if (isArr(ret[key])) {
                        ret[key].push(val);
                    } else {
                        ret[key] = [ret[key], val];
                    }
                });
                return ret;
            },
            stringify: function(obj, arrKey) {
                return filter(
                    map(obj, function(val, key) {
                        if (isObj(val) && isEmpty(val)) return '';
                        if (isArr(val)) return exports.stringify(val, key);
                        return (
                            (arrKey
                                ? encodeURIComponent(arrKey)
                                : encodeURIComponent(key)) +
                            '=' +
                            encodeURIComponent(val)
                        );
                    }),
                    function(str) {
                        return str.length > 0;
                    }
                ).join('&');
            }
        };
        var regIllegalChars = /^(\?|#|&)/g;

        return exports;
    })({});

    /* ------------------------------ Url ------------------------------ */

    var Url = _.Url = (function (exports) {
        /* Simple url manipulator.
         *
         * ### constructor
         *
         * |Name        |Desc      |
         * |------------|----------|
         * |url=location|Url string|
         *
         * ### setQuery
         *
         * Set query value.
         *
         * |Name  |Desc       |
         * |------|-----------|
         * |name  |Query name |
         * |val   |Query value|
         * |return|this       |
         *
         * |Name  |Desc        |
         * |------|------------|
         * |query |query object|
         * |return|this        |
         *
         * ### rmQuery
         *
         * Remove query value.
         *
         * |Name  |Desc      |
         * |------|----------|
         * |name  |Query name|
         * |return|this      |
         *
         * ### parse
         *
         * [static] Parse url into an object.
         *
         * |Name  |Desc      |
         * |------|----------|
         * |url   |Url string|
         * |return|Url object|
         *
         * ### stringify
         *
         * [static] Stringify url object into a string.
         *
         * |Name  |Desc      |
         * |------|----------|
         * |url   |Url object|
         * |return|Url string|
         *
         * An url object contains the following properties:
         *
         * |Name    |Desc                                                                                  |
         * |--------|--------------------------------------------------------------------------------------|
         * |protocol|The protocol scheme of the URL (e.g. http:)                                           |
         * |slashes |A boolean which indicates whether the protocol is followed by two forward slashes (//)|
         * |auth    |Authentication information portion (e.g. username:password)                           |
         * |hostname|Host name without port number                                                         |
         * |port    |Optional port number                                                                  |
         * |pathname|URL path                                                                              |
         * |query   |Parsed object containing query string                                                 |
         * |hash    |The "fragment" portion of the URL including the pound-sign (#)                        |
         */

        /* example
         * const url = new Url('http://example.com:8080?eruda=true');
         * console.log(url.port); // -> '8080'
         * url.query.foo = 'bar';
         * url.rmQuery('eruda');
         * url.toString(); // -> 'http://example.com:8080/?foo=bar'
         */

        /* typescript
         * export declare namespace Url {
         *     interface IUrl {
         *         protocol: string;
         *         auth: string;
         *         hostname: string;
         *         hash: string;
         *         query: any;
         *         port: string;
         *         pathname: string;
         *         slashes: boolean;
         *     }
         * }
         * export declare class Url {
         *     protocol: string;
         *     auth: string;
         *     hostname: string;
         *     hash: string;
         *     query: any;
         *     port: string;
         *     pathname: string;
         *     slashes: boolean;
         *     constructor(url?: string);
         *     setQuery(name: string, val: string): Url;
         *     setQuery(query: { [name: string]: string }): Url;
         *     rmQuery(name: string | string[]): Url;
         *     toString(): string;
         *     static parse(url: string): Url.IUrl;
         *     static stringify(object: Url.IUrl): string;
         * }
         */

        /* dependencies
         * Class extend trim query isEmpty each isArr toArr isBrowser isObj 
         */

        exports = Class(
            {
                className: 'Url',
                initialize: function(url) {
                    if (!url && isBrowser) url = window.location.href;
                    extend(this, exports.parse(url || ''));
                },
                setQuery: function(name, val) {
                    var query = this.query;

                    if (isObj(name)) {
                        each(name, function(val, key) {
                            query[key] = val;
                        });
                    } else {
                        query[name] = val;
                    }

                    return this;
                },
                rmQuery: function(name) {
                    var query = this.query;
                    if (!isArr(name)) name = toArr(name);
                    each(name, function(key) {
                        delete query[key];
                    });
                    return this;
                },
                toString: function() {
                    return exports.stringify(this);
                }
            },
            {
                parse: function(url) {
                    var ret = {
                        protocol: '',
                        auth: '',
                        hostname: '',
                        hash: '',
                        query: {},
                        port: '',
                        pathname: '',
                        slashes: false
                    };
                    var rest = trim(url);
                    var slashes = false;
                    var proto = rest.match(regProto);

                    if (proto) {
                        proto = proto[0];
                        ret.protocol = proto.toLowerCase();
                        rest = rest.substr(proto.length);
                    }

                    if (proto) {
                        slashes = rest.substr(0, 2) === '//';

                        if (slashes) {
                            rest = rest.slice(2);
                            ret.slashes = true;
                        }
                    }

                    if (slashes) {
                        var host = rest;
                        var hostEnd = -1;

                        for (var i = 0, len = hostEndingChars.length; i < len; i++) {
                            var pos = rest.indexOf(hostEndingChars[i]);
                            if (pos !== -1 && (hostEnd === -1 || pos < hostEnd))
                                hostEnd = pos;
                        }

                        if (hostEnd > -1) {
                            host = rest.slice(0, hostEnd);
                            rest = rest.slice(hostEnd);
                        }

                        var atSign = host.lastIndexOf('@');

                        if (atSign !== -1) {
                            ret.auth = decodeURIComponent(host.slice(0, atSign));
                            host = host.slice(atSign + 1);
                        }

                        ret.hostname = host;
                        var port = host.match(regPort);

                        if (port) {
                            port = port[0];
                            if (port !== ':') ret.port = port.substr(1);
                            ret.hostname = host.substr(0, host.length - port.length);
                        }
                    }

                    var hash = rest.indexOf('#');

                    if (hash !== -1) {
                        ret.hash = rest.substr(hash);
                        rest = rest.slice(0, hash);
                    }

                    var queryMark = rest.indexOf('?');

                    if (queryMark !== -1) {
                        ret.query = query.parse(rest.substr(queryMark + 1));
                        rest = rest.slice(0, queryMark);
                    }

                    ret.pathname = rest || '/';
                    return ret;
                },
                stringify: function(obj) {
                    var ret =
                        obj.protocol +
                        (obj.slashes ? '//' : '') +
                        (obj.auth ? encodeURIComponent(obj.auth) + '@' : '') +
                        obj.hostname +
                        (obj.port ? ':' + obj.port : '') +
                        obj.pathname;
                    if (!isEmpty(obj.query)) ret += '?' + query.stringify(obj.query);
                    if (obj.hash) ret += obj.hash;
                    return ret;
                }
            }
        );
        var regProto = /^([a-z0-9.+-]+:)/i;
        var regPort = /:[0-9]*$/;
        var hostEndingChars = ['/', '?', '#'];

        return exports;
    })({});

    /* ------------------------------ getUrlParam ------------------------------ */
    _.getUrlParam = (function (exports) {
        /* Get url param.
         *
         * |Name        |Desc            |
         * |------------|----------------|
         * |name        |Param name      |
         * |url=location|Url to get param|
         * |return      |Param value     |
         */

        /* example
         * getUrlParam('test', 'http://example.com/?test=true'); // -> 'true'
         */

        /* typescript
         * export declare function getUrlParam(
         *     name: string,
         *     url?: string
         * ): string | undefined;
         */

        /* dependencies
         * Url 
         */

        exports = function(name, url) {
            return new Url(url).query[name];
        };

        return exports;
    })({});

    /* ------------------------------ selector ------------------------------ */
    _.selector = (function (exports) {
        /* Css selector parser and serializer.
         *
         * ### parse
         *
         * Parse css selector into js object.
         *
         * |Name    |Desc            |
         * |--------|----------------|
         * |selector|Css selector    |
         * |return  |Parsed js object|
         *
         * ### stringify
         *
         * Stringify object into an css selector.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |groups|Object to stringify|
         * |return|Css selector       |
         */

        /* example
         * const groups = selector.parse('#test, input.user[name="licia"]');
         * // -> [[{type: 'id', value: 'test'}],[{type: 'tag', value: 'input'}...]]
         * selector.stringify(groups);
         */

        /* typescript
         * export declare namespace selector {
         *     interface IToken {
         *         type: string;
         *         value: string;
         *     }
         * }
         * export declare const selector: {
         *     parse(selector: string): Array<selector.IToken[]>;
         *     stringify(selector: Array<selector.IToken[]>): string;
         * };
         */

        /* dependencies
         * trim each identity map 
         */ // https://github.com/jquery/sizzle

        var whitespace = '[\\x20\\t\\r\\n\\f]';
        var identifier = '(?:\\\\[\\da-fA-F]{1,6}'.concat(
            whitespace,
            '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+'
        );
        var attributes = '\\['
            .concat(whitespace, '*(')
            .concat(identifier, ')(?:')
            .concat(whitespace, '*([*^$|!~]?=)')
            .concat(
                whitespace,
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|('
            )
            .concat(identifier, '))|)')
            .concat(whitespace, '*\\]');
        var pseudos = '::?('
            .concat(
                identifier,
                ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|'
            )
            .concat(attributes, ')*)|.*)\\)|)');
        var regComma = new RegExp('^'.concat(whitespace, '*,').concat(whitespace, '*'));
        var regCombinators = new RegExp(
            '^'
                .concat(whitespace, '*([>+~]|')
                .concat(whitespace, ')')
                .concat(whitespace, '*')
        );
        var matchExpr = {
            id: {
                reg: new RegExp('^#('.concat(identifier, ')')),
                value: function(raw) {
                    return raw.slice(1);
                },
                toStr: function(value) {
                    return '#'.concat(value);
                }
            },
            class: {
                reg: new RegExp('^\\.('.concat(identifier, ')')),
                value: function(raw) {
                    return raw.slice(1);
                },
                toStr: function(value) {
                    return '.'.concat(value);
                }
            },
            tag: {
                reg: new RegExp('^('.concat(identifier, '|[*])')),
                value: identity
            },
            attribute: {
                reg: new RegExp('^'.concat(attributes)),
                value: function(raw) {
                    return raw.slice(1, raw.length - 1);
                },
                toStr: function(value) {
                    return '['.concat(value, ']');
                }
            },
            pseudo: {
                reg: new RegExp('^'.concat(pseudos)),
                value: identity
            }
        };
        each(matchExpr, function(item) {
            if (!item.value) item.value = identity;
            if (!item.toStr) item.toStr = identity;
        });

        function parse(selector) {
            selector = trim(selector);
            var groups = [];
            var tokens;
            var match;
            var matched;

            while (selector) {
                if (!matched || (match = regComma.exec(selector))) {
                    if (match) {
                        selector = selector.slice(match[0].length);
                    }

                    tokens = [];
                    groups.push(tokens);
                }

                matched = false;

                if ((match = regCombinators.exec(selector))) {
                    matched = match.shift();
                    selector = selector.slice(matched.length);
                    matched = trim(matched);
                    if (!matched) matched = ' ';
                    tokens.push({
                        value: matched,
                        type: 'combinator'
                    });
                }

                each(matchExpr, function(_ref, type) {
                    var reg = _ref.reg,
                        value = _ref.value;

                    if ((match = reg.exec(selector))) {
                        matched = match.shift();
                        selector = selector.slice(matched.length);
                        matched = trim(matched);
                        tokens.push({
                            value: value(matched),
                            type: type
                        });
                    }
                });

                if (!matched) {
                    break;
                }
            }

            return groups;
        }

        function stringify(groups) {
            return map(groups, function(group) {
                group = map(group, function(_ref2) {
                    var type = _ref2.type,
                        value = _ref2.value;

                    if (type === 'combinator') {
                        return value === ' ' ? value : ' '.concat(value, ' ');
                    }

                    return matchExpr[type].toStr(value);
                });
                return group.join('');
            }).join(', ');
        }

        exports = {
            parse: parse,
            stringify: stringify
        };

        return exports;
    })({});

    /* ------------------------------ slugify ------------------------------ */
    _.slugify = (function (exports) {
        /* Slugify a string.
         *
         * |Name       |Desc              |
         * |-----------|------------------|
         * |str        |String to slugify |
         * |replacement|Custom replacement|
         * |return     |Slugified string  |
         */

        /* example
         * slugify('I ♥ pony'); // -> 'I-love-pony'
         * slugify('I ♥ pony', { ' ': '_' }); // -> 'I_love_pony'
         */

        /* typescript
         * export declare function slugify(
         *     str: string,
         *     replacement?: { [index: string]: string }
         * ): string;
         */

        /* dependencies
         * defaults each reduce 
         */

        exports = function(str) {
            var replacement =
                arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            defaults(replacement, defReplacement);
            return reduce(
                str,
                function(result, char) {
                    return result + (replacement[char] || char);
                },
                ''
            ).replace(regForbidden, '');
        };

        var regForbidden = /[^\w\s$*_+~.()'"!\-:@]/g; // https://github.com/simov/slugify

        var REPLACEMENT =
            '$ dollar,% percent,& and,< less,> greater,| or,¢ cent,£ pound,¤ currency,¥ yen,© (c),ª a,® (r),º o,À A,Á A,Â A,Ã A,Ä A,Å A,Æ AE,Ç C,È E,É E,Ê E,Ë E,Ì I,Í I,Î I,Ï I,Ð D,Ñ N,Ò O,Ó O,Ô O,Õ O,Ö O,Ø O,Ù U,Ú U,Û U,Ü U,Ý Y,Þ TH,ß ss,à a,á a,â a,ã a,ä a,å a,æ ae,ç c,è e,é e,ê e,ë e,ì i,í i,î i,ï i,ð d,ñ n,ò o,ó o,ô o,õ o,ö o,ø o,ù u,ú u,û u,ü u,ý y,þ th,ÿ y,Ā A,ā a,Ă A,ă a,Ą A,ą a,Ć C,ć c,Č C,č c,Ď D,ď d,Đ DJ,đ dj,Ē E,ē e,Ė E,ė e,Ę e,ę e,Ě E,ě e,Ğ G,ğ g,Ģ G,ģ g,Ĩ I,ĩ i,Ī i,ī i,Į I,į i,İ I,ı i,Ķ k,ķ k,Ļ L,ļ l,Ľ L,ľ l,Ł L,ł l,Ń N,ń n,Ņ N,ņ n,Ň N,ň n,Ő O,ő o,Œ OE,œ oe,Ŕ R,ŕ r,Ř R,ř r,Ś S,ś s,Ş S,ş s,Š S,š s,Ţ T,ţ t,Ť T,ť t,Ũ U,ũ u,Ū u,ū u,Ů U,ů u,Ű U,ű u,Ų U,ų u,Ź Z,ź z,Ż Z,ż z,Ž Z,ž z,ƒ f,Ơ O,ơ o,Ư U,ư u,ǈ LJ,ǉ lj,ǋ NJ,ǌ nj,Ș S,ș s,Ț T,ț t,˚ o,Ά A,Έ E,Ή H,Ί I,Ό O,Ύ Y,Ώ W,ΐ i,Α A,Β B,Γ G,Δ D,Ε E,Ζ Z,Η H,Θ 8,Ι I,Κ K,Λ L,Μ M,Ν N,Ξ 3,Ο O,Π P,Ρ R,Σ S,Τ T,Υ Y,Φ F,Χ X,Ψ PS,Ω W,Ϊ I,Ϋ Y,ά a,έ e,ή h,ί i,ΰ y,α a,β b,γ g,δ d,ε e,ζ z,η h,θ 8,ι i,κ k,λ l,μ m,ν n,ξ 3,ο o,π p,ρ r,ς s,σ s,τ t,υ y,φ f,χ x,ψ ps,ω w,ϊ i,ϋ y,ό o,ύ y,ώ w,Ё Yo,Ђ DJ,Є Ye,І I,Ї Yi,Ј J,Љ LJ,Њ NJ,Ћ C,Џ DZ,А A,Б B,В V,Г G,Д D,Е E,Ж Zh,З Z,И I,Й J,К K,Л L,М M,Н N,О O,П P,Р R,С S,Т T,У U,Ф F,Х H,Ц C,Ч Ch,Ш Sh,Щ Sh,Ъ U,Ы Y,Ь ,Э E,Ю Yu,Я Ya,а a,б b,в v,г g,д d,е e,ж zh,з z,и i,й j,к k,л l,м m,н n,о o,п p,р r,с s,т t,у u,ф f,х h,ц c,ч ch,ш sh,щ sh,ъ u,ы y,ь ,э e,ю yu,я ya,ё yo,ђ dj,є ye,і i,ї yi,ј j,љ lj,њ nj,ћ c,џ dz,Ґ G,ґ g,฿ baht,ა a,ბ b,გ g,დ d,ე e,ვ v,ზ z,თ t,ი i,კ k,ლ l,მ m,ნ n,ო o,პ p,ჟ zh,რ r,ს s,ტ t,უ u,ფ f,ქ k,ღ gh,ყ q,შ sh,ჩ ch,ც ts,ძ dz,წ ts,ჭ ch,ხ kh,ჯ j,ჰ h,ẞ SS,Ạ A,ạ a,Ả A,ả a,Ấ A,ấ a,Ầ A,ầ a,Ẩ A,ẩ a,Ẫ A,ẫ a,Ậ A,ậ a,Ắ A,ắ a,Ằ A,ằ a,Ẳ A,ẳ a,Ẵ A,ẵ a,Ặ A,ặ a,Ẹ E,ẹ e,Ẻ E,ẻ e,Ẽ E,ẽ e,Ế E,ế e,Ề E,ề e,Ể E,ể e,Ễ E,ễ e,Ệ E,ệ e,Ỉ I,ỉ i,Ị I,ị i,Ọ O,ọ o,Ỏ O,ỏ o,Ố O,ố o,Ồ O,ồ o,Ổ O,ổ o,Ỗ O,ỗ o,Ộ O,ộ o,Ớ O,ớ o,Ờ O,ờ o,Ở O,ở o,Ỡ O,ỡ o,Ợ O,ợ o,Ụ U,ụ u,Ủ U,ủ u,Ứ U,ứ u,Ừ U,ừ u,Ử U,ử u,Ữ U,ữ u,Ự U,ự u,Ỳ Y,ỳ y,Ỵ Y,ỵ y,Ỷ Y,ỷ y,Ỹ Y,ỹ y,‘ \',’ \',“ ",” ",† +,• *,… ...,₠ ecu,₢ cruzeiro,₣ french franc,₤ lira,₥ mill,₦ naira,₧ peseta,₨ rupee,₩ won,₪ new shequel,₫ dong,€ euro,₭ kip,₮ tugrik,₯ drachma,₰ penny,₱ peso,₲ guarani,₳ austral,₴ hryvnia,₵ cedi,₹ indian rupee,₽ russian ruble,₿ bitcoin,℠ sm,™ tm,∂ d,∆ delta,∑ sum,∞ infinity,♥ love,元 yuan,円 yen,﷼ rial';
        var defReplacement = {};
        each(REPLACEMENT.split(','), function(item) {
            item = item.split(' ');
            defReplacement[item[0]] = item[1];
        });
        defReplacement[' '] = '-';

        return exports;
    })({});

    /* ------------------------------ stripHtmlTag ------------------------------ */
    _.stripHtmlTag = (function (exports) {
        /* Strip html tags from a string.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |str   |String to strip|
         * |return|Result string  |
         */

        /* example
         * stripHtmlTag('<p>Hello</p>'); // -> 'Hello'
         */

        /* typescript
         * export declare function stripHtmlTag(str: string): string;
         */
        var regHtmlTag = /<[^>]*>/g;

        exports = function(str) {
            return str.replace(regHtmlTag, '');
        };

        return exports;
    })({});

    /* ------------------------------ throttle ------------------------------ */
    _.throttle = (function (exports) {
        /* Return a new throttled version of the passed function.
         *
         * |Name  |Desc                           |
         * |------|-------------------------------|
         * |fn    |Function to throttle           |
         * |wait  |Number of milliseconds to delay|
         * |return|New throttled function         |
         */

        /* example
         * const updatePos = throttle(function() {}, 100);
         * // $(window).scroll(updatePos);
         */

        /* typescript
         * export declare function throttle<T extends types.AnyFn>(fn: T, wait: number): T;
         */

        /* dependencies
         * debounce types 
         */

        exports = function(fn, wait) {
            return debounce(fn, wait, true);
        };

        return exports;
    })({});

    /* ------------------------------ toEl ------------------------------ */
    _.toEl = (function (exports) {
        /* Convert html string to dom elements.
         *
         * There should be only one root element.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |str   |Html string |
         * |return|Html element|
         */

        /* example
         * toEl('<div>test</div>');
         */

        /* typescript
         * export declare function toEl(str: string): Element;
         */
        var doc = document;

        exports = function(str) {
            var fragment = doc.createElement('body');
            fragment.innerHTML = str;
            return fragment.childNodes[0];
        };

        if (doc.createRange && doc.body) {
            var range = doc.createRange();
            range.selectNode(doc.body);

            if (range.createContextualFragment) {
                exports = function(str) {
                    return range.createContextualFragment(str).childNodes[0];
                };
            }
        }

        return exports;
    })({});

    /* ------------------------------ truncate ------------------------------ */
    _.truncate = (function (exports) {
        /* Truncate a string to a specific width.
         *
         * |Name   |Desc                 |
         * |-------|---------------------|
         * |txt    |Text to truncate     |
         * |width  |Maximum string length|
         * |options|Options object       |
         * |return |Truncated string     |
         *
         * Options:
         *
         * |Name          |Desc                              |
         * |--------------|----------------------------------|
         * |ellipsis='...'|String to indicate text is omitted|
         * |separator     |Separator pattern to truncate to  |
         */

        /* example
         * truncate('ORA ORA ORA ORA ORA ORA', 12); // -> 'ORA ORA O...'
         * truncate('ORA ORA ORA ORA ORA ORA', 10, {
         *     separator: ' ',
         *     ellipsis: '……'
         * }); // -> 'ORA ORA……'
         */

        /* typescript
         * export declare function truncate(
         *     txt: string,
         *     width: number,
         *     options?: {
         *         ellipsis?: string;
         *         separator: string;
         *     }
         * ): string;
         */

        /* dependencies
         * defaults isUndef 
         */

        exports = function(txt, width) {
            var options =
                arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            defaults(options, defOptions);
            var ellipsis = options.ellipsis,
                separator = options.separator;
            var len = txt.length;
            if (width > len) return txt;
            var end = width - ellipsis.length;
            if (end < 1) return ellipsis;
            var ret = txt.slice(0, end);
            if (isUndef(separator)) return ret + ellipsis;

            if (txt.indexOf(separator, end) !== end) {
                var idx = ret.lastIndexOf(separator);

                if (idx > -1) {
                    ret = ret.slice(0, idx);
                }
            }

            return ret + ellipsis;
        };

        var defOptions = {
            ellipsis: '...'
        };

        return exports;
    })({});

    /* ------------------------------ xpath ------------------------------ */
    _.xpath = (function (exports) {
        /* Select elements using xpath, IE is not supported.
         *
         * |Name  |Desc           |
         * |------|---------------|
         * |xpath |Xpath          |
         * |return|Target elements|
         */

        /* example
         * xpath('//html/body'); // -> [body]
         */

        /* typescript
         * export declare function xpath(xpath: string): HTMLElement[];
         */
        exports = function(xpath) {
            var ret = [];
            var nodesSnapshot = document.evaluate(
                xpath,
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );

            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                ret.push(nodesSnapshot.snapshotItem(i));
            }

            return ret;
        };

        return exports;
    })({});

    return _;
}));