define(function(require) {
    
    var REGTAB = require('core/regtab');
    
    var _super = require('core/meta');
    __extends(action, _super);
    function action() {
        _super.call(this);
    }
    
    action.prototype.SETID('ACTION');
    action.prototype.FIRST_INIT = function(cls, proto) {
        console.log('action init', proto.ID);
    };
    
    return action;
    
});
