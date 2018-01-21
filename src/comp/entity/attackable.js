define(function(require) {
    
    var _super = require('core/entity');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
    }
    
    defcls.prototype.SETID('#ENT_ATTACKABLE');
    
    defcls.prototype.init_nat_skill = function() {
        return [
            new (require('skill/damaged'))(),
        ];
    };
    
    return defcls;
    
});
