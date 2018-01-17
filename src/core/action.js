define(function(require) {
    
    var REGTAB = require('core/regtab');
    
    var _super = require('core/meta');
    __extends(action, _super);
    function action(objs) {
        _super.call(this);
        this.objs = objs;
        this._breaking = false;
    }
    
    action.prototype.SETID('#ACTION');
    action.prototype.FIRST_INIT = function(cls, proto) {
        console.log('action init', proto.ID);
    };
    
    action.prototype.PRIO_ACT = 100;
    
    action.prototype._emit_to_obj = function(node) {
        var self = this
        var node_mp = new (require('core/util').multi_pool)(node);
        for(var i = 0; i < self.objs.length; i++) {
            var obj = self.objs[i];
            node_mp.foreach([i, '*'], function(cb, path) {
                var sk_id = path[1];
                obj.foreach_skill(sk_id, null, function(skid, srcid, sk) {
                    if(!self._is_break()) {
                        cb.call(sk, self, obj, self.objs);
                    }
                });
            });
            if(self._is_break()) break;
        }
    };
    
    action.prototype.emit = function() {
        var node = REGTAB.check([this].concat(this.objs));
        var prios = Object.keys(node).sort(function(a, b){return a-b});
        for(var i = 0; i < prios.length; i++) {
            var prio = prios[i];
            if(prio >= this.PRIO_ACT) break;
            this._emit_to_obj(node[prio]);
            if(this._is_break()) return this._break_done();
        }
        if(this.effect) this.effect();
        if(this._is_break()) return this._break_done();
        for(; i < prios.length; i++) {
            var prio = prios[i];
            this._emit_to_obj(node[prio]);
            if(this._is_break()) return this._break_done();
        }
    };
    
    action.prototype._is_break = function() {
        return this._breaking;
    };
    
    action.prototype._break_done = function(v) {
        this._breaking = false;
        return v;
    };
    
    action.prototype.break = function() {
        this._breaking = true;
    };
    
    action.prototype.effect = function() {};
    
    return action;
    
});
