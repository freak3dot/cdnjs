if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/cookie/cookie.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/cookie/cookie.js",
    code: []
};
_yuitest_coverage["build/cookie/cookie.js"].code=["YUI.add('cookie', function (Y, NAME) {","","/**"," * Utilities for cookie management"," * @module cookie"," */","","    //shortcuts","    var L       = Y.Lang,","        O       = Y.Object,","        NULL    = null,","","        //shortcuts to functions","        isString    = L.isString,","        isObject    = L.isObject,","        isUndefined = L.isUndefined,","        isFunction  = L.isFunction,","        encode      = encodeURIComponent,","        decode      = decodeURIComponent,","","        //shortcut to document","        doc         = Y.config.doc;","","    /*","     * Throws an error message.","     */","    function error(message){","        throw new TypeError(message);","    }","","    /*","     * Checks the validity of a cookie name.","     */","    function validateCookieName(name){","        if (!isString(name) || name === \"\"){","            error(\"Cookie name must be a non-empty string.\");","        }","    }","","    /*","     * Checks the validity of a subcookie name.","     */","    function validateSubcookieName(subName){","        if (!isString(subName) || subName === \"\"){","            error(\"Subcookie name must be a non-empty string.\");","        }","    }","","    /**","     * Cookie utility.","     * @class Cookie","     * @static","     */","    Y.Cookie = {","","        //-------------------------------------------------------------------------","        // Private Methods","        //-------------------------------------------------------------------------","","        /**","         * Creates a cookie string that can be assigned into document.cookie.","         * @param {String} name The name of the cookie.","         * @param {String} value The value of the cookie.","         * @param {Boolean} encodeValue True to encode the value, false to leave as-is.","         * @param {Object} options (Optional) Options for the cookie.","         * @return {String} The formatted cookie string.","         * @method _createCookieString","         * @private","         * @static","         */","        _createCookieString : function (name /*:String*/, value /*:Variant*/, encodeValue /*:Boolean*/, options /*:Object*/) /*:String*/ {","","            options = options || {};","","            var text /*:String*/ = encode(name) + \"=\" + (encodeValue ? encode(value) : value),","                expires = options.expires,","                path    = options.path,","                domain  = options.domain;","","","            if (isObject(options)){","                //expiration date","                if (expires instanceof Date){","                    text += \"; expires=\" + expires.toUTCString();","                }","","                //path","                if (isString(path) && path !== \"\"){","                    text += \"; path=\" + path;","                }","","                //domain","                if (isString(domain) && domain !== \"\"){","                    text += \"; domain=\" + domain;","                }","","                //secure","                if (options.secure === true){","                    text += \"; secure\";","                }","            }","","            return text;","        },","","        /**","         * Formats a cookie value for an object containing multiple values.","         * @param {Object} hash An object of key-value pairs to create a string for.","         * @return {String} A string suitable for use as a cookie value.","         * @method _createCookieHashString","         * @private","         * @static","         */","        _createCookieHashString : function (hash /*:Object*/) /*:String*/ {","            if (!isObject(hash)){","                error(\"Cookie._createCookieHashString(): Argument must be an object.\");","            }","","            var text /*:Array*/ = [];","","            O.each(hash, function(value, key){","                if (!isFunction(value) && !isUndefined(value)){","                    text.push(encode(key) + \"=\" + encode(String(value)));","                }","            });","","            return text.join(\"&\");","        },","","        /**","         * Parses a cookie hash string into an object.","         * @param {String} text The cookie hash string to parse (format: n1=v1&n2=v2).","         * @return {Object} An object containing entries for each cookie value.","         * @method _parseCookieHash","         * @private","         * @static","         */","        _parseCookieHash : function (text) {","","            var hashParts   = text.split(\"&\"),","                hashPart    = NULL,","                hash        = {};","","            if (text.length){","                for (var i=0, len=hashParts.length; i < len; i++){","                    hashPart = hashParts[i].split(\"=\");","                    hash[decode(hashPart[0])] = decode(hashPart[1]);","                }","            }","","            return hash;","        },","","        /**","         * Parses a cookie string into an object representing all accessible cookies.","         * @param {String} text The cookie string to parse.","         * @param {Boolean} shouldDecode (Optional) Indicates if the cookie values should be decoded or not. Default is true.","         * @param {Object} options (Optional) Contains settings for loading the cookie.","         * @return {Object} An object containing entries for each accessible cookie.","         * @method _parseCookieString","         * @private","         * @static","         */","        _parseCookieString : function (text /*:String*/, shouldDecode /*:Boolean*/, options /*:Object*/) /*:Object*/ {","","            var cookies /*:Object*/ = {};","","            if (isString(text) && text.length > 0) {","","                var decodeValue = (shouldDecode === false ? function(s){return s;} : decode),","                    cookieParts = text.split(/;\\s/g),","                    cookieName  = NULL,","                    cookieValue = NULL,","                    cookieNameValue = NULL;","","                for (var i=0, len=cookieParts.length; i < len; i++){","                    //check for normally-formatted cookie (name-value)","                    cookieNameValue = cookieParts[i].match(/([^=]+)=/i);","                    if (cookieNameValue instanceof Array){","                        try {","                            cookieName = decode(cookieNameValue[1]);","                            cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length+1));","                        } catch (ex){","                            //intentionally ignore the cookie - the encoding is wrong","                        }","                    } else {","                        //means the cookie does not have an \"=\", so treat it as a boolean flag","                        cookieName = decode(cookieParts[i]);","                        cookieValue = \"\";","                    }","                    // don't overwrite an already loaded cookie if set by option","                    if (!isUndefined(options) && options.reverseCookieLoading) {","                        if (isUndefined(cookies[cookieName])) {","                            cookies[cookieName] = cookieValue;","                        }","                    } else {","                        cookies[cookieName] = cookieValue;","                    }","                }","","            }","","            return cookies;","        },","","        /**","         * Sets the document object that the cookie utility uses for setting","         * cookies. This method is necessary to ensure that the cookie utility","         * unit tests can pass even when run on a domain instead of locally.","         * This method should not be used otherwise; you should use","         * <code>Y.config.doc</code> to change the document that the cookie","         * utility uses for everyday purposes.","         * @param {Object} newDoc The object to use as the document.","         * @return {void}","         * @method _setDoc","         * @private","         */","        _setDoc: function(newDoc){","            doc = newDoc;","        },","","        //-------------------------------------------------------------------------","        // Public Methods","        //-------------------------------------------------------------------------","","        /**","         * Determines if the cookie with the given name exists. This is useful for","         * Boolean cookies (those that do not follow the name=value convention).","         * @param {String} name The name of the cookie to check.","         * @return {Boolean} True if the cookie exists, false if not.","         * @method exists","         * @static","         */","        exists: function(name) {","","            validateCookieName(name);   //throws error","","            var cookies = this._parseCookieString(doc.cookie, true);","","            return cookies.hasOwnProperty(name);","        },","","        /**","         * Returns the cookie value for the given name.","         * @param {String} name The name of the cookie to retrieve.","         * @param {Function|Object} options (Optional) An object containing one or more","         *      cookie options: raw (true/false), reverseCookieLoading (true/false)","         *      and converter (a function).","         *      The converter function is run on the value before returning it. The","         *      function is not used if the cookie doesn't exist. The function can be","         *      passed instead of the options object for backwards compatibility. When","         *      raw is set to true, the cookie value is not URI decoded.","         * @return {Variant} If no converter is specified, returns a string or null if","         *      the cookie doesn't exist. If the converter is specified, returns the value","         *      returned from the converter or null if the cookie doesn't exist.","         * @method get","         * @static","         */","        get : function (name, options) {","","            validateCookieName(name);   //throws error","","            var cookies,","                cookie,","                converter;","","            //if options is a function, then it's the converter","            if (isFunction(options)) {","                converter = options;","                options = {};","            } else if (isObject(options)) {","                converter = options.converter;","            } else {","                options = {};","            }","","            cookies = this._parseCookieString(doc.cookie, !options.raw, options);","            cookie = cookies[name];","","            //should return null, not undefined if the cookie doesn't exist","            if (isUndefined(cookie)) {","                return NULL;","            }","","            if (!isFunction(converter)){","                return cookie;","            } else {","                return converter(cookie);","            }","        },","","        /**","         * Returns the value of a subcookie.","         * @param {String} name The name of the cookie to retrieve.","         * @param {String} subName The name of the subcookie to retrieve.","         * @param {Function} converter (Optional) A function to run on the value before returning","         *      it. The function is not used if the cookie doesn't exist.","         * @param {Object} options (Optional) Containing one or more settings for cookie parsing.","         * @return {Variant} If the cookie doesn't exist, null is returned. If the subcookie","         *      doesn't exist, null if also returned. If no converter is specified and the","         *      subcookie exists, a string is returned. If a converter is specified and the","         *      subcookie exists, the value returned from the converter is returned.","         * @method getSub","         * @static","         */","        getSub : function (name /*:String*/, subName /*:String*/, converter /*:Function*/, options /*:Object*/) /*:Variant*/ {","","            var hash /*:Variant*/ = this.getSubs(name, options);","","            if (hash !== NULL) {","","                validateSubcookieName(subName);   //throws error","","                if (isUndefined(hash[subName])){","                    return NULL;","                }","","                if (!isFunction(converter)){","                    return hash[subName];","                } else {","                    return converter(hash[subName]);","                }","            } else {","                return NULL;","            }","","        },","","        /**","         * Returns an object containing name-value pairs stored in the cookie with the given name.","         * @param {String} name The name of the cookie to retrieve.","         * @param {Object} options (Optional) Containing one or more settings for cookie parsing.","         * @return {Object} An object of name-value pairs if the cookie with the given name","         *      exists, null if it does not.","         * @method getSubs","         * @static","         */","        getSubs : function (name /*:String*/, options /*:Object*/) {","","            validateCookieName(name);   //throws error","","            var cookies = this._parseCookieString(doc.cookie, false, options);","            if (isString(cookies[name])){","                return this._parseCookieHash(cookies[name]);","            }","            return NULL;","        },","","        /**","         * Removes a cookie from the machine by setting its expiration date to","         * sometime in the past.","         * @param {String} name The name of the cookie to remove.","         * @param {Object} options (Optional) An object containing one or more","         *      cookie options: path (a string), domain (a string),","         *      and secure (true/false). The expires option will be overwritten","         *      by the method.","         * @return {String} The created cookie string.","         * @method remove","         * @static","         */","        remove : function (name, options) {","","            validateCookieName(name);   //throws error","","            //set options","            options = Y.merge(options || {}, {","                expires: new Date(0)","            });","","            //set cookie","            return this.set(name, \"\", options);","        },","","        /**","         * Removes a sub cookie with a given name.","         * @param {String} name The name of the cookie in which the subcookie exists.","         * @param {String} subName The name of the subcookie to remove.","         * @param {Object} options (Optional) An object containing one or more","         *      cookie options: path (a string), domain (a string), expires (a Date object),","         *      removeIfEmpty (true/false), and secure (true/false). This must be the same","         *      settings as the original subcookie.","         * @return {String} The created cookie string.","         * @method removeSub","         * @static","         */","        removeSub : function(name, subName, options) {","","            validateCookieName(name);   //throws error","","            validateSubcookieName(subName);   //throws error","","            options = options || {};","","            //get all subcookies for this cookie","            var subs = this.getSubs(name);","","            //delete the indicated subcookie","            if (isObject(subs) && subs.hasOwnProperty(subName)){","                delete subs[subName];","","                if (!options.removeIfEmpty) {","                    //reset the cookie","","                    return this.setSubs(name, subs, options);","                } else {","                    //reset the cookie if there are subcookies left, else remove","                    for (var key in subs){","                        if (subs.hasOwnProperty(key) && !isFunction(subs[key]) && !isUndefined(subs[key])){","                            return this.setSubs(name, subs, options);","                        }","                    }","","                    return this.remove(name, options);","                }","            } else {","                return \"\";","            }","","        },","","        /**","         * Sets a cookie with a given name and value.","         * @param {String} name The name of the cookie to set.","         * @param {Variant} value The value to set for the cookie.","         * @param {Object} options (Optional) An object containing one or more","         *      cookie options: path (a string), domain (a string), expires (a Date object),","         *      secure (true/false), and raw (true/false). Setting raw to true indicates","         *      that the cookie should not be URI encoded before being set.","         * @return {String} The created cookie string.","         * @method set","         * @static","         */","        set : function (name, value, options) {","","            validateCookieName(name);   //throws error","","            if (isUndefined(value)){","                error(\"Cookie.set(): Value cannot be undefined.\");","            }","","            options = options || {};","","            var text = this._createCookieString(name, value, !options.raw, options);","            doc.cookie = text;","            return text;","        },","","        /**","         * Sets a sub cookie with a given name to a particular value.","         * @param {String} name The name of the cookie to set.","         * @param {String} subName The name of the subcookie to set.","         * @param {Variant} value The value to set.","         * @param {Object} options (Optional) An object containing one or more","         *      cookie options: path (a string), domain (a string), expires (a Date object),","         *      and secure (true/false).","         * @return {String} The created cookie string.","         * @method setSub","         * @static","         */","        setSub : function (name, subName, value, options) {","","            validateCookieName(name);   //throws error","","            validateSubcookieName(subName);   //throws error","","            if (isUndefined(value)){","                error(\"Cookie.setSub(): Subcookie value cannot be undefined.\");","            }","","            var hash = this.getSubs(name);","","            if (!isObject(hash)){","                hash = {};","            }","","            hash[subName] = value;","","            return this.setSubs(name, hash, options);","","        },","","        /**","         * Sets a cookie with a given name to contain a hash of name-value pairs.","         * @param {String} name The name of the cookie to set.","         * @param {Object} value An object containing name-value pairs.","         * @param {Object} options (Optional) An object containing one or more","         *      cookie options: path (a string), domain (a string), expires (a Date object),","         *      and secure (true/false).","         * @return {String} The created cookie string.","         * @method setSubs","         * @static","         */","        setSubs : function (name, value, options) {","","            validateCookieName(name);   //throws error","","            if (!isObject(value)){","                error(\"Cookie.setSubs(): Cookie value must be an object.\");","            }","","            var text /*:String*/ = this._createCookieString(name, this._createCookieHashString(value), false, options);","            doc.cookie = text;","            return text;","        }","","    };","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/cookie/cookie.js"].lines = {"1":0,"9":0,"27":0,"28":0,"34":0,"35":0,"36":0,"43":0,"44":0,"45":0,"54":0,"73":0,"75":0,"81":0,"83":0,"84":0,"88":0,"89":0,"93":0,"94":0,"98":0,"99":0,"103":0,"115":0,"116":0,"119":0,"121":0,"122":0,"123":0,"127":0,"140":0,"144":0,"145":0,"146":0,"147":0,"151":0,"166":0,"168":0,"170":0,"176":0,"178":0,"179":0,"180":0,"181":0,"182":0,"188":0,"189":0,"192":0,"193":0,"194":0,"197":0,"203":0,"219":0,"236":0,"238":0,"240":0,"261":0,"263":0,"268":0,"269":0,"270":0,"271":0,"272":0,"274":0,"277":0,"278":0,"281":0,"282":0,"285":0,"286":0,"288":0,"308":0,"310":0,"312":0,"314":0,"315":0,"318":0,"319":0,"321":0,"324":0,"340":0,"342":0,"343":0,"344":0,"346":0,"363":0,"366":0,"371":0,"388":0,"390":0,"392":0,"395":0,"398":0,"399":0,"401":0,"404":0,"407":0,"408":0,"409":0,"413":0,"416":0,"435":0,"437":0,"438":0,"441":0,"443":0,"444":0,"445":0,"462":0,"464":0,"466":0,"467":0,"470":0,"472":0,"473":0,"476":0,"478":0,"495":0,"497":0,"498":0,"501":0,"502":0,"503":0};
_yuitest_coverage["build/cookie/cookie.js"].functions = {"error:27":0,"validateCookieName:34":0,"validateSubcookieName:43":0,"_createCookieString:71":0,"(anonymous 2):121":0,"_createCookieHashString:114":0,"_parseCookieHash:138":0,"(anonymous 3):170":0,"_parseCookieString:164":0,"_setDoc:218":0,"exists:234":0,"get:259":0,"getSub:306":0,"getSubs:338":0,"remove:361":0,"removeSub:386":0,"set:433":0,"setSub:460":0,"setSubs:493":0,"(anonymous 1):1":0};
_yuitest_coverage["build/cookie/cookie.js"].coveredLines = 123;
_yuitest_coverage["build/cookie/cookie.js"].coveredFunctions = 20;
_yuitest_coverline("build/cookie/cookie.js", 1);
YUI.add('cookie', function (Y, NAME) {

/**
 * Utilities for cookie management
 * @module cookie
 */

    //shortcuts
    _yuitest_coverfunc("build/cookie/cookie.js", "(anonymous 1)", 1);
_yuitest_coverline("build/cookie/cookie.js", 9);
var L       = Y.Lang,
        O       = Y.Object,
        NULL    = null,

        //shortcuts to functions
        isString    = L.isString,
        isObject    = L.isObject,
        isUndefined = L.isUndefined,
        isFunction  = L.isFunction,
        encode      = encodeURIComponent,
        decode      = decodeURIComponent,

        //shortcut to document
        doc         = Y.config.doc;

    /*
     * Throws an error message.
     */
    _yuitest_coverline("build/cookie/cookie.js", 27);
function error(message){
        _yuitest_coverfunc("build/cookie/cookie.js", "error", 27);
_yuitest_coverline("build/cookie/cookie.js", 28);
throw new TypeError(message);
    }

    /*
     * Checks the validity of a cookie name.
     */
    _yuitest_coverline("build/cookie/cookie.js", 34);
function validateCookieName(name){
        _yuitest_coverfunc("build/cookie/cookie.js", "validateCookieName", 34);
_yuitest_coverline("build/cookie/cookie.js", 35);
if (!isString(name) || name === ""){
            _yuitest_coverline("build/cookie/cookie.js", 36);
error("Cookie name must be a non-empty string.");
        }
    }

    /*
     * Checks the validity of a subcookie name.
     */
    _yuitest_coverline("build/cookie/cookie.js", 43);
function validateSubcookieName(subName){
        _yuitest_coverfunc("build/cookie/cookie.js", "validateSubcookieName", 43);
_yuitest_coverline("build/cookie/cookie.js", 44);
if (!isString(subName) || subName === ""){
            _yuitest_coverline("build/cookie/cookie.js", 45);
error("Subcookie name must be a non-empty string.");
        }
    }

    /**
     * Cookie utility.
     * @class Cookie
     * @static
     */
    _yuitest_coverline("build/cookie/cookie.js", 54);
Y.Cookie = {

        //-------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------

        /**
         * Creates a cookie string that can be assigned into document.cookie.
         * @param {String} name The name of the cookie.
         * @param {String} value The value of the cookie.
         * @param {Boolean} encodeValue True to encode the value, false to leave as-is.
         * @param {Object} options (Optional) Options for the cookie.
         * @return {String} The formatted cookie string.
         * @method _createCookieString
         * @private
         * @static
         */
        _createCookieString : function (name /*:String*/, value /*:Variant*/, encodeValue /*:Boolean*/, options /*:Object*/) /*:String*/ {

            _yuitest_coverfunc("build/cookie/cookie.js", "_createCookieString", 71);
_yuitest_coverline("build/cookie/cookie.js", 73);
options = options || {};

            _yuitest_coverline("build/cookie/cookie.js", 75);
var text /*:String*/ = encode(name) + "=" + (encodeValue ? encode(value) : value),
                expires = options.expires,
                path    = options.path,
                domain  = options.domain;


            _yuitest_coverline("build/cookie/cookie.js", 81);
if (isObject(options)){
                //expiration date
                _yuitest_coverline("build/cookie/cookie.js", 83);
if (expires instanceof Date){
                    _yuitest_coverline("build/cookie/cookie.js", 84);
text += "; expires=" + expires.toUTCString();
                }

                //path
                _yuitest_coverline("build/cookie/cookie.js", 88);
if (isString(path) && path !== ""){
                    _yuitest_coverline("build/cookie/cookie.js", 89);
text += "; path=" + path;
                }

                //domain
                _yuitest_coverline("build/cookie/cookie.js", 93);
if (isString(domain) && domain !== ""){
                    _yuitest_coverline("build/cookie/cookie.js", 94);
text += "; domain=" + domain;
                }

                //secure
                _yuitest_coverline("build/cookie/cookie.js", 98);
if (options.secure === true){
                    _yuitest_coverline("build/cookie/cookie.js", 99);
text += "; secure";
                }
            }

            _yuitest_coverline("build/cookie/cookie.js", 103);
return text;
        },

        /**
         * Formats a cookie value for an object containing multiple values.
         * @param {Object} hash An object of key-value pairs to create a string for.
         * @return {String} A string suitable for use as a cookie value.
         * @method _createCookieHashString
         * @private
         * @static
         */
        _createCookieHashString : function (hash /*:Object*/) /*:String*/ {
            _yuitest_coverfunc("build/cookie/cookie.js", "_createCookieHashString", 114);
_yuitest_coverline("build/cookie/cookie.js", 115);
if (!isObject(hash)){
                _yuitest_coverline("build/cookie/cookie.js", 116);
error("Cookie._createCookieHashString(): Argument must be an object.");
            }

            _yuitest_coverline("build/cookie/cookie.js", 119);
var text /*:Array*/ = [];

            _yuitest_coverline("build/cookie/cookie.js", 121);
O.each(hash, function(value, key){
                _yuitest_coverfunc("build/cookie/cookie.js", "(anonymous 2)", 121);
_yuitest_coverline("build/cookie/cookie.js", 122);
if (!isFunction(value) && !isUndefined(value)){
                    _yuitest_coverline("build/cookie/cookie.js", 123);
text.push(encode(key) + "=" + encode(String(value)));
                }
            });

            _yuitest_coverline("build/cookie/cookie.js", 127);
return text.join("&");
        },

        /**
         * Parses a cookie hash string into an object.
         * @param {String} text The cookie hash string to parse (format: n1=v1&n2=v2).
         * @return {Object} An object containing entries for each cookie value.
         * @method _parseCookieHash
         * @private
         * @static
         */
        _parseCookieHash : function (text) {

            _yuitest_coverfunc("build/cookie/cookie.js", "_parseCookieHash", 138);
_yuitest_coverline("build/cookie/cookie.js", 140);
var hashParts   = text.split("&"),
                hashPart    = NULL,
                hash        = {};

            _yuitest_coverline("build/cookie/cookie.js", 144);
if (text.length){
                _yuitest_coverline("build/cookie/cookie.js", 145);
for (var i=0, len=hashParts.length; i < len; i++){
                    _yuitest_coverline("build/cookie/cookie.js", 146);
hashPart = hashParts[i].split("=");
                    _yuitest_coverline("build/cookie/cookie.js", 147);
hash[decode(hashPart[0])] = decode(hashPart[1]);
                }
            }

            _yuitest_coverline("build/cookie/cookie.js", 151);
return hash;
        },

        /**
         * Parses a cookie string into an object representing all accessible cookies.
         * @param {String} text The cookie string to parse.
         * @param {Boolean} shouldDecode (Optional) Indicates if the cookie values should be decoded or not. Default is true.
         * @param {Object} options (Optional) Contains settings for loading the cookie.
         * @return {Object} An object containing entries for each accessible cookie.
         * @method _parseCookieString
         * @private
         * @static
         */
        _parseCookieString : function (text /*:String*/, shouldDecode /*:Boolean*/, options /*:Object*/) /*:Object*/ {

            _yuitest_coverfunc("build/cookie/cookie.js", "_parseCookieString", 164);
_yuitest_coverline("build/cookie/cookie.js", 166);
var cookies /*:Object*/ = {};

            _yuitest_coverline("build/cookie/cookie.js", 168);
if (isString(text) && text.length > 0) {

                _yuitest_coverline("build/cookie/cookie.js", 170);
var decodeValue = (shouldDecode === false ? function(s){_yuitest_coverfunc("build/cookie/cookie.js", "(anonymous 3)", 170);
return s;} : decode),
                    cookieParts = text.split(/;\s/g),
                    cookieName  = NULL,
                    cookieValue = NULL,
                    cookieNameValue = NULL;

                _yuitest_coverline("build/cookie/cookie.js", 176);
for (var i=0, len=cookieParts.length; i < len; i++){
                    //check for normally-formatted cookie (name-value)
                    _yuitest_coverline("build/cookie/cookie.js", 178);
cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
                    _yuitest_coverline("build/cookie/cookie.js", 179);
if (cookieNameValue instanceof Array){
                        _yuitest_coverline("build/cookie/cookie.js", 180);
try {
                            _yuitest_coverline("build/cookie/cookie.js", 181);
cookieName = decode(cookieNameValue[1]);
                            _yuitest_coverline("build/cookie/cookie.js", 182);
cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length+1));
                        } catch (ex){
                            //intentionally ignore the cookie - the encoding is wrong
                        }
                    } else {
                        //means the cookie does not have an "=", so treat it as a boolean flag
                        _yuitest_coverline("build/cookie/cookie.js", 188);
cookieName = decode(cookieParts[i]);
                        _yuitest_coverline("build/cookie/cookie.js", 189);
cookieValue = "";
                    }
                    // don't overwrite an already loaded cookie if set by option
                    _yuitest_coverline("build/cookie/cookie.js", 192);
if (!isUndefined(options) && options.reverseCookieLoading) {
                        _yuitest_coverline("build/cookie/cookie.js", 193);
if (isUndefined(cookies[cookieName])) {
                            _yuitest_coverline("build/cookie/cookie.js", 194);
cookies[cookieName] = cookieValue;
                        }
                    } else {
                        _yuitest_coverline("build/cookie/cookie.js", 197);
cookies[cookieName] = cookieValue;
                    }
                }

            }

            _yuitest_coverline("build/cookie/cookie.js", 203);
return cookies;
        },

        /**
         * Sets the document object that the cookie utility uses for setting
         * cookies. This method is necessary to ensure that the cookie utility
         * unit tests can pass even when run on a domain instead of locally.
         * This method should not be used otherwise; you should use
         * <code>Y.config.doc</code> to change the document that the cookie
         * utility uses for everyday purposes.
         * @param {Object} newDoc The object to use as the document.
         * @return {void}
         * @method _setDoc
         * @private
         */
        _setDoc: function(newDoc){
            _yuitest_coverfunc("build/cookie/cookie.js", "_setDoc", 218);
_yuitest_coverline("build/cookie/cookie.js", 219);
doc = newDoc;
        },

        //-------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------

        /**
         * Determines if the cookie with the given name exists. This is useful for
         * Boolean cookies (those that do not follow the name=value convention).
         * @param {String} name The name of the cookie to check.
         * @return {Boolean} True if the cookie exists, false if not.
         * @method exists
         * @static
         */
        exists: function(name) {

            _yuitest_coverfunc("build/cookie/cookie.js", "exists", 234);
_yuitest_coverline("build/cookie/cookie.js", 236);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 238);
var cookies = this._parseCookieString(doc.cookie, true);

            _yuitest_coverline("build/cookie/cookie.js", 240);
return cookies.hasOwnProperty(name);
        },

        /**
         * Returns the cookie value for the given name.
         * @param {String} name The name of the cookie to retrieve.
         * @param {Function|Object} options (Optional) An object containing one or more
         *      cookie options: raw (true/false), reverseCookieLoading (true/false)
         *      and converter (a function).
         *      The converter function is run on the value before returning it. The
         *      function is not used if the cookie doesn't exist. The function can be
         *      passed instead of the options object for backwards compatibility. When
         *      raw is set to true, the cookie value is not URI decoded.
         * @return {Variant} If no converter is specified, returns a string or null if
         *      the cookie doesn't exist. If the converter is specified, returns the value
         *      returned from the converter or null if the cookie doesn't exist.
         * @method get
         * @static
         */
        get : function (name, options) {

            _yuitest_coverfunc("build/cookie/cookie.js", "get", 259);
_yuitest_coverline("build/cookie/cookie.js", 261);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 263);
var cookies,
                cookie,
                converter;

            //if options is a function, then it's the converter
            _yuitest_coverline("build/cookie/cookie.js", 268);
