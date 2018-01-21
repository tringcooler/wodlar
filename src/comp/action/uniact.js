define(function(require) {
    
    var _super = require('core/action');
    return function (act_id) {
        __extends(defcls, _super);
        function defcls(obj, info = null) {
            _super.call(this, [obj]);
            this.info = info;
        }
        defcls.prototype.SETID('#ACT_1_' + act_id.toUpperCase());
        return defcls;
    };
    
});
