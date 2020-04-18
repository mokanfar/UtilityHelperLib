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

    /* ------------------------------ before ------------------------------ */

    var before = _.before = (function (exports) {
        /* Create a function that invokes less than n times.
         *
         * |Name  |Desc                                            |
         * |------|------------------------------------------------|
         * |n     |Number of calls at which fn is no longer invoked|
         * |fn    |Function to restrict                            |
         * |return|New restricted function                         |
         *
         * Subsequent calls to the created function return the result of the last fn invocation.
         */

        /* example
         * const fn = before(5, function() {});
         * fn(); // Allow function to be call 4 times at last.
         */

        /* typescript
         * export declare function before<T extends types.AnyFn>(n: number, fn: T): T;
         */

        /* dependencies
         * types 
         */

        exports = function(n, fn) {
            var memo;
            return function() {
                if (--n > 0) memo = fn.apply(this, arguments);
                if (n <= 1) fn = null;
                return memo;
            };
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

    /* ------------------------------ invariant ------------------------------ */
    _.invariant = (function (exports) {
        /* Facebook's invariant.
         *
         * [Related docs](https://github.com/zertosh/invariant)
         */

        /* example
         * invariant(true, 'This will not throw');
         * // No errors
         * invariant(false, 'This will throw an error with this message');
         * // Error: Invariant Violation: This will throw an error with this message
         */

        /* typescript
         * export declare function invariant(
         *     condition: boolean,
         *     format?: string,
         *     a?: string,
         *     b?: string,
         *     c?: string,
         *     d?: string,
         *     e?: string,
         *     f?: string
         * ): void;
         */

        /* dependencies
         * root 
         */

        exports = function(condition, format, a, b, c, d, e, f) {
            var process = root.process || {
                env: {
                    NODE_ENV: 'development'
                }
            };

            if (process.env.NODE_ENV !== 'production') {
                if (format === undefined) {
                    throw new Error('invariant requires an error message argument');
                }
            }

            if (!condition) {
                var error;

                if (format === undefined) {
                    error = new Error(
                        'Minified exception occurred; use the non-minified dev environment ' +
                            'for the full error message and additional helpful warnings.'
                    );
                } else {
                    var args = [a, b, c, d, e, f];
                    var argIndex = 0;
                    error = new Error(
                        format.replace(/%s/g, function() {
                            return args[argIndex++];
                        })
                    );
                    error.name = 'Invariant Violation';
                }

                error.framesToPop = 1;
                throw error;
            }
        };

        return exports;
    })({});

    /* ------------------------------ isFile ------------------------------ */
    _.isFile = (function (exports) {
        /* Check if value is a file.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |val   |Value to check         |
         * |return|True if value is a file|
         */

        /* example
         * isFile(new File(['test'], 'test.txt', { type: 'text/plain' })); // -> true
         */

        /* typescript
         * export declare function isFile(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object File]';
        };

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

    /* ------------------------------ isNode ------------------------------ */
    _.isNode = (function (exports) {
        /* Check if running in node.
         */

        /* example
         * console.log(isNode); // -> true if running in node
         */

        /* typescript
         * export declare const isNode: boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports =
            typeof process !== 'undefined' && objToStr(process) === '[object process]';

        return exports;
    })({});

    /* ------------------------------ isRelative ------------------------------ */
    _.isRelative = (function (exports) {
        /* Check if path appears to be relative.
         *
         * |Name  |Desc                               |
         * |------|-----------------------------------|
         * |path  |Path to check                      |
         * |return|True if path appears to be relative|
         */

        /* example
         * isRelative('README.md'); // -> true
         */

        /* typescript
         * export declare function isRelative(path: string): boolean;
         */
        exports = function(path) {
            return !regAbsolute.test(path);
        };

        var regAbsolute = /^([a-z]+:)?[\\/]/i;

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

    /* ------------------------------ kill ------------------------------ */
    _.kill = (function (exports) {
        /* Kill process.
         *
         * |Name|Desc|
         * |----|----|
         * |pid |Process ID|
         */

        /* example
         * kill(9420);
         */

        /* typescript
         * export declare function kill(pid: number): void;
         */

        /* dependencies
         * isWindows 
         */

        const childProcess = require('child_process');

        exports = function(pid) {
            try {
                let cmd = '';
                if (isWindows) {
                    cmd = `taskkill /pid ${pid} /T /F`;
                } else {
                    cmd = `kill ${pid} -9`;
                }
                childProcess.execSync(cmd);
            } catch (e) {
                /* eslint-disable no-empty */
            }
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

    /* ------------------------------ mkdir ------------------------------ */
    _.mkdir = (function (exports) {
        /* Recursively create directories.
         *
         * |Name     |Desc               |
         * |---------|-------------------|
         * |dir      |Directory to create|
         * |mode=0777|Directory mode     |
         * |cb       |Callback           |
         */

        /* example
         * mkdir('/tmp/foo/bar/baz', function(err) {
         *     if (err) console.log(err);
         *     else console.log('Done');
         * });
         */

        /* typescript
         * export declare function mkdir(
         *     dir: string,
         *     mode?: number,
         *     cb?: types.AnyFn
         * ): void;
         * export declare function mkdir(dir: string, cb?: types.AnyFn): void;
         */

        /* dependencies
         * isFn noop types 
         */

        const fs = require('fs');
        const path = require('path');

        const _0777 = parseInt('0777', 8);

        exports = function(p, mode, cb) {
            if (isFn(mode)) {
                cb = mode;
                mode = _0777;
            }
            cb = cb || noop;
            p = path.resolve(p);

            fs.mkdir(p, mode, function(err) {
                if (!err) return cb();

                switch (err.code) {
                    case 'ENOENT':
                        exports(path.dirname(p), mode, function(err) {
                            if (err) return cb(err);

                            exports(p, mode, cb);
                        });
                        break;
                    default:
                        fs.stat(p, function(errStat, stat) {
                            if (errStat || !stat.isDirectory()) return cb(errStat);

                            cb();
                        });
                }
            });
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

    /* ------------------------------ normalizePath ------------------------------ */
    _.normalizePath = (function (exports) {
        /* Normalize file path slashes.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |path  |Path to normalize|
         * |return|Normalized path  |
         */

        /* example
         * normalizePath('\\foo\\bar\\'); // -> '/foo/bar/'
         * normalizePath('./foo//bar'); // -> './foo/bar'
         */

        /* typescript
         * export declare function normalizePath(path: string): string;
         */
        exports = function(path) {
            return path.replace(regSlashes, '/');
        };

        var regSlashes = /[\\/]+/g;

        return exports;
    })({});

    /* ------------------------------ now ------------------------------ */

    var now = _.now = (function (exports) {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch.
         */

        /* example
         * now(); // -> 1468826678701
         */

        /* typescript
         * export declare function now(): number;
         */
        if (Date.now && !false) {
            exports = Date.now;
        } else {
            exports = function() {
                return new Date().getTime();
            };
        }

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

    /* ------------------------------ openFile ------------------------------ */
    _.openFile = (function (exports) {
        /* Open file dialog to select file in browser.
         *
         * |Name   |Desc          |
         * |-------|--------------|
         * |options|Dialog options|
         * |return |Files promise |
         *
         * Available options:
         *
         * |Name          |Desc                        |
         * |--------------|----------------------------|
         * |accept        |File types                  |
         * |multiple=false|Select multiple files or not|
         */

        /* example
         * openFile({ multiple: true }).then(fileList => {
         *     console.log(fileList);
         * });
         */

        /* typescript
         * export declare function openFile(options?: {
         *     accept?: string;
         *     multiple?: boolean;
         * }): Promise<File[]>;
         */
        exports = function() {
            var options =
                arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return new Promise(function(resolve) {
                var input = document.createElement('input');
                input.style.position = 'fixed';
                input.style.bottom = '0';
                input.style.left = '0';
                input.style.visibility = 'hidden';
                input.setAttribute('type', 'file');

                if (options.accept) {
                    input.setAttribute('accept', options.accept);
                }

                if (options.multiple) {
                    input.setAttribute('multiple', '');
                }

                document.body.appendChild(input);
                input.addEventListener('change', function() {
                    document.body.removeChild(input);
                    resolve(input.files);
                });
                input.click();
            });
        };

        return exports;
    })({});

    /* ------------------------------ ordinal ------------------------------ */
    _.ordinal = (function (exports) {
        /* Add ordinal indicator to number.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |num   |Number to add indicator|
         * |return|Result ordinal number  |
         */

        /* example
         * ordinal(1); // -> '1st'
         * ordinal(2); // -> '2nd'
         */

        /* typescript
         * export declare function ordinal(num: number): string;
         */
        // https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
        exports = function(num) {
            var j = num % 10;
            var k = num % 100;
            var indicator = 'th';

            if (j == 1 && k != 11) {
                indicator = 'st';
            }

            if (j == 2 && k != 12) {
                indicator = 'nd';
            }

            if (j == 3 && k != 13) {
                indicator = 'rd';
            }

            return num + indicator;
        };

        return exports;
    })({});

    /* ------------------------------ parallel ------------------------------ */

    var parallel = _.parallel = (function (exports) {
        /* Run an array of functions in parallel.
         *
         * |Name |Desc                   |
         * |-----|-----------------------|
         * |tasks|Array of functions     |
         * |cb   |Callback once completed|
         */

        /* example
         * parallel(
         *     [
         *         function(cb) {
         *             setTimeout(function() {
         *                 cb(null, 'one');
         *             }, 200);
         *         },
         *         function(cb) {
         *             setTimeout(function() {
         *                 cb(null, 'two');
         *             }, 100);
         *         }
         *     ],
         *     function(err, results) {
         *         // results -> ['one', 'two']
         *     }
         * );
         */

        /* typescript
         * export declare function parallel(tasks: types.AnyFn[], cb?: types.AnyFn): void;
         */

        /* dependencies
         * noop each nextTick types 
         */

        exports = function(tasks, cb) {
            cb = cb || noop;
            var results = [];
            var pending = tasks.length;
            if (!pending) return done(null);
            each(tasks, function(task, i) {
                task(function(err, result) {
                    taskCb(i, err, result);
                });
            });

            function taskCb(i, err, result) {
                results[i] = result;
                if (--pending === 0 || err) done(err);
            }

            function done(err) {
                nextTick(function() {
                    cb(err, results);
                    cb = noop;
                });
            }
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

    /* ------------------------------ promisify ------------------------------ */

    var promisify = _.promisify = (function (exports) {
        /* Convert callback based functions into Promises.
         *
         * |Name           |Desc                                  |
         * |---------------|--------------------------------------|
         * |fn             |Callback based function               |
         * |multiArgs=false|If callback has multiple success value|
         * |return         |Result function                       |
         *
         * If multiArgs is set to true, the resulting promise will always fulfill with an array of the callback's success values.
         */

        /* example
         * const fs = require('fs');
         *
         * const readFile = promisify(fs.readFile);
         * readFile('test.js', 'utf-8').then(function(data) {
         *     // Do something with file content.
         * });
         */

        /* typescript
         * export declare function promisify(
         *     fn: types.AnyFn,
         *     multiArgs?: boolean
         * ): types.AnyFn;
         */

        /* dependencies
         * restArgs root types 
         */

        exports = function(fn, multiArgs) {
            return restArgs(function(args) {
                return new root.Promise(function(resolve, reject) {
                    args.push(
                        restArgs(function callback(err, values) {
                            if (err) return reject(err);
                            if (!multiArgs) return resolve(values[0]);
                            resolve(values);
                        })
                    );
                    fn.apply(this, args);
                });
            });
        };

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

    /* ------------------------------ fs ------------------------------ */
    _.fs = (function (exports) {
        /* Promised version of node.js fs module.
         */

        /* example
         * fs.readFile('test.js')
         *     .then(function(data) {
         *         // Do something
         *     })
         *     .catch(function(err) {
         *         // Handle errors
         *     });
         */

        /* typescript
         * export declare const fs: {
         *     readFile(path: string, encoding: string): Promise<string>;
         *     readFile(path: string): Promise<Buffer>;
         *     exists(path: string): Promise<boolean>;
         *     unlink(path: string): Promise<void>;
         *     writeFile(path: string, data: string, options?: string): Promise<void>;
         *     writeFile(path: string, data: Buffer): Promise<void>;
         *     readdir(path: string): Promise<string[]>;
         *     rmdir(path: string): Promise<void>;
         *     [key: string]: any;
         * };
         */

        /* dependencies
         * promisify root each toArr 
         */

        const fs = require('fs');

        each(
            [
                'access',
                'appendFile',
                'chmod',
                'chown',
                'close',
                'fchmod',
                'fchown',
                'fdatasync',
                'fstat',
                'fsync',
                'ftruncate',
                'futimes',
                'link',
                'lstat',
                'mkdir',
                'mkdtemp',
                'open',
                'read',
                'readFile',
                'readdir',
                'readlink',
                'realpath',
                'rename',
                'rmdir',
                'stat',
                'symlink',
                'truncate',
                'unlink',
                'utimes',
                'write',
                'writeFile'
            ],
            function(method) {
                exports[method] = promisify(fs[method]);
            }
        );

        exports.exists = function() {
            const args = toArr(arguments);

            return new root.Promise(function(resolve) {
                args.push(resolve);
                fs.exists.apply(null, args);
            });
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

    /* ------------------------------ once ------------------------------ */
    _.once = (function (exports) {
        /* Create a function that invokes once.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |fn    |Function to restrict   |
         * |return|New restricted function|
         */

        /* example
         * function init() {}
         * const initOnce = once(init);
         * initOnce();
         * initOnce(); // -> init is invoked once
         */

        /* typescript
         * export declare function once(fn: types.AnyFn): types.AnyFn;
         */

        /* dependencies
         * partial before types 
         */

        exports = partial(before, 2);

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

    /* ------------------------------ rmdir ------------------------------ */
    _.rmdir = (function (exports) {
        /* Recursively remove directories.
         *
         * |Name|Desc               |
         * |----|-------------------|
         * |dir |Directory to remove|
         * |cb  |Callback           |
         */

        /* example
         * rmdir('/tmp/foo/bar/baz', function(err) {
         *     if (err) console.log(err);
         *     else console.log('Done');
         * });
         */

        /* typescript
         * export declare function rmdir(dir: string, cb?: types.AnyFn): void;
         */

        /* dependencies
         * noop parallel types 
         */

        const fs = require('fs');
        const path = require('path');

        exports = function(p, cb) {
            cb = cb || noop;
            p = path.resolve(p);

            fs.lstat(p, function(err, stat) {
                if (err) return cb(err);

                const isDir = stat.isDirectory();

                if (!isDir) {
                    return fs.unlink(p, function(err) {
                        return err ? cb(err) : cb();
                    });
                }

                fs.readdir(p, function(err, files) {
                    if (err) return cb(err);

                    const len = files.length;

                    const cbs = [];
                    for (let i = 0; i < len; i++) {
                        cbs.push(
                            (function(file) {
                                return function(cb) {
                                    exports(file, cb);
                                };
                            })(path.resolve(p, files[i]))
                        );
                    }

                    parallel(cbs, function(err) {
                        if (err) return cb(err);

                        fs.rmdir(p, function(err) {
                            return err ? cb(err) : cb();
                        });
                    });
                });
            });
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

    /* ------------------------------ spaceCase ------------------------------ */
    _.spaceCase = (function (exports) {
        /* Convert string to "spaceCase".
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to convert |
         * |return|Space cased string|
         */

        /* example
         * spaceCase('fooBar'); // -> foo bar
         * spaceCase('foo.bar'); // -> foo bar
         * spaceCase('foo.bar'); // -> foo bar
         */

        /* typescript
         * export declare function spaceCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function(str) {
            return splitCase(str).join(' ');
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

    /* ------------------------------ through ------------------------------ */
    _.through = (function (exports) {
        /* Tiny wrapper of stream Transform.
         *
         * |Name     |Desc                        |
         * |---------|----------------------------|
         * |opts={}  |Options to initialize stream|
         * |transform|Transform implementation    |
         * |flush    |Flush implementation        |
         *
         * ### obj
         *
         * Shortcut for setting objectMode to true.
         *
         * ### ctor
         *
         * Return a class that extends stream Transform.
         */

        /* example
         * const fs = require('fs');
         * fs.createReadStream('in.txt')
         *     .pipe(
         *         through(function(chunk, enc, cb) {
         *             // Do something to chunk
         *             this.push(chunk);
         *             cb();
         *         })
         *     )
         *     .pipe(fs.createWriteStream('out.txt'));
         */

        /* typescript
         * import stream = require('stream');
         * export declare namespace through {
         *     interface ThroughConstructor extends stream.Transform {
         *         new (opts?: stream.DuplexOptions): stream.Transform;
         *         (opts?: stream.DuplexOptions): stream.Transform;
         *     }
         *     type TransformCallback = (err?: any, data?: any) => void;
         *     type TransformFunction = (
         *         this: stream.Transform,
         *         chunk: any,
         *         enc: string,
         *         callback: TransformCallback
         *     ) => void;
         *     type FlushCallback = (
         *         this: stream.Transform,
         *         flushCallback: () => void
         *     ) => void;
         *     function obj(
         *         transform?: TransformFunction,
         *         flush?: FlushCallback
         *     ): stream.Transform;
         *     function ctor(
         *         transform?: TransformFunction,
         *         flush?: FlushCallback
         *     ): ThroughConstructor;
         *     function ctor(
         *         opts?: stream.DuplexOptions,
         *         transform?: TransformFunction,
         *         flush?: FlushCallback
         *     ): ThroughConstructor;
         * }
         * export declare function through(
         *     transform?: through.TransformFunction,
         *     flush?: through.FlushCallback
         * ): stream.Transform;
         * export declare function through(
         *     opts?: stream.DuplexOptions,
         *     transform?: through.TransformFunction,
         *     flush?: through.FlushCallback
         * ): stream.Transform;
         */

        /* dependencies
         * isFn extend inherits 
         */

        const Transform = require('stream').Transform;

        exports = through(function(opts, transform, flush) {
            const t = new Transform(opts);

            t._transform = transform;
            if (flush) t._flush = flush;

            return t;
        });

        exports.obj = through(function(opts, transform, flush) {
            const t = new Transform(
                extend(
                    {
                        objectMode: true,
                        highWaterMark: 16
                    },
                    opts
                )
            );

            t._transform = transform;
            if (flush) t._flush = flush;

            return t;
        });

        exports.ctor = through(function(opts, transform, flush) {
            function Through(override) {
                if (!(this instanceof Through)) return new Through(override);

                Transform.call(this, extend(opts, override));
            }

            inherits(Through, Transform);

            const proto = Through.prototype;
            proto._transform = transform;
            if (flush) proto._flush = flush;

            return Through;
        });

        function through(streamFactory) {
            return function(opts, transform, flush) {
                if (isFn(opts)) {
                    flush = transform;
                    transform = opts;
                    opts = {};
                }

                if (!isFn(transform)) transform = defTransform;
                if (!isFn(flush)) flush = null;

                return streamFactory(opts, transform, flush);
            };
        }

        function defTransform(chunk, enc, cb) {
            cb(null, chunk);
        }

        return exports;
    })({});

    /* ------------------------------ tryIt ------------------------------ */
    _.tryIt = (function (exports) {
        /* Run function in a try catch.
         *
         * |Name|Desc                 |
         * |----|---------------------|
         * |fn  |Function to try catch|
         * |cb  |Callback             |
         */

        /* example
         * tryIt(
         *     function() {
         *         // Do something that might cause an error.
         *     },
         *     function(err, result) {
         *         if (err) console.log(err);
         *     }
         * );
         */

        /* typescript
         * export declare function tryIt(fn: types.AnyFn, cb?: types.AnyFn): void;
         */

        /* dependencies
         * noop types 
         */

        exports = function(fn, cb) {
            cb = cb || noop;

            try {
                cb(null, fn());
            } catch (e) {
                cb(e);
                return;
            }
        };

        return exports;
    })({});

    /* ------------------------------ waitUntil ------------------------------ */
    _.waitUntil = (function (exports) {
        /* Wait until function returns a truthy value.
         *
         * |Name        |Desc              |
         * |------------|------------------|
         * |condition   |Condition function|
         * |timeout=0   |Timeout           |
         * |interval=250|Wait interval     |
         */

        /* example
         * let a = 5;
         * setTimeout(() => (a = 10), 500);
         * waitUntil(() => a === 10).then(() => {
         *     console.log(a); // -> 10
         * });
         */

        /* typescript
         * export declare function waitUntil(
         *     condition: types.AnyFn,
         *     timeout?: number,
         *     interval?: number
         * ): Promise<any>;
         */

        /* dependencies
         * now types 
         */

        exports = function(condition) {
            var timeout =
                arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var interval =
                arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

            function evalCondition() {
                return new Promise(function(resolve, reject) {
                    try {
                        resolve(condition());
                    } catch (e) {
                        reject(e);
                    }
                });
            }

            return new Promise(function(resolve, reject) {
                var startTime = now();

                var pollCondition = function() {
                    evalCondition().then(function(val) {
                        var elapsed = now() - startTime;

                        if (val) {
                            resolve(val);
                        } else if (timeout && elapsed >= timeout) {
                            reject(
                                Error('Wait timed out after '.concat(elapsed, ' ms'))
                            );
                        } else {
                            setTimeout(pollCondition, interval);
                        }
                    }, reject);
                };

                pollCondition();
            });
        };

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

    return _;
}));