if (isFunction(options)) {
                _yuitest_coverline("build/cookie/cookie.js", 269);
converter = options;
                _yuitest_coverline("build/cookie/cookie.js", 270);
options = {};
            } else {_yuitest_coverline("build/cookie/cookie.js", 271);
if (isObject(options)) {
                _yuitest_coverline("build/cookie/cookie.js", 272);
converter = options.converter;
            } else {
                _yuitest_coverline("build/cookie/cookie.js", 274);
options = {};
            }}

            _yuitest_coverline("build/cookie/cookie.js", 277);
cookies = this._parseCookieString(doc.cookie, !options.raw, options);
            _yuitest_coverline("build/cookie/cookie.js", 278);
cookie = cookies[name];

            //should return null, not undefined if the cookie doesn't exist
            _yuitest_coverline("build/cookie/cookie.js", 281);
if (isUndefined(cookie)) {
                _yuitest_coverline("build/cookie/cookie.js", 282);
return NULL;
            }

            _yuitest_coverline("build/cookie/cookie.js", 285);
if (!isFunction(converter)){
                _yuitest_coverline("build/cookie/cookie.js", 286);
return cookie;
            } else {
                _yuitest_coverline("build/cookie/cookie.js", 288);
return converter(cookie);
            }
        },

        /**
         * Returns the value of a subcookie.
         * @param {String} name The name of the cookie to retrieve.
         * @param {String} subName The name of the subcookie to retrieve.
         * @param {Function} converter (Optional) A function to run on the value before returning
         *      it. The function is not used if the cookie doesn't exist.
         * @param {Object} options (Optional) Containing one or more settings for cookie parsing.
         * @return {Variant} If the cookie doesn't exist, null is returned. If the subcookie
         *      doesn't exist, null if also returned. If no converter is specified and the
         *      subcookie exists, a string is returned. If a converter is specified and the
         *      subcookie exists, the value returned from the converter is returned.
         * @method getSub
         * @static
         */
        getSub : function (name /*:String*/, subName /*:String*/, converter /*:Function*/, options /*:Object*/) /*:Variant*/ {

            _yuitest_coverfunc("build/cookie/cookie.js", "getSub", 306);
_yuitest_coverline("build/cookie/cookie.js", 308);
var hash /*:Variant*/ = this.getSubs(name, options);

            _yuitest_coverline("build/cookie/cookie.js", 310);
if (hash !== NULL) {

                _yuitest_coverline("build/cookie/cookie.js", 312);
validateSubcookieName(subName);   //throws error

                _yuitest_coverline("build/cookie/cookie.js", 314);
if (isUndefined(hash[subName])){
                    _yuitest_coverline("build/cookie/cookie.js", 315);
return NULL;
                }

                _yuitest_coverline("build/cookie/cookie.js", 318);
if (!isFunction(converter)){
                    _yuitest_coverline("build/cookie/cookie.js", 319);
return hash[subName];
                } else {
                    _yuitest_coverline("build/cookie/cookie.js", 321);
return converter(hash[subName]);
                }
            } else {
                _yuitest_coverline("build/cookie/cookie.js", 324);
return NULL;
            }

        },

        /**
         * Returns an object containing name-value pairs stored in the cookie with the given name.
         * @param {String} name The name of the cookie to retrieve.
         * @param {Object} options (Optional) Containing one or more settings for cookie parsing.
         * @return {Object} An object of name-value pairs if the cookie with the given name
         *      exists, null if it does not.
         * @method getSubs
         * @static
         */
        getSubs : function (name /*:String*/, options /*:Object*/) {

            _yuitest_coverfunc("build/cookie/cookie.js", "getSubs", 338);
_yuitest_coverline("build/cookie/cookie.js", 340);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 342);
var cookies = this._parseCookieString(doc.cookie, false, options);
            _yuitest_coverline("build/cookie/cookie.js", 343);
