define(function(require) {
    
    var _super = require('core/meta');
    __extends(action, _super);
    function action() {
        _super.call(this);
    }
    
    action.prototype.SETID('ACTION');
    
    return action;
    
});
