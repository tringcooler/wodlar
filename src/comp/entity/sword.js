define(function(require) {
    
    var _super = require('entity/weapon');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
        this.init_own_skill();
    }
    
    defcls.prototype.SETID('#ENT_SWORD');
    
    defcls.prototype.init_nat_skill = function() {
        return [];
    };
    
    defcls.prototype.init_own_skill = function() {
        __supermethod(_super, this, 'init_own_skill')();
        this.gain_skill(new (require('skill/attack_by')('slash'))(), this.EQSRC('mainhand'));
        this.gain_skill(new (require('skill/attack_by')('stab'))(), this.EQSRC('offhand'));
    };
    
    return defcls;
    
});
