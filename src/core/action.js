define(function(require) {
    
    var REGTAB = require('core/regtab');
    
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
    
    ction.prototype.PRIO_ACT = 100;
    
    action.prototype._emit_to_obj = function(node) {
        var objs = this.objs;
        var node_mp = new (require('core/util').multi_pool)(node);
        for(var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            node_mp.foreach([i, '*'], function(cb, path) {
                var sk_id = path[1];
                obj.foreach_skill(sk_id, null, function(skid, srcid, sk) {
                    cb.call(sk, obj, objs);
                });
            });
        }
    };
    
    action.prototype.emit = function() {
        var node = REGTAB.check([this].concat(this.objs));
        var prios = Object.keys(node).sort(function(a, b){return a-b});
        for(var i = 0; i < prios.length; i++) {
            var prio = prios[i];
            if(prio >= this.PRIO_ACT) break;
            this._emit_to_obj(node[prio]);
        }
        if(this.effect) this.effect();
        for(; i < prios.length; i++) {
            var prio = prios[i];
            this._emit_to_obj(node[prio]);
        }
    };
    
    return action;
    
});
