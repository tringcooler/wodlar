define(function(require) {
    
    var _super = require('core/action');
    return function (act_id) {
        __extends(dualact, _super);
        function dualact(sbj, obj) {
            _super.call(this, [sbj, obj]);
        }
        dualact.prototype.SETID('#ACT_' + act_id.toUpperCase());
        return dualact;
    };
    
});
