var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

/*
var subclass = (function(_super) {
	__extends(subclass, _super);
	function subclass(arg) {
        var new_arg = null;
		_super.call(this, arg, new_arg);
	}
    subclass.prototype.method = function(arg) {
        var new_arg = null;
        return _super.prototype.method.call(this, arg, new_arg);
    };
    return subclass;
})(superclass)
*/

var __require = (function() {
    var __require_list = this.__require_list || {};
    var __require_load = function (s) {
        var elm = document.createElement('script');
        elm.type ='text/javascript';
        elm.src = 'src/' + s + '.js';
        elm.async = true;
        document.getElementsByTagName('head')[0].appendChild(elm);
    };
    var __require = this.__require || function (s) {
        if(!(s in __require_list)) {
            try {
                __require_load(s);
            } catch(err) {
                console.log('catch', err);
            }
            console.log('before', s);
            throw 'aaaa';
            console.log('after', s);
            __require_list[s] = elm;
        }
    };
    return __require;
})();
