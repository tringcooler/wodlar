define(function(require) {
    
    var _super = require('entity/attackable');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
    }
    
    defcls.prototype.SETID('#ENT_CHARACTER');
    
    defcls.prototype.init_nat_skill = function() {
        return [];
    };
    
    return defcls;
    
});
