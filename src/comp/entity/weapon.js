define(function(require) {
    
    var _super = require('entity/equipment');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
        this.init_own_skill();
    }
    
    defcls.prototype.SETID('#ENT_WEAPON');
    
    defcls.prototype.EQTYP = '$TYP_EQ_WEAPON';
    
    /*defcls.prototype.init_nat_skill = function() {
        return [];
    };*/
    
    defcls.prototype.init_own_skill = function() {
        this.gain_skill(new (require('skill/attack_by')('slash'))(), this.EQSRC('mainhand'));
    };
    
    return defcls;
    
});