if (isString(cookies[name])){
                _yuitest_coverline("build/cookie/cookie.js", 344);
return this._parseCookieHash(cookies[name]);
            }
            _yuitest_coverline("build/cookie/cookie.js", 346);
return NULL;
        },

        /**
         * Removes a cookie from the machine by setting its expiration date to
         * sometime in the past.
         * @param {String} name The name of the cookie to remove.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string),
         *      and secure (true/false). The expires option will be overwritten
         *      by the method.
         * @return {String} The created cookie string.
         * @method remove
         * @static
         */
        remove : function (name, options) {

            _yuitest_coverfunc("build/cookie/cookie.js", "remove", 361);
_yuitest_coverline("build/cookie/cookie.js", 363);
validateCookieName(name);   //throws error

            //set options
            _yuitest_coverline("build/cookie/cookie.js", 366);
options = Y.merge(options || {}, {
                expires: new Date(0)
            });

            //set cookie
            _yuitest_coverline("build/cookie/cookie.js", 371);
return this.set(name, "", options);
        },

        /**
         * Removes a sub cookie with a given name.
         * @param {String} name The name of the cookie in which the subcookie exists.
         * @param {String} subName The name of the subcookie to remove.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      removeIfEmpty (true/false), and secure (true/false). This must be the same
         *      settings as the original subcookie.
         * @return {String} The created cookie string.
         * @method removeSub
         * @static
         */
        removeSub : function(name, subName, options) {

            _yuitest_coverfunc("build/cookie/cookie.js", "removeSub", 386);
_yuitest_coverline("build/cookie/cookie.js", 388);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 390);
validateSubcookieName(subName);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 392);
options = options || {};

            //get all subcookies for this cookie
            _yuitest_coverline("build/cookie/cookie.js", 395);
