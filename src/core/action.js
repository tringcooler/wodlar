define(function(require) {
    
    var REGTAB = require('core/regtab');
    var PRIO_ACT = 100;
    
    var _super = require('core/meta');
    __extends(action, _super);
    function action(objs) {
        _super.call(this);
        this.objs = objs;
    }
    
    action.prototype.SETID('#ACTION');
    action.prototype.FIRST_INIT = function(cls, proto) {
        console.log('action init', proto.ID);
    };
    
    action.prototype._emit_to_obj = function(node) {
        var self = this
        var node_mp = new (require('core/util').multi_pool)(node);
        for(var i = 0; i < self.objs.length; i++) {
            var obj = self.objs[i];
            node_mp.foreach([i, node_mp.SYM_WC], function(cb, path) {
                var sk_id = path[1];
                obj.foreach_skill(sk_id, null, function(skid, srcid, sk) {
                    if(!self._is_broken()) {
                        if(cb) cb.call(sk, self, obj, self.objs);
                    }
                });
            });
            if(self._is_broken()) break;
        }
    };
    
    action.prototype.emit = function() {
        this._unbreak();
        var node = REGTAB.check([this].concat(this.objs));
        var prios = Object.keys(node).sort(function(a, b){return a-b});
        for(var i = 0; i < prios.length; i++) {
            var prio = prios[i];
            if(prio >= PRIO_ACT) break;
            this._emit_to_obj(node[prio]);
            if(this._is_broken()) return;
        }
        if(this.effect) this.effect();
        if(this._is_broken()) return;
        for(; i < prios.length; i++) {
            var prio = prios[i];
            this._emit_to_obj(node[prio]);
            if(this._is_broken()) return;
        }
    };
    
    action.prototype._is_broken = function() {
        return this._breaking;
    };
    
    action.prototype._unbreak = function() {
        this._breaking = false;
    };
    
    action.prototype.break = function() {
        this._breaking = true;
    };
    
    action.prototype.effect = function() {};
    
    return action;
    
});
