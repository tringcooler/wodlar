define(function(require) {
    
    var _super = require('entity/equipment');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
    }
    
    defcls.prototype.SETID('#ENT_WEAPON');
    
    defcls.prototype.EQTYP = '$TYP_EQ_WEAPON';
    
    return defcls;
    
});