var subs = this.getSubs(name);

            //delete the indicated subcookie
            _yuitest_coverline("build/cookie/cookie.js", 398);
if (isObject(subs) && subs.hasOwnProperty(subName)){
                _yuitest_coverline("build/cookie/cookie.js", 399);
delete subs[subName];

                _yuitest_coverline("build/cookie/cookie.js", 401);
if (!options.removeIfEmpty) {
                    //reset the cookie

                    _yuitest_coverline("build/cookie/cookie.js", 404);
return this.setSubs(name, subs, options);
                } else {
                    //reset the cookie if there are subcookies left, else remove
                    _yuitest_coverline("build/cookie/cookie.js", 407);
for (var key in subs){
                        _yuitest_coverline("build/cookie/cookie.js", 408);
if (subs.hasOwnProperty(key) && !isFunction(subs[key]) && !isUndefined(subs[key])){
                            _yuitest_coverline("build/cookie/cookie.js", 409);
return this.setSubs(name, subs, options);
                        }
                    }

                    _yuitest_coverline("build/cookie/cookie.js", 413);
return this.remove(name, options);
                }
            } else {
                _yuitest_coverline("build/cookie/cookie.js", 416);
return "";
            }

        },

        /**
         * Sets a cookie with a given name and value.
         * @param {String} name The name of the cookie to set.
         * @param {Variant} value The value to set for the cookie.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      secure (true/false), and raw (true/false). Setting raw to true indicates
         *      that the cookie should not be URI encoded before being set.
         * @return {String} The created cookie string.
         * @method set
         * @static
         */
        set : function (name, value, options) {

            _yuitest_coverfunc("build/cookie/cookie.js", "set", 433);
_yuitest_coverline("build/cookie/cookie.js", 435);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 437);
if (isUndefined(value)){
                _yuitest_coverline("build/cookie/cookie.js", 438);
error("Cookie.set(): Value cannot be undefined.");
            }

            _yuitest_coverline("build/cookie/cookie.js", 441);
