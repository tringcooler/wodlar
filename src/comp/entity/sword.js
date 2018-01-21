define(function(require) {
    
    var _super = require('entity/weapon');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
    }
    
    defcls.prototype.SETID('#ENT_SWORD');
    
    defcls.prototype.init_nat_skill = function() {
        return [];
    };
    
    return defcls;
    
});
