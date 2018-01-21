define(function(require) {
    
    var _super = require('core/action');
    return function (act_id) {
        __extends(defcls, _super);
        function defcls(sbj, obj) {
            _super.call(this, [sbj, obj]);
        }
        defcls.prototype.SETID('#ACT_' + act_id.toUpperCase());
        return defcls;
    };
    
});