options = options || {};

            _yuitest_coverline("build/cookie/cookie.js", 443);
var text = this._createCookieString(name, value, !options.raw, options);
            _yuitest_coverline("build/cookie/cookie.js", 444);
doc.cookie = text;
            _yuitest_coverline("build/cookie/cookie.js", 445);
return text;
        },

        /**
         * Sets a sub cookie with a given name to a particular value.
         * @param {String} name The name of the cookie to set.
         * @param {String} subName The name of the subcookie to set.
         * @param {Variant} value The value to set.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      and secure (true/false).
         * @return {String} The created cookie string.
         * @method setSub
         * @static
         */
        setSub : function (name, subName, value, options) {

            _yuitest_coverfunc("build/cookie/cookie.js", "setSub", 460);
_yuitest_coverline("build/cookie/cookie.js", 462);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 464);
validateSubcookieName(subName);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 466);
if (isUndefined(value)){
                _yuitest_coverline("build/cookie/cookie.js", 467);
error("Cookie.setSub(): Subcookie value cannot be undefined.");
            }

            _yuitest_coverline("build/cookie/cookie.js", 470);
var hash = this.getSubs(name);

            _yuitest_coverline("build/cookie/cookie.js", 472);
if (!isObject(hash)){
                _yuitest_coverline("build/cookie/cookie.js", 473);
hash = {};
            }

            _yuitest_coverline("build/cookie/cookie.js", 476);
