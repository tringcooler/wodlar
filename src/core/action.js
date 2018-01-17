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
