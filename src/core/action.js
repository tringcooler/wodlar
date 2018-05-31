define(function(require) {
    
    var REGTAB = require('core/regtab');
    var META = require('core/meta');
    
    var _super = META;
    __extends(action, _super);
    function action(objs) {
        _super.call(this);
        this.objs = objs;
    }
    
    action.prototype.SETID('#ACTION');
    
    action.prototype._emit_to_obj = function(node, ctx) {
        var self = this
        var node_mp = new (require('core/util').multi_pool)(node);
        for(var i = 0; i < self.objs.length; i++) {
            var obj = self.objs[i];
            node_mp.foreach([i, node_mp.SYM_WC], function(cb, path) {
                var sk_id = path[1];
                if(!self._is_bypass(sk_id)) {
                    obj.foreach_skill(sk_id, null, function(skid, srcid, sk) {
                        if(!self._is_broken()) {
                            if(cb) cb.call(sk, self, self.objs, obj, ctx);
                        }
                    });
                }
            });
            if(self._is_broken()) break;
        }
    };
    
    action.prototype.emit = function(ctx = null) {
        this._init_emit_ctx();
        var emit_ctx = {};
        if(ctx) emit_ctx = ctx;
        var node = REGTAB.check([this.objs.length, this].concat(this.objs));
        var prios = Object.keys(node).sort(function(a, b){return b - a});
        for(var i = 0; i < prios.length; i++) {
            var prio = prios[i];
            this._emit_to_obj(node[prio], emit_ctx);
            if(this._is_broken()) return;
        }
    };
    
    action.prototype._init_emit_ctx = function() {
        this._breaking = false;
        this._bypass_set = {};
    };
    
    action.prototype._is_broken = function() {
        return this._breaking;
    };
    
    action.prototype.break = function() {
        this._breaking = true;
    };
    
    action.prototype._is_bypass = function(sk_id) {
        return this._bypass_set[sk_id];
    };
    
    action.prototype.bypass = function(sk) {
        var _cover = require('core/util').meta_tools(META).cover;
        var keys = _cover(sk);
        if(!(keys instanceof Array)) {
            keys = [keys];
        }
        for(var i = 0; i < keys.length; i++) {
            this._bypass_set[keys[i]] = true;
        }
    };
    
    return action;
    
});