hash[subName] = value;

            _yuitest_coverline("build/cookie/cookie.js", 478);
return this.setSubs(name, hash, options);

        },

        /**
         * Sets a cookie with a given name to contain a hash of name-value pairs.
         * @param {String} name The name of the cookie to set.
         * @param {Object} value An object containing name-value pairs.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      and secure (true/false).
         * @return {String} The created cookie string.
         * @method setSubs
         * @static
         */
        setSubs : function (name, value, options) {

            _yuitest_coverfunc("build/cookie/cookie.js", "setSubs", 493);
_yuitest_coverline("build/cookie/cookie.js", 495);
validateCookieName(name);   //throws error

            _yuitest_coverline("build/cookie/cookie.js", 497);
if (!isObject(value)){
                _yuitest_coverline("build/cookie/cookie.js", 498);
error("Cookie.setSubs(): Cookie value must be an object.");
            }

            _yuitest_coverline("build/cookie/cookie.js", 501);
var text /*:String*/ = this._createCookieString(name, this._createCookieHashString(value), false, options);
            _yuitest_coverline("build/cookie/cookie.js", 502);
doc.cookie = text;
            _yuitest_coverline("build/cookie/cookie.js", 503);
return text;
        }

    };


}, '@VERSION@', {"requires": ["yui-base"]});
