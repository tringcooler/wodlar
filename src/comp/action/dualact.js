define(function(require) {
    
    var _super = require('core/action');
    return function (act_id) {
        __extends(defcls, _super);
        function defcls(sbj, obj, info = null) {
            _super.call(this, [sbj, obj]);
            this.info = info;
        }
        defcls.prototype.SETID('#ACT_2_' + act_id.toUpperCase());
        return defcls;
    };
    
});